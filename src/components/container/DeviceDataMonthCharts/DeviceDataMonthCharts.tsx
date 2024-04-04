import React, { useState } from 'react'
import DeviceDataMonthChart from '../DeviceDataMonthChart'
import language from '../../../helpers/language';
import { DateRangeNavigator, TextBlock } from '../../presentational';
import { DailyDataType } from '../../..';

export interface DeviceDataMonthChartsProps {
	previewState?: DeviceDataMonthChartsPreviewState
}

export type DeviceDataMonthChartsPreviewState = "Default" | "NoData";

export default function (props: DeviceDataMonthChartsProps) {
	const [visible, setVisible] = useState(false);
	var currentDate = new Date();
	const [intervalStart, setIntervalStart] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0));

	function updateInterval(intervalStart: Date) {
		setIntervalStart(intervalStart);
	}

	function onDataDetected() {
		setVisible(true);
	}

	var month = intervalStart.getMonth();
	var year = intervalStart.getFullYear();
	return (
		<>
			{!visible &&
				<TextBlock>
					{language("device-data-no-data")}
				</TextBlock>
			}
			<div style={{ display: visible ? "block" : "none" }}>
				<DateRangeNavigator intervalType="Month" intervalStart={intervalStart} onIntervalChange={updateInterval} />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.FitbitSteps,
						label: language("steps")
					}]}
					title={"Fitbit " + language("steps")}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.FitbitRestingHeartRate,
						label: language("resting-heart-rate")
					}]}
					title={"Fitbit " + language("resting-heart-rate")}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.GarminSteps,
						label: language("steps")
					}]}
					title={"Garmin " + language("steps")}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.GarminRestingHeartRate,
						label: language("resting-heart-rate")
					}]}
					title={"Garmin " + language("resting-heart-rate")}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.AppleHealthSteps,
						label: language("steps")
					}]}
					title={"Apple Health " + language("steps")}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.AppleHealthDistanceWalkingRunning,
						label: language("distance-traveled"),
						valueConverter: function (dataPoint: number) {
							return dataPoint * 0.000621371;
						}
					}]}
					title={"Apple Health " + language("distance-traveled") + " (Miles)"}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.GoogleFitSteps,
						label: language("steps")
					}]}
					title={"Google Fit " + language("steps")}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: DailyDataType.AppleHealthSleepMinutes,
						label: language("device-data-month-chart-minutes")
					}]}
					title={"Apple Health " + language("device-data-month-chart-sleep") + " (" + language("device-data-month-chart-minutes") + ")"}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
			</div>
		</>
	);
}