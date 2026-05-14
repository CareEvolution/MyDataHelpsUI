/**
 * @jest-environment jsdom
 */
import { buildHtmlReport, previewHtmlReport } from '../../src/helpers/html-report';
import { lightColorStyle } from '../../src/helpers/globalCss';

describe('HTML Report Helper Tests', () => {
    const buildExpectedRootStyle = (): string => {
        const cssVars = Object.entries(lightColorStyle).map(([key, value]) => `${key}: ${value};`).join('\n\t');
        return `<style>\n:root {\n\t${cssVars}\n}\n</style>`;
    };

    describe('buildHtmlReport', () => {
        it('Should return reportHtml appended after the root style block when no styleElements or additionalCssRules are provided.', () => {
            const reportHtml = '<div>test</div>';
            const result = buildHtmlReport(reportHtml);
            expect(result).toBe(buildExpectedRootStyle() + reportHtml);
        });

        it('Should include outerHTML for non-emotion style elements.', () => {
            const reportHtml = '<p>test</p>';
            const styleElement = document.createElement('style') as HTMLStyleElement;
            styleElement.innerHTML = 'body { margin: 0; }';

            const result = buildHtmlReport(reportHtml, [styleElement]);

            expect(result).toBe(styleElement.outerHTML + buildExpectedRootStyle() + reportHtml);
        });

        it('Should extract cssRules text for emotion style elements.', () => {
            const reportHtml = '<p>test</p>';
            const styleElement = document.createElement('style') as HTMLStyleElement;
            styleElement.setAttribute('data-emotion', 'css');

            document.head.appendChild(styleElement);
            styleElement.sheet!.insertRule('.foo { color: red; }', 0);

            const result = buildHtmlReport(reportHtml, [styleElement]);

            expect(result).toBe(`<style>\n.foo {color: red;}\n</style>` + buildExpectedRootStyle() + reportHtml);
            document.head.removeChild(styleElement);
        });

        it('Should handle a mixture of emotion, non-emotion, and emotion without a sheet style elements.', () => {
            const reportHtml = '<div>test</div>';

            // Non-emotion element - uses outerHTML
            const nonEmotionElement = document.createElement('style') as HTMLStyleElement;
            nonEmotionElement.innerHTML = 'body { margin: 0; }';

            // Emotion element with multiple rules
            const emotionElement = document.createElement('style') as HTMLStyleElement;
            emotionElement.setAttribute('data-emotion', 'css');
            document.head.appendChild(emotionElement);
            emotionElement.sheet!.insertRule('.foo { color: red; }', 0);
            emotionElement.sheet!.insertRule('.bar { font-size: 14px; }', 1);

            // Emotion element with no sheet - falls back to outerHTML
            const emotionElementNoSheet = document.createElement('style') as HTMLStyleElement;
            emotionElementNoSheet.setAttribute('data-emotion', 'css');
            emotionElementNoSheet.innerHTML = '.baz { color: blue; }';

            const result = buildHtmlReport(reportHtml, [nonEmotionElement, emotionElement, emotionElementNoSheet]);

            const emotionCssRules = Array.from(emotionElement.sheet!.cssRules).map(rule => rule.cssText).join('\n\n');
            expect(result).toBe(
                nonEmotionElement.outerHTML +
                `<style>\n${emotionCssRules}\n</style>` +
                emotionElementNoSheet.outerHTML +
                buildExpectedRootStyle() +
                reportHtml
            );

            document.head.removeChild(emotionElement);
        });

        it('Should include additionalCssRules in a style block.', () => {
            const reportHtml = '<span>test</span>';
            const additionalCssRules = ['.foo { font-size: 14px; }', '.bar { margin: 0; }'];

            const result = buildHtmlReport(reportHtml, [], additionalCssRules);

            expect(result).toBe(buildExpectedRootStyle() + `<style>\n${additionalCssRules.join('\n\n')}\n</style>` + reportHtml);
        });
    });

    describe('previewHtmlReport', () => {
        const mockFileUrl = 'blob:http://localhost/mock-url';

        const createObjectURLMock = jest.fn();
        const revokeObjectURLMock = jest.fn();
        const clickMock = jest.fn();
        const createElementSpy = jest.spyOn(document, 'createElement');

        let originalURL: typeof window.URL;

        beforeEach(() => {
            createObjectURLMock.mockReset().mockReturnValue(mockFileUrl);
            revokeObjectURLMock.mockReset();
            clickMock.mockReset();

            originalURL = window.URL;
            const urlMock = { createObjectURL: createObjectURLMock, revokeObjectURL: revokeObjectURLMock };
            Object.defineProperty(window, 'URL', { value: urlMock, writable: true, configurable: true });

            createElementSpy.mockReset().mockImplementation((tag: string) => {
                const element = document.createElementNS('http://www.w3.org/1999/xhtml', tag) as HTMLElement;
                if (tag === 'a') {
                    element.click = clickMock;
                }
                return element;
            });
        });

        afterEach(() => {
            Object.defineProperty(window, 'URL', { value: originalURL, writable: true, configurable: true });
        });

        it('Should create a blob with the correct HTML content and trigger a download link click.', async () => {
            const html = '<div>report</div>';

            previewHtmlReport(html);

            expect(createObjectURLMock).toHaveBeenCalledTimes(1);

            const blob: Blob = createObjectURLMock.mock.calls[0][0];
            expect(blob.type).toBe('text/html');
            expect(await new Promise<string>(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsText(blob);
            })).toBe('<!DOCTYPE html>\n' + html);
            expect(clickMock).toHaveBeenCalledTimes(1);
        });

        it('Should use webkitURL when URL is not available.', async () => {
            Object.defineProperty(window, 'URL', { value: undefined, writable: true, configurable: true });

            const originalWebkitURL = window.webkitURL;
            const webkitURLMock = { createObjectURL: createObjectURLMock, revokeObjectURL: revokeObjectURLMock };
            Object.defineProperty(window, 'webkitURL', { value: webkitURLMock, writable: true, configurable: true });

            const html = '<div>report</div>';

            previewHtmlReport(html);

            expect(createObjectURLMock).toHaveBeenCalledTimes(1);

            const blob: Blob = createObjectURLMock.mock.calls[0][0];
            expect(blob.type).toBe('text/html');
            expect(await new Promise<string>(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsText(blob);
            })).toBe('<!DOCTYPE html>\n' + html);
            expect(clickMock).toHaveBeenCalledTimes(1);

            Object.defineProperty(window, 'webkitURL', { value: originalWebkitURL, writable: true, configurable: true });
        });

        it('Should use the provided fileName for the download attribute.', () => {
            previewHtmlReport('<p>test</p>', 'my-report');

            const anchorElement = clickMock.mock.contexts[0] as HTMLAnchorElement;
            expect(anchorElement.download).toBe('my-report.html');
            expect(anchorElement.href).toBe(mockFileUrl);
        });

        it('Should default the fileName to "report-preview" when not provided.', () => {
            previewHtmlReport('<p>test</p>');

            const anchorElement = clickMock.mock.contexts[0] as HTMLAnchorElement;
            expect(anchorElement.download).toBe('report-preview.html');
            expect(anchorElement.href).toBe(mockFileUrl);
        });

        it('Should default the fileName to "report-preview" when an empty string is provided.', () => {
            previewHtmlReport('<p>test</p>', '');

            const anchorElement = clickMock.mock.contexts[0] as HTMLAnchorElement;
            expect(anchorElement.download).toBe('report-preview.html');
            expect(anchorElement.href).toBe(mockFileUrl);
        });

        it('Should revoke the object URL after the click.', () => {
            jest.useFakeTimers();

            previewHtmlReport('<p>test</p>');

            expect(revokeObjectURLMock).not.toHaveBeenCalled();
            jest.runAllTimers();
            expect(revokeObjectURLMock).toHaveBeenCalledWith(mockFileUrl);

            jest.useRealTimers();
        });

        it('Should do nothing when URL API is not available.', () => {
            const originalWebkitURL = window.webkitURL;
            Object.defineProperty(window, 'URL', { value: undefined, writable: true, configurable: true });
            Object.defineProperty(window, 'webkitURL', { value: undefined, writable: true, configurable: true });

            expect(() => previewHtmlReport('<p>test</p>')).not.toThrow();
            expect(clickMock).not.toHaveBeenCalled();

            Object.defineProperty(window, 'webkitURL', { value: originalWebkitURL, writable: true, configurable: true });
        });
    });
});
