import React from 'react'
import { BlankView, Card, DateRangeTitle } from "../.."
import { RelativeActivity, RelativeActivityDayCoordinator } from '../../container'
import { RelativeActivityDataType } from '../../../helpers'
import standardDailyDataTypes from '../../../helpers/daily-data-types/standard'

export interface RelativeDailyActivityViewProps {
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
}

export default function RelativeDailyActivityView(props: RelativeDailyActivityViewProps) {
    let dataTypes = standardDailyDataTypes.map((dataType): RelativeActivityDataType => {
        return {
            dailyDataType: dataType.type,
            color: dataType.color
        }
    });

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