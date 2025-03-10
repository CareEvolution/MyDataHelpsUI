import MyDataHelps from "@careevolution/mydatahelps-js";
import React from "react";
import { useEffect, useState } from "react"
import { Layout, LoadingIndicator, NavigationBar } from "../../presentational";
import ReportContent from "../../presentational/ReportContent/ReportContent";
import { previewReportHtml, previewReportPdf } from "../../presentational/ReportContent/ReportContent.previewData";
import "./ReportView.css"
import { language } from "../../../helpers/language";

export interface ReportViewProps {
    reportId: string
    previewState?: "html" | "pdf"
    colorScheme?: "auto" | "light" | "dark"
}

export interface ReportContent {
    Summary: string
    Type: string;
    Content: string;
    ContentType: string;
}

export default function (props: ReportViewProps) {
    let [reportContent, setReportContent] = useState<ReportContent | null>(null);

    useEffect(() => {
        if (props.previewState == "html") {
            setReportContent({
                Type: language('subsequent-evaluation-note'),
                Summary: language("summary"),
                Content: previewReportHtml,
                ContentType: "text/html"
            });
            return;
        }

        if (props.previewState == "pdf") {
            setReportContent({
                Type: "ResearchKitConsentDocument",
                Summary: language("summary"),
                Content: previewReportPdf,
                ContentType: "application/pdf"
            });
            return;
        }

        var queryString = new URLSearchParams({ ReportID: props.reportId }).toString();
        MyDataHelps.invokeCustomApi("HealthAndWellnessApi.DownloadReport", "GET", queryString, true)
            .then(function (response) {
                setReportContent(response);
            });
    }, []);

    let title = "";
    if (reportContent) {
        title = reportContent.Type;
        if (reportContent.Summary) {
            title += " • " + reportContent.Summary;
        }
    }

    return <Layout className="mdhui-report-view" colorScheme={props.colorScheme}>
        <NavigationBar subtitle={title} variant="compressedModal" showCloseButton />
        {!reportContent && <LoadingIndicator />}
        {reportContent && <ReportContent type={reportContent.Type} content={reportContent.Content} contentType={reportContent.ContentType} />}
    </Layout>
}