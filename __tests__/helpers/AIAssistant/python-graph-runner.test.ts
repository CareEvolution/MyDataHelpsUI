/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals';
import { buildGraphProgram, resetPythonGraphRunner, runPythonGraph } from '../../../src/helpers/AIAssistant/PythonGraphRunner';

describe('Python Graph Runner', () => {
    describe('Program construction', () => {
        it('Should supply the imports the generated code is told to omit.', () => {
            const program = buildGraphProgram('plt.plot([1, 2, 3])');

            expect(program).toContain('import matplotlib.pyplot as plt');
            expect(program).toContain('matplotlib.use("Agg")');
        });

        it('Should keep the generated code at the top level and in order.', () => {
            const program = buildGraphProgram('plt.plot([1, 2, 3])\nplt.title("Steps")');
            const lines = program.split('\n');

            expect(lines).toContain('plt.plot([1, 2, 3])');
            expect(lines).toContain('plt.title("Steps")');
            expect(lines.indexOf('plt.plot([1, 2, 3])')).toBeLessThan(lines.indexOf('plt.title("Steps")'));
        });

        it('Should set up the figure before the generated code runs and encode it afterwards.', () => {
            const program = buildGraphProgram('plt.plot([1, 2, 3])');
            const lines = program.split('\n');

            expect(lines.indexOf('import matplotlib')).toBeLessThan(lines.indexOf('plt.plot([1, 2, 3])'));
            expect(lines.indexOf('plt.plot([1, 2, 3])')).toBeLessThan(lines.findIndex(line => line.includes('savefig')));
        });

        it('Should end with the base64 encoded image as the value of the program.', () => {
            const program = buildGraphProgram('plt.plot([1, 2, 3])');
            const lines = program.split('\n');

            expect(lines[lines.length - 1]).toBe('_base64.b64encode(_buffer.getvalue()).decode("ascii")');
        });

        it('Should fail loudly when the generated code draws nothing.', () => {
            const program = buildGraphProgram('x = 1');

            expect(program).toContain('if not plt.get_fignums(): raise RuntimeError');
        });
    });

    describe('Isolation', () => {
        afterEach(() => {
            resetPythonGraphRunner();
        });

        const startRun = () => {
            // Never settles under jsdom, which does not execute the frame's scripts. The frame
            // itself is what these assertions are about.
            runPythonGraph('plt.plot([1, 2, 3])').catch(() => { });
            return document.querySelector('iframe');
        };

        it('Should run generated code in a sandboxed frame.', () => {
            const frame = startRun();

            expect(frame).not.toBeNull();
            expect(frame!.getAttribute('sandbox')).toBe('allow-scripts');
        });

        it('Should not give the frame the host origin, which would defeat the sandbox.', () => {
            const sandbox = startRun()!.getAttribute('sandbox')!.split(' ');

            expect(sandbox).not.toContain('allow-same-origin');
        });

        it('Should tear the frame down on reset so Pyodide does not stay resident.', () => {
            startRun();
            expect(document.querySelector('iframe')).not.toBeNull();

            resetPythonGraphRunner();

            expect(document.querySelector('iframe')).toBeNull();
        });
    });
});
