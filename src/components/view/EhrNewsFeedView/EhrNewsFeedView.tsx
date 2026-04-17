import React, { useEffect, useRef, useState } from "react";
import { Layout, NavigationBar, Title } from "../../presentational";
import language from "../../../helpers/language";
import proceduresIcon from "../../../assets/icon-procedure.svg";
import immunizationsIcon from "../../../assets/icon-immunization.svg";
import reportIcon from "../../../assets/icon-report.svg";
import labReportIcon from "../../../assets/icon-labreport.svg";
import EhrNewsFeed, { EhrNewsFeedEventReference } from "../../container/EhrNewsFeed/EhrNewsFeed";
import { EhrNewsFeedType } from "../../../helpers";
import { EhrDownloadButton } from '../../container';

export interface EhrNewsFeedViewProps {
    feed: EhrNewsFeedType;
    previewState?: "default";
    presentation?: "Push" | "Modal";
    colorScheme?: "auto" | "light" | "dark";
    onEventSelected: (eventReference: EhrNewsFeedEventReference) => void;
    onReportSelected: (reportID: string) => void;
}

/**
 * This view can be configured to display the following news feeds:
 * Procedures, Reports, Lab Results, and Immunizations
 */
export default function EhrNewsFeedView(props: EhrNewsFeedViewProps) {
    const [reportElement, setReportElement] = useState<HTMLElement>();
    const [atLeastOnePageLoaded, setAtLeastOnePageLoaded] = useState<boolean>(false);
    const [allPagesLoaded, setAllPagesLoaded] = useState<boolean>(false);
    const [loadAllPages, setLoadAllPages] = useState<boolean>(false);

    const resolveAllPagesLoaded = useRef<(() => void)>();

    useEffect(() => {
        if (allPagesLoaded && resolveAllPagesLoaded.current) {
            resolveAllPagesLoaded.current();
            resolveAllPagesLoaded.current = undefined;
        }
    }, [allPagesLoaded]);

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

    const prepareForDownload = async (): Promise<void> => {
        if (allPagesLoaded) return;
        setLoadAllPages(true);
        return new Promise<void>(resolve => {
            resolveAllPagesLoaded.current = resolve;
        });
    };

    return <Layout colorScheme={props.colorScheme}>
        <NavigationBar showBackButton={props.presentation == "Push"} showCloseButton={props.presentation == "Modal"} />
        <div ref={element => setReportElement(element ?? undefined)}>
            <Title
                order={2}
                autosizeImage
                image={icon}
                imageAlignment="left"
                accessory={<EhrDownloadButton preview={!!props.previewState} reportElement={reportElement} fileName={props.feed} hidden={!atLeastOnePageLoaded} prepareForDownload={prepareForDownload} />}
                defaultMargin
            >
                {title}
            </Title>
            <EhrNewsFeed
                previewState={props.previewState}
                feed={props.feed}
                loadAllPages={loadAllPages}
                onPageLoaded={() => setAtLeastOnePageLoaded(true)}
                onAllPagesLoaded={() => setAllPagesLoaded(true)}
                onEventSelected={props.onEventSelected}
                onReportSelected={props.onReportSelected}
            />
        </div>
    </Layout>;
}