import React from 'react'
import { BlankView, DateRangeCoordinator, Section } from "../.."
import { DailyDataChart } from '../../container'
import { DailyDataType, language, RelativeActivityDataType } from '../../../helpers'
import standardDailyDataTypes from '../../../helpers/daily-data-types/standard'

export interface MonthlyActivityViewProps {
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    dataTypes?: RelativeActivityDataType[]
}

export default function MonthlyActivityView(props: MonthlyActivityViewProps) {
    return (
        <BlankView showBackButton={props.presentation == "Push"}
            showCloseButton={props.presentation == "Modal"}>
            <DateRangeCoordinator intervalType="Month" variant="rounded">
                <Section noTopMargin>
                    {standardDailyDataTypes.map(dataType =>
                        <DailyDataChart hideIfNoData={dataType.type != DailyDataType.Steps && dataType.type != DailyDataType.SleepMinutes}
                            title={dataType.labelKey ? language(dataType.labelKey) : undefined}
                            key={dataType.type}
                            dailyDataType={dataType.type}
                            chartType="Bar"
                            options={{ barColor: dataType.color }}
                            previewState={props.previewState} />
                    )}
                </Section>
            </DateRangeCoordinator>
        </BlankView>
    )
}