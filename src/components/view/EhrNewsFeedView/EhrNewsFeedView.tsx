import React from "react"
import { Layout, NavigationBar, Title } from "../../presentational"
import language from "../../../helpers/language"
import proceduresIcon from "../../../assets/icon-procedure.svg";
import immunizationsIcon from "../../../assets/icon-immunization.svg";
import reportIcon from "../../../assets/icon-report.svg";
import labReportIcon from "../../../assets/icon-labreport.svg";
import EhrNewsFeed, { EhrNewsFeedEventReference } from "../../container/EhrNewsFeed/EhrNewsFeed";

export interface EhrNewsFeedViewProps {
    feed: "Procedures" | "Reports" | "LabReports" | "Immunizations"
    previewState?: "default"
    presentation?: "Push" | "Modal"
    colorScheme?: "auto" | "light" | "dark"
    onEventSelected(eventReference: EhrNewsFeedEventReference): void
    onReportSelected(reportID: string): void
}

/*
** TODO
*/
export default function EhrNewsFeedView(props: EhrNewsFeedViewProps) {
    let title = "";
    let icon = <></>;
    switch (props.feed) {
        case "Procedures":
            title = language("procedures-title");
            icon = <img src={proceduresIcon} />;
            break;
        case "Reports":
            title = language("reports-title");
            icon = <img src={reportIcon} />;
            break;
        case "Immunizations":
            title = language("immunizations-title");
            icon = <img src={immunizationsIcon} />;
            break;
        case "LabReports":
            title = language("lab-results-title");
            icon = <img src={labReportIcon} />;
            break;
    }

    return (
        <Layout colorScheme={props.colorScheme}>
            <NavigationBar
                showBackButton={props.presentation == "Push"}
                showCloseButton={props.presentation == "Modal"}>
                <Title order={2} autosizeImage image={icon} imageAlignment="left">{title}</Title>
            </NavigationBar>
            <EhrNewsFeed feed={props.feed} onEventSelected={props.onEventSelected} onReportSelected={props.onReportSelected} previewState={props.previewState} />
        </Layout>
    )
}