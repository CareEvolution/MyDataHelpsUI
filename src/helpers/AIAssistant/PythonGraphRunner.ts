/**
 * Runs LLM-generated matplotlib code in the browser with Pyodide (CPython compiled to
 * WebAssembly) and returns the resulting chart as a base64-encoded PNG.
 *
 * Pyodide is not bundled with this library. It is fetched from a CDN the first time a
 * graph is requested, so this adds no weight to the bundle and costs nothing for the
 * (many) sessions that never ask for a graph.
 *
 * The code runs inside an iframe sandboxed with "allow-scripts" but deliberately without
 * "allow-same-origin", which gives it an opaque origin. Pyodide exposes the JS globals of
 * whatever frame it runs in to Python (via the `js` module), so generated code executing
 * in the host page could reach the DOM and the MyDataHelps access token. Isolating it in a
 * frame that shares nothing with the host removes that reach.
 *
 * Note that srcdoc iframes inherit the embedding page's Content Security Policy. A host app
 * with a restrictive CSP will need to allow the Pyodide CDN as a script/connect source and
 * permit WebAssembly compilation ('wasm-unsafe-eval') for graphing to work.
 */

/**
 * Pinned so a CDN-side release can't change behavior underneath us. Override with
 * {@link configurePythonGraphRunner} to move versions, self-host the Pyodide distribution,
 * or point at a mirror.
 */
const DEFAULT_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.3/full/';

const DEFAULT_TIMEOUT_MS = 120000;

const READY_MESSAGE = 'mdhui-python-graph-ready';
const RUN_MESSAGE = 'mdhui-python-graph-run';
const RESULT_MESSAGE = 'mdhui-python-graph-result';

export interface PythonGraphRunnerOptions {
    /** Base URL of the Pyodide distribution, including the trailing slash. */
    indexUrl?: string;
    /** How long to wait for a single graph, including the one-time Pyodide download. */
    timeoutMs?: number;
}

let options: Required<PythonGraphRunnerOptions> = {
    indexUrl: DEFAULT_INDEX_URL,
    timeoutMs: DEFAULT_TIMEOUT_MS
};

/**
 * Overrides where Pyodide is loaded from and how long a graph may take. Takes effect on the
 * next runner start, so call it before the first graph or after {@link resetPythonGraphRunner}.
 */
export function configurePythonGraphRunner(overrides: PythonGraphRunnerOptions) {
    options = { ...options, ...overrides };
}

/**
 * Wraps generated code in the imports it is told to omit, and in the plumbing that turns the
 * figure it draws into a base64 PNG. The trailing expression is the value `runPythonAsync`
 * resolves to.
 */
export function buildGraphProgram(code: string) {
    return [
        'import matplotlib',
        'matplotlib.use("Agg")',
        'import matplotlib.pyplot as plt',
        'import io as _io, base64 as _base64',
        'plt.close("all")',
        code,
        'if not plt.get_fignums(): raise RuntimeError("The code did not produce a matplotlib figure.")',
        '_buffer = _io.BytesIO()',
        'plt.savefig(_buffer, format="png", dpi=150, bbox_inches="tight")',
        'plt.close("all")',
        '_base64.b64encode(_buffer.getvalue()).decode("ascii")'
    ].join('\n');
}

/*
 * Runs inside the sandboxed frame. Only the message-type constants above are interpolated
 * into it; nothing from the host -- least of all model-generated code -- is ever spliced
 * into the frame's source. Everything else it needs arrives by postMessage.
 */
