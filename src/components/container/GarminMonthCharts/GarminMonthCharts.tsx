import React, { useState } from 'react'
import { DateRangeNavigator } from '../../presentational';
import DeviceDataMonthChart from '../DeviceDataMonthChart'
import language from '../../../helpers/language';
import { DailyDataType } from '../../../helpers/query-daily-data';

export interface GarminMonthChartsProps {
	previewState?: GarminMonthChartsPreviewState
}

export type GarminMonthChartsPreviewState = "notEnabled" | "notConnected" | "connected";

export default function (props: GarminMonthChartsProps) {
	const [visible, setVisible] = useState(false);
	var currentDate = new Date();
	const [intervalStart, setIntervalStart] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0));

	function updateInterval(date: Date) {
		setIntervalStart(date);
	}

	function onDataDetected() {
		setVisible(true);
	}

	var month = intervalStart.getMonth();
	var year = intervalStart.getFullYear();
	return (
		<div style={{ display: visible ? "block" : "none" }}>
			<DateRangeNavigator intervalType="Month" intervalStart={intervalStart} onIntervalChange={updateInterval} />
			<DeviceDataMonthChart
				onDataDetected={() => onDataDetected()}
				previewState={props.previewState == "connected" ? "WithData" : props.previewState == "notEnabled" || props.previewState == "notConnected" ? "NoData" : undefined }
				lines={[{
					showAverage: true,
					dailyDataType: DailyDataType.GarminSteps,
					label: language["steps"]
				}]}
				title={language["steps"]}
				syncId="garmin"
				month={month}
				year={year} />
			<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
				previewState={props.previewState == "connected" ? "WithData" : props.previewState == "notEnabled" || props.previewState == "notConnected" ? "NoData" : undefined }
				lines={[{
					showAverage: true,
					dailyDataType: DailyDataType.GarminRestingHeartRate,
					label: language["resting-heart-rate"]
				}]}
				title={language["resting-heart-rate"]}
				month={month}
				year={year}
				syncId="DeviceDataCharts" />
		</div>
	);
}