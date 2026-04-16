import { faDownload, faRefresh } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import "./ReportContent.css";
import { language } from "../../../helpers/language";
import { EhrDownloadButton, PdfPreview } from "../../container";
import MyDataHelps from "@careevolution/mydatahelps-js";
import Button from "../Button";

export interface ReportContentProps {
    preview?: boolean;
    reportId: string;
    content: string;
    contentType: string;
    type: string;
}

export default function ReportContent(props: ReportContentProps) {
    const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);
    const [downloadingPdfReport, setDownloadingPdfReport] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const reportRef = {
        get current() {
            return iframeElement?.contentDocument?.body ?? null;
        }
    };

    const downloadPdfReport = async (): Promise<void> => {
        setDownloadingPdfReport(true);
        try {
            const deviceInfo = await MyDataHelps.getDeviceInfo();
            if (!deviceInfo || deviceInfo.platform === "Web") {
                const a = document.createElement("a");
                a.href = "data:application/pdf;base64," + props.content;
                a.download = props.type + ".pdf";
                a.click();
            } else {
                const url = `Authenticated/ReportViewer/ServeReport.ashx?${new URLSearchParams({ reportId: props.reportId })}`;
                (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: url });
            }
        } finally {
            setDownloadingPdfReport(false);
        }
    };

    return <div className="mdhui-report-content">
        {props.contentType === "text/html" &&
            <div className="mdhui-report-content-html">
                <iframe sandbox="allow-same-origin" srcDoc={props.content} ref={setIframeElement} />
                {reportRef.current &&
                    <EhrDownloadButton preview={props.preview} variant="default" text={language("download-pdf-report")} reportRef={reportRef} fileName={props.type} />
                }
            </div>
        }
        {props.contentType === "application/pdf" &&
            <div className="mdhui-report-content-pdf">
                <PdfPreview url={"data:application/pdf;base64," + props.content} maxHeight={windowSize.height * 0.8} maxWidth={windowSize.width * 0.8} />
                <Button onClick={downloadPdfReport} fullWidth={false}>
                    {language("download-pdf-report")} <FontAwesomeSvgIcon icon={downloadingPdfReport ? faRefresh : faDownload} spin={downloadingPdfReport} />
                </Button>
            </div>
        }
    </div>;
}