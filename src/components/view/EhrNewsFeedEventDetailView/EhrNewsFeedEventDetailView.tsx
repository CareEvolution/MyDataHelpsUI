import React from "react";
import { Layout, NavigationBar } from "../../presentational";
import { EhrNewsFeedEventDetail } from "../../container";
import { EhrNewsFeedEventType, EhrNewsFeedType } from "../../../helpers";

export interface EhrNewsFeedEventDetailViewProps {
    feed: EhrNewsFeedType;
    pageId?: string;
    pageDate?: string;
    previewState?: EhrNewsFeedEventType;
    onViewLabObservationTermInfo?: (labObservationID: string) => void;
    presentation?: "Push" | "Modal";
    colorScheme?: "auto" | "light" | "dark";
}

export default function EhrNewsFeedEventDetailView(props: EhrNewsFeedEventDetailViewProps) {
    return <Layout colorScheme={props.colorScheme}>
        <NavigationBar variant="compressed" showBackButton={props.presentation === "Push"} showCloseButton={props.presentation === "Modal"} />
        <EhrNewsFeedEventDetail
            feed={props.feed}
            pageId={props.pageId}
            pageDate={props.pageDate}
            previewState={props.previewState}
            onViewLabObservationTermInfo={props.onViewLabObservationTermInfo}
        />
    </Layout>;
}