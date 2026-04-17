/**
 * @jest-environment jsdom
 */
import { buildHtmlReport } from '../../src/helpers/html-report';
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
});
