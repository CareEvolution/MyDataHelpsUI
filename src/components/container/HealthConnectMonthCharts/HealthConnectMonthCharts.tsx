import React from "react";
import language from "../../../helpers/language";
import { DailyDataType } from "../../../helpers";
import MonthCharts, {
    MonthChartsPreviewState,
} from "../MonthCharts/MonthCharts";

export interface HealthConnectMonthChartsProps {
    previewState?: MonthChartsPreviewState;
}

export default function (props: HealthConnectMonthChartsProps) {
    return (
        <MonthCharts
            previewState={props.previewState}
            charts={[
                {
                    lines: [
                        {
                            showAverage: true,
                            dailyDataType: DailyDataType.HealthConnectSteps,
                            label: language("steps"),
                        },
                    ],
                    title: language("steps"),
                    syncId: "health-connect",
                },
                {
                    lines: [
                        {
                            showAverage: true,
                            dailyDataType:
                                DailyDataType.HealthConnectAverageRestingHeartRate,
                            label: language("resting-heart-rate"),
                        },
                    ],
                    title: language("resting-heart-rate"),
                    syncId: "health-connect",
                },
                {
                    lines: [
                        {
                            showAverage: true,
                            dailyDataType:
                                DailyDataType.HealthConnectTotalSleepMinutes,
                            label: language("sleep-time"),
                        },
                    ],
                    title: language("sleep-time"),
                    syncId: "health-connect",
                },
                {
                    lines: [
                        {
                            showAverage: true,
                            dailyDataType:
                                DailyDataType.HealthConnectLightSleepMinutes,
                            label: language("light-sleep-time"),
                        },
                    ],
                    title: language("light-sleep-time"),
                    syncId: "health-connect",
                },
                {
                    lines: [
                        {
                            showAverage: true,
                            dailyDataType:
                                DailyDataType.HealthConnectRemSleepMinutes,
                            label: language("rem-sleep-time"),
                        },
                    ],
                    title: language("rem-sleep-time"),
                    syncId: "health-connect",
                },
                {
                    lines: [
                        {
                            showAverage: true,
                            dailyDataType:
                                DailyDataType.HealthConnectDeepSleepMinutes,
                            label: language("deep-sleep-time"),
                        },
                    ],
                    title: language("deep-sleep-time"),
                    syncId: "health-connect",
                },
            ]}
        />
    );
}
