import React from 'react'
import { Layout, NavigationBar, TermInformation } from "../.."
import { TermInformationReference } from "../../container/TermInformation/TermInformation";

export interface TermInformationViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default" | "noData"
    term?: TermInformationReference
    labObservationID?: string
    openLinksInNewWindow?: boolean
}

export default function (props: TermInformationViewProps) {

    return (
        <Layout>
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