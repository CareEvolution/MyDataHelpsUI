import { lightColorStyle } from './globalCss';

export function buildHtmlReport(reportHtml: string, styleElements: HTMLStyleElement[] = [], additionalCssRules: string[] = []): string {
    let html = '';
    for (const styleElement of styleElements) {
        if (styleElement.getAttribute('data-emotion') && styleElement.sheet) {
            html += `<style>\n${Array.from(styleElement.sheet.cssRules).map(rule => rule.cssText).join('\n\n')}\n</style>`;
        } else {
            html += styleElement.outerHTML;
        }
    }
    html += `<style>\n:root {\n\t${(Object.entries(lightColorStyle).map(([key, value]) => `${key}: ${value};`).join('\n\t'))}\n}\n</style>`;
    if (additionalCssRules.length > 0) {
        html += `<style>\n${additionalCssRules.join('\n\n')}\n</style>`;
    }
    html += reportHtml;
    return html;
}

export function previewHtmlReport(window: Window & { URL?: any, webkitURL?: any }, html: string, fileName?: string): void {
    const blob = new Blob(['<!DOCTYPE html>\n' + html], { type: 'text/html' });
    const urlObject = window.URL || window.webkitURL;
    const fileUrl = urlObject.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${fileName || 'report-preview'}.html`;
    link.click();
    urlObject.revokeObjectURL(fileUrl);
}