const FRAME_BOOTSTRAP = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(function () {
    var runtimePromise = null;

    function loadRuntime(indexUrl) {
        if (!runtimePromise) {
            runtimePromise = import(indexUrl + 'pyodide.mjs').then(function (module) {
                return module.loadPyodide({ indexURL: indexUrl });
            }).then(function (pyodide) {
                return pyodide.loadPackage(['matplotlib']).then(function () { return pyodide; });
            }).catch(function (error) {
                // Let the next graph retry rather than caching the failure forever.
                runtimePromise = null;
                throw error;
            });
        }
        return runtimePromise;
    }

    function reply(message) {
        parent.postMessage(message, '*');
    }

    window.addEventListener('message', function (event) {
        if (event.source !== parent) return;

        var request = event.data;
        if (!request || request.type !== '${RUN_MESSAGE}') return;

        loadRuntime(request.indexUrl).then(function (pyodide) {
            // The prompt tells the model not to write imports, but it sometimes does anyway;
            // this pulls in numpy, pandas and friends when that happens.
            return pyodide.loadPackagesFromImports(request.code).then(function () {
                return pyodide.runPythonAsync(request.program);
            });
        }).then(function (image) {
            reply({ type: '${RESULT_MESSAGE}', id: request.id, image: image });
        }).catch(function (error) {
            reply({ type: '${RESULT_MESSAGE}', id: request.id, error: String(error && error.message || error) });
        });
    });

    reply({ type: '${READY_MESSAGE}' });
}());
<\/script></body></html>`;

interface PendingRun {
    resolve: (image: string) => void;
    reject: (error: Error) => void;
    timer: ReturnType<typeof setTimeout>;
}

const pendingRuns = new Map<number, PendingRun>();
let framePromise: Promise<HTMLIFrameElement> | null = null;
let frame: HTMLIFrameElement | null = null;
let cancelFrameStart: (() => void) | null = null;
let nextRunId = 0;

function onMessage(event: MessageEvent) {
    if (!frame || event.source !== frame.contentWindow) return;

    const message = event.data;
    if (!message || message.type !== RESULT_MESSAGE) return;

    const pending = pendingRuns.get(message.id);
    if (!pending) return;

    pendingRuns.delete(message.id);
    clearTimeout(pending.timer);

    if (typeof message.image === 'string' && message.image) {
        pending.resolve(message.image);
    } else {
        pending.reject(new Error(message.error || 'The graph could not be generated.'));
    }
}

function startFrame() {
    if (framePromise) return framePromise;

    framePromise = new Promise<HTMLIFrameElement>((resolve, reject) => {
        const element = document.createElement('iframe');
        element.setAttribute('sandbox', 'allow-scripts');
        element.setAttribute('title', 'MyDataHelps graph renderer');
        element.setAttribute('aria-hidden', 'true');
        element.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden;';

        let timer: ReturnType<typeof setTimeout>;

        const onReady = (event: MessageEvent) => {
            if (event.source !== element.contentWindow) return;
            if (!event.data || event.data.type !== READY_MESSAGE) return;

            window.removeEventListener('message', onReady);
            clearTimeout(timer);
            cancelFrameStart = null;
            resolve(element);
        };

        const cleanUp = () => {
            window.removeEventListener('message', onReady);
            clearTimeout(timer);
            cancelFrameStart = null;
            element.remove();
            if (frame === element) frame = null;
            framePromise = null;
        };

        timer = setTimeout(() => {
            cleanUp();
            reject(new Error('The graph renderer did not start.'));
        }, options.timeoutMs);

        cancelFrameStart = () => {
            cleanUp();
            reject(new Error('The graph renderer was shut down.'));
        };

        window.addEventListener('message', onReady);

        frame = element;
        element.srcdoc = FRAME_BOOTSTRAP;
        document.body.appendChild(element);
    });

    return framePromise;
}

/**
 * Executes python that draws a matplotlib figure and resolves to that figure as a
 * base64-encoded PNG. The code should draw with `plt` and omit its imports.
 */
export async function runPythonGraph(code: string): Promise<string> {
    if (typeof document === 'undefined') {
        throw new Error('Graphs can only be generated in a browser.');
    }

    window.addEventListener('message', onMessage);

    const element = await startFrame();
    const id = nextRunId++;

    return new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => {
            pendingRuns.delete(id);
            // A run that never came back may have left the interpreter wedged; drop the frame
            // so the next graph starts clean.
            resetPythonGraphRunner();
            reject(new Error('The graph took too long to generate.'));
        }, options.timeoutMs);

        pendingRuns.set(id, { resolve, reject, timer });

        element.contentWindow?.postMessage({
            type: RUN_MESSAGE,
            id: id,
            code: code,
            program: buildGraphProgram(code),
            indexUrl: options.indexUrl
        }, '*');
    });
}

/**
 * Tears down the renderer, releasing the memory Pyodide holds. The next graph pays the
 * startup cost again.
 */
export function resetPythonGraphRunner() {
    pendingRuns.forEach(pending => {
        clearTimeout(pending.timer);
        pending.reject(new Error('The graph renderer was shut down.'));
    });
    pendingRuns.clear();

    // Abandons a startup still in flight, along with its timer and listener.
    cancelFrameStart?.();

    if (typeof window !== 'undefined') {
        window.removeEventListener('message', onMessage);
    }

    frame?.remove();
    frame = null;
    framePromise = null;
}
