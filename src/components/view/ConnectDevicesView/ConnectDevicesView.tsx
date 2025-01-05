import React from 'react'
import { BlankView, Card } from "../.."
import { ConnectDevicesMenu, FitbitDevices, GarminDevices, ProviderSearch } from '../../container'

export interface ConnectDevicesViewProps {
    externalAccountsApplicationUrl: string
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    enableAppleHealthSurvey?: string
    enableGoogleFitSurvey?: string
}

export default function ConnectDevicesView(props: ConnectDevicesViewProps) {
    return (
        <BlankView showBackButton={props.presentation == "Push"}
            showCloseButton={props.presentation == "Modal"}>
            <Card>
                <ConnectDevicesMenu previewState={props.previewState ? "Web" : undefined}
                    enableAppleHealthSurvey={props.enableAppleHealthSurvey}
                    enableGoogleFitSurvey={props.enableGoogleFitSurvey} />
            </Card>
            <Card>
                <FitbitDevices previewState={props.previewState ? "connected" : undefined} />
            </Card>
            <Card>
                <GarminDevices previewState={props.previewState ? "connected" : undefined} />
            </Card>
        </BlankView>
    )
}