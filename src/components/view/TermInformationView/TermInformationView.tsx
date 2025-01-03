import React from 'react'
import { Layout, NavigationBar, TermInformation } from "../.."
import { TermInformationReference } from "../../container/TermInformation/TermInformation";

export interface TermInformationViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default" | "noData"
    term?: TermInformationReference
    labObservationID?: string
    openLinksInNewWindow?: boolean
    colorScheme?: "auto" | "light" | "dark"
}

export default function (props: TermInformationViewProps) {

    return (
        <Layout colorScheme={props.colorScheme}>
            <NavigationBar
                showBackButton={props.presentation == "Push"}
                showCloseButton={props.presentation == "Modal"}>
            </NavigationBar>
            <TermInformation previewState={props.previewState}
                term={props.term}
                labObservationID={props.labObservationID}
                openLinksInNewWindow={props.openLinksInNewWindow} />
        </Layout>
    )
}