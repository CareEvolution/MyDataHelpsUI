import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import "./ReportContent.css";
import { language } from "../../../helpers/language";
import { EhrDownloadButton } from "../../container";
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface ReportContentProps {
    preview?: boolean;
    reportId: string;
    content: string;
    contentType: string;
    type: string;
}

export default function ReportContent(props: ReportContentProps) {
    const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);
    const reportRef = {
        get current() {
            return iframeElement?.contentDocument?.documentElement ?? null;
        }
    };

    const downloadPdfReport = async (): Promise<void> => {
        const deviceInfo = await MyDataHelps.getDeviceInfo();
        if (!deviceInfo || deviceInfo.platform === "Web") {
            const a = document.createElement('a');
            a.href = "data:application/pdf;base64," + props.content;
            a.download = props.type + ".pdf";
            a.click();
        } else {
            const url = `Authenticated/ReportViewer/ServeReport.ashx?${new URLSearchParams({ reportId: props.reportId })}`;
            (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: url });
        }
    };

    return <div className="mdhui-report-content">
        {props.contentType === "text/html" &&
            <div className="mdhui-report-content-html">
                <iframe sandbox="allow-same-origin" srcDoc={props.content} ref={setIframeElement} />
                {reportRef.current &&
                    <EhrDownloadButton preview={props.preview} variant="default" text={language('download')} styleElements={[]} reportRef={reportRef} fileName={props.type} />
                }
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