import React from "react"
import { Layout, NavigationBar, Title } from "../../presentational"
import { EhrNewsFeedEventDetail } from "../../container";
import { EhrNewsFeedEventType, EhrNewsFeedFeed } from "../../../helpers/news-feed/types";

export interface EhrNewsFeedEventDetailViewProps {
    feed: EhrNewsFeedFeed
    pageId?: string
    pageDate?: string
    previewState?: EhrNewsFeedEventType
    onViewLabObservationTermInfo(labObservationID: string): void
    presentation?: "Push" | "Modal"
    colorScheme?: "auto" | "light" | "dark"
}

export default function (props: EhrNewsFeedEventDetailViewProps) {
    return (
        <Layout colorScheme={props.colorScheme}>
            <NavigationBar
                variant="compressed"
                showBackButton={props.presentation == "Push"}
                showCloseButton={props.presentation == "Modal"}>
            </NavigationBar>
            <EhrNewsFeedEventDetail
                feed={props.feed}
                pageId={props.pageId}
                pageDate={props.pageDate}
                previewState={props.previewState}
                onViewLabObservationTermInfo={props.onViewLabObservationTermInfo} />
        </Layout>
    )
}