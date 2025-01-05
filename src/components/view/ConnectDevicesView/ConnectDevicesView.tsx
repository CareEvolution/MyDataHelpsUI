import React from 'react'
import { Action, BlankView, Card, CardTitle } from "../.."
import { ConnectDevicesMenu, FitbitDevices, GarminDevices } from '../../container'
import { useInitializeView } from '../../../helpers'
import { faBarChart, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import MyDataHelps from '@careevolution/mydatahelps-js'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import standardDailyDataTypes from '../../../helpers/daily-data-types/standard'

export interface ConnectDevicesViewProps {
    externalAccountsApplicationUrl: string
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    enableAppleHealthSurvey?: string
    enableGoogleFitSurvey?: string
    monthlyActivityViewUrl?: string
    relativeDailyActivityViewUrl?: string
}

export default function ConnectDevicesView(props: ConnectDevicesViewProps) {
    let [showDetailViews, setShowDetailViews] = React.useState(false);

    useInitializeView(function () {
        if (!props.relativeDailyActivityViewUrl && !props.monthlyActivityViewUrl) {
            return;
        }

        if (props.previewState == "default") {
            setShowDetailViews(true);
            return;
        }

        //instead of using Promise.all, we can show detail views when the first availability check returns true
        //to avoid waiting for all of the checks
        standardDailyDataTypes.forEach(dataType => {
            dataType.availabilityCheck().then(available => {
                if (available) {
                    setShowDetailViews(true);
                }
            });
        });
    }, []);


    return (
        <BlankView showBackButton={props.presentation == "Push"}
            showCloseButton={props.presentation == "Modal"}>
            <Card>
                <ConnectDevicesMenu previewState={props.previewState ? "Web" : undefined}
                    enableAppleHealthSurvey={props.enableAppleHealthSurvey}
                    enableGoogleFitSurvey={props.enableGoogleFitSurvey} />
            </Card>
            {showDetailViews &&
                <Card>
                    <CardTitle title="My Activity" />
                    {props.relativeDailyActivityViewUrl &&
                        <Action bottomBorder icon={<FontAwesomeSvgIcon icon={faCalendarDay} color={"var(--mdhui-color-primary)"} />} subtitle="View Daily Activity" onClick={() => MyDataHelps.openApplication(props.relativeDailyActivityViewUrl!)} />
                    }
                    {props.monthlyActivityViewUrl &&
                        <Action icon={<FontAwesomeSvgIcon icon={faBarChart} rotation={270} color={"var(--mdhui-color-primary)"} />} subtitle="View Montly Activity" onClick={() => MyDataHelps.openApplication(props.monthlyActivityViewUrl!)} />
                    }
                </Card>
            }
            <Card>
                <FitbitDevices previewState={props.previewState ? "connected" : undefined} />
            </Card>
            <Card>
                <GarminDevices previewState={props.previewState ? "connected" : undefined} />
            </Card>
        </BlankView>
    )
}