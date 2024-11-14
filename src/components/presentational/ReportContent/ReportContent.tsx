import { faDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import "./ReportContent.css"
import { language } from "../../../helpers/language"

export interface ReportContentProps {
    content: string;
    contentType: string;
    type: string
}

export default function (props: ReportContentProps) {
    return (
        <div className="mdhui-report-content">
            {props.contentType == "text/html" &&
                <iframe sandbox="" srcDoc={props.content} />
            }
            {props.contentType == "application/pdf" &&
                <div className="mdhui-report-content-download-pdf" ng-if="$ctrl.report.ContentType == 'application/pdf'" ng-show="$ctrl.srcSet = true">
                    <a href={"data:application/pdf;base64," + props.content} download={props.type + ".pdf"} title="Download PDF Report">
                        <FontAwesomeSvgIcon icon={faDownload} />
                        {language('download-pdf-report')}
                    </a>
                </div>
            }
        </div>
    )
}