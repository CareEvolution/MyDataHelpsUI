import MyDataHelps, { Guid } from "@careevolution/mydatahelps-js";
import { formatISO } from "date-fns";

export default function renderPdf(reportHtml: string, participantID: Guid) {
    return MyDataHelps.persistDeviceData([
        {
            type: "ReportHtml",
            observationDate: formatISO(new Date()),
            value: reportHtml
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