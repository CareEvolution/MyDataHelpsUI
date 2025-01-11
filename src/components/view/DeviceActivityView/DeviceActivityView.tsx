import React from 'react'
import { BlankView, Card, DateRangeCoordinator, DateRangeTitle, Section, SegmentedControl } from "../.."
import { DailyDataChart, RelativeActivity, RelativeActivityDayCoordinator } from '../../container'
import { DailyDataType, language, RelativeActivityDataType } from '../../../helpers'
import standardDailyDataTypes from '../../../helpers/daily-data-types/standard'

export interface DeviceActivityViewProps {
    presentation?: "Modal" | "Push"
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
}

export default function DeviceActivityView(props: DeviceActivityViewProps) {
    let [selectedView, setSelectedView] = React.useState<"daily" | "weekly" | "monthly">("daily");

    let dataTypes = standardDailyDataTypes.map((dataType): RelativeActivityDataType => {
        return {
            dailyDataType: dataType.type,
            color: dataType.color
        }
    });

    return (
        <BlankView showBackButton={props.presentation == "Push"}
            showCloseButton={props.presentation == "Modal"}
            colorScheme={props.colorScheme}>
            <SegmentedControl
                style={{ marginLeft: "16px", marginRight: "16px", marginBottom: selectedView == "daily" ? "16px" : "0px" }}
                variant="default"
                segments={[{ title: language("daily"), key: "daily" }, { title: language("weekly"), key: "weekly" }, { title: language("monthly"), key: "monthly" }]}
                onSegmentSelected={(s) => setSelectedView(s as any)}
                selectedSegment={selectedView} />
            {selectedView == "daily" &&
                <RelativeActivityDayCoordinator dataTypes={dataTypes} previewState={props.previewState}>
                    <Card>
                        <DateRangeTitle defaultMargin />
                        <RelativeActivity useContext previewState="Default" />
                    </Card>
                </RelativeActivityDayCoordinator>
            }
            {(selectedView == "monthly" || selectedView == "weekly") &&
                <DateRangeCoordinator intervalType={selectedView == "weekly" ? "Week" : "Month"} key={selectedView} variant="rounded">
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
            }
        </BlankView>
    )
}