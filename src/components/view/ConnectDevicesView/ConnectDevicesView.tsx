import React from 'react'
import { BlankView, Card } from "../.."
import { ConnectDevicesMenu, FitbitDevices, GarminDevices, ViewDeviceActivity } from '../../container'
import MyDataHelps from '@careevolution/mydatahelps-js'
import standardDailyDataTypes from '../../../helpers/daily-data-types/standard'

export interface ConnectDevicesViewProps {
    externalAccountsApplicationUrl: string
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    enableAppleHealthSurveyName?: string
    enableGoogleFitSurveyName?: string
    postalCodeSurveyName?: string
    deviceActivityViewUrl?: string
}

export default function ConnectDevicesView(props: ConnectDevicesViewProps) {
    return (
        <BlankView showBackButton={props.presentation == "Push"}
            showCloseButton={props.presentation == "Modal"}
            colorScheme={props.colorScheme}>
            {props.deviceActivityViewUrl &&
                <Card>
                    <ViewDeviceActivity onClick={() => MyDataHelps.openApplication(props.deviceActivityViewUrl!)}
                        dataTypes={standardDailyDataTypes}
                        previewState={props.previewState ? "fetchingData" : undefined} />
                </Card>
            }
            <Card>
                <ConnectDevicesMenu previewState={props.previewState ? "Web" : undefined}
                    enableAppleHealthSurveyName={props.enableAppleHealthSurveyName}
                    enableGoogleFitSurveyName={props.enableGoogleFitSurveyName}
                    postalCodeSurveyName={props.postalCodeSurveyName} />
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