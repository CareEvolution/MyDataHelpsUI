import MyDataHelps, { Guid } from "@careevolution/mydatahelps-js";
import { formatISO } from "date-fns";

export default async function renderPdf(reportHtml: string, participantID: Guid, fileName?: string): Promise<void> {
    await MyDataHelps.persistDeviceData([{ type: "ReportHtml", observationDate: formatISO(new Date()), value: reportHtml }]);

    const queryParams = new URLSearchParams({
        patientID: participantID.toString(),
        modelType: "VisualizationModel",
        visualizationKey: "Shared.HtmlToPdf",
        ...(fileName ? { fileName } : undefined)
    });
    const url = `${MyDataHelps.baseUrl}WebVisualization/WebVisualizationPDF?${queryParams}`;

    const deviceInfo = await MyDataHelps.getDeviceInfo();
    if (!deviceInfo || deviceInfo.platform == "Web") {
        window.open(url);
    } else {
        (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: url });
    }
}