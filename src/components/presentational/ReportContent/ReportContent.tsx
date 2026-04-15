import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import "./ReportContent.css";
import { language } from "../../../helpers/language";
import { EhrDownloadButton } from "../../container";

export interface ReportContentProps {
    content: string;
    contentType: string;
    type: string;
}

export default function ReportContent(props: ReportContentProps) {
    return <div className="mdhui-report-content">
        {props.contentType === "text/html" &&
            <div className="mdhui-report-content-html">
                <iframe sandbox="allow-same-origin" srcDoc={props.content} />
                <EhrDownloadButton preview={true} variant="default" fileName={props.type} reportHtml={props.content} />
            </div>
        }
        {props.contentType === "application/pdf" &&
            <div className="mdhui-report-content-download-pdf">
                <a href={"data:application/pdf;base64," + props.content} download={props.type + ".pdf"} title={language("download-pdf-report")}>
                    <FontAwesomeSvgIcon icon={faDownload} />
                    {language("download-pdf-report")}
                </a>
            </div>
        }
    </div>;
}