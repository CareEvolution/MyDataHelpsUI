import React from 'react'
import { BlankView, Card, DateRangeTitle } from "../.."
import { RelativeActivity, RelativeActivityDayCoordinator } from '../../container'
import { DailyDataType, RelativeActivityDataType } from '../../../helpers'

export interface RelativeDailyActivityViewProps {
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    dataTypes?: RelativeActivityDataType[]
}

export default function ConnectDevicesView(props: RelativeDailyActivityViewProps) {
    let activityColor = "#f5b722";
    let sleepColor = "#7b88c6";
    let heartColor = "#e35c33";

    let dataTypes: RelativeActivityDataType[] = props.dataTypes ?? [
        {
            dailyDataType: DailyDataType.SleepMinutes,
            color: sleepColor
        },
        {
            dailyDataType: DailyDataType.Steps,
            color: activityColor
        },
        {
            dailyDataType: DailyDataType.FitbitActiveMinutes,
            color: activityColor
        },
        {
            dailyDataType: DailyDataType.GarminActiveMinutes,
            color: activityColor
        },
        {
            dailyDataType: DailyDataType.AppleHealthActiveEnergyBurned,
            color: activityColor
        },
        {
            dailyDataType: DailyDataType.GarminTotalCalories,
            color: heartColor
        },
        {
            dailyDataType: DailyDataType.FitbitCaloriesBurned,
            color: heartColor
        },
        {
            dailyDataType: DailyDataType.FitbitElevatedHeartRateMinutes,
            color: heartColor
        },
        {
            dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
            color: heartColor
        },
        {
            dailyDataType: DailyDataType.GarminMaxHeartRate,
            color: heartColor
        },
        {
            dailyDataType: DailyDataType.RestingHeartRate,
            color: heartColor
        }
    ];

    return (
        <BlankView showBackButton={props.presentation == "Push"}
            showCloseButton={props.presentation == "Modal"}>
            <RelativeActivityDayCoordinator dataTypes={dataTypes} previewState={props.previewState}>
                <Card>
                    <DateRangeTitle defaultMargin />
                    <RelativeActivity useContext previewState="Default" />
                </Card>
            </RelativeActivityDayCoordinator>
        </BlankView>
    )
}