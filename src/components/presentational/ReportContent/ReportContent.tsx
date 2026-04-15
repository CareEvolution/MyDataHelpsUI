import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import "./ReportContent.css";
import { language } from "../../../helpers/language";
import { EhrDownloadButton } from "../../container";
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface ReportContentProps {
    preview?: boolean;
    content: string;
    contentType: string;
    type: string;
}

export default function ReportContent(props: ReportContentProps) {
    const downloadPdfReport = async (): Promise<void> => {
        const url = "data:application/pdf;base64," + props.content;

        const deviceInfo = await MyDataHelps.getDeviceInfo();
        if (!deviceInfo || deviceInfo.platform === "Web") {
            const a = document.createElement('a');
            a.href = url;
            a.download = props.type + ".pdf";
            a.click();
        } else {
            (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: url });
        }
    };

    return <div className="mdhui-report-content">
        {props.contentType === "text/html" &&
            <div className="mdhui-report-content-html">
                <iframe sandbox="" srcDoc={props.content} />
                <EhrDownloadButton preview={props.preview} variant="default" fileName={props.type} reportHtml={props.content} />
            </div>
        }
        {props.contentType === "application/pdf" &&
            <div className="mdhui-report-content-download-pdf" onClick={downloadPdfReport} title={language("download-pdf-report")}>
                <FontAwesomeSvgIcon icon={faDownload} />
                {language("download-pdf-report")}
            </div>
        }
    </div>;
}