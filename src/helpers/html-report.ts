export function buildHtmlReport(document: Document, htmlElement: HTMLElement, additionalCssRules?: string[]): string {
    const documentStyles = document.head.getElementsByTagName('style');
    let html = '';
    for (const styleElement of documentStyles) {
        if (styleElement.getAttribute('data-emotion') && styleElement.sheet) {
            html += `<style>\n${Array.from(styleElement.sheet.cssRules).map(rule => rule.cssText).join('\n\n')}\n</style>`;
        } else {
            html += styleElement.outerHTML;
        }
    }
    if (additionalCssRules) {
        html += `<style>\n${additionalCssRules.join('\n\n')}\n</style>`;
    }
    html += htmlElement.innerHTML;
    return html;
}

export function previewHtmlReport(window: Window & { URL?: any, webkitURL?: any }, document: Document, html: string): void {
    const blob = new Blob(['<!DOCTYPE html>\n' + html], { type: 'text/html' });
    const urlObject = window.URL || window.webkitURL;
    const fileUrl = urlObject.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'report-preview.html';
    link.click();
}