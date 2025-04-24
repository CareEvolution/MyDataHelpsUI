import MyDataHelps, { Guid } from "@careevolution/mydatahelps-js";
import { formatISO } from "date-fns";

function replaceCSSVariables(html: string): string {
    // Create a temporary container and insert the HTML
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container); // Must be in DOM for getComputedStyle to work

    const allElements = container.querySelectorAll<HTMLElement>('*');

    allElements.forEach(el => {
        const computedStyle = getComputedStyle(el);

        // Process inline styles
        if (el.hasAttribute('style')) {
            const originalStyle = el.getAttribute('style') || '';
            const newStyle = originalStyle.replace(/var\((--[\w-]+)\)/g, (_, varName) => {
                const value = computedStyle.getPropertyValue(varName).trim();
                return value || `var(${varName})`;
            });
            el.setAttribute('style', newStyle);
        }
    });

    // Process <style> tags for global CSS variable usage
    const styleTags = container.querySelectorAll<HTMLStyleElement>('style');
    styleTags.forEach(styleTag => {
        let cssText = styleTag.textContent || '';

        const rootComputedStyle = getComputedStyle(document.documentElement);
        const varMatches = Array.from(cssText.matchAll(/var\((--[\w-]+)\)/g));

        varMatches.forEach(match => {
            const varName = match[1];
            const value = rootComputedStyle.getPropertyValue(varName).trim();
            if (value) {
                const regex = new RegExp(`var\\(${varName}\\)`, 'g');
                cssText = cssText.replace(regex, value);
            }
        });

        styleTag.textContent = cssText;
    });

    const finalHTML = container.innerHTML;
    container.remove();
    return finalHTML;
}


export default function renderPdf(reportHtml: string, participantID: Guid) {
    return MyDataHelps.persistDeviceData([
        {
            type: "ReportHtml",
            observationDate: formatISO(new Date()),
            value: replaceCSSVariables(reportHtml)
        }
    ]).then(function () {
        var url = MyDataHelps.baseUrl + "WebVisualization/WebVisualizationPDF?patientID=" + participantID + "&modelType=VisualizationModel&visualizationKey=Shared.HtmlToPdf";
        return MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
            if (!deviceInfo || deviceInfo.platform == "Web") {
                window.open(url);
            } else {
                (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: url });
            }
        });
    });
}