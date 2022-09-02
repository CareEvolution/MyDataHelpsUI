import React, { useState } from 'react'
import { DateRangeNavigator } from '../../presentational';
import DeviceDataMonthChart from '../DeviceDataMonthChart'
import language from '../../../helpers/language';

export interface FitbitMonthChartsProps {
	previewState?: FitbitMonthChartsPreviewState
}

export type FitbitMonthChartsPreviewState = "notEnabled" | "notConnected" | "connected";

export default function (props: FitbitMonthChartsProps) {
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
					deviceDataPointType: "Steps",
					label: language["steps"],
					displayByDate: "start",
					ignoreDateOffsets: true,
					ignoreZeros: true,
					aggregation: "Average"
				}]}
				title={language["steps"]}
				syncId="fitbit"
				namespace="Fitbit"
				month={month}
				year={year} />
			<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
				previewState={props.previewState == "connected" ? "WithData" : props.previewState == "notEnabled" || props.previewState == "notConnected" ? "NoData" : undefined }
				namespace="Fitbit"
				lines={[{
					showAverage: true,
					deviceDataPointType: "RestingHeartRate",
					label: language["resting-heart-rate"],
					displayByDate: "start",
					ignoreDateOffsets: true,
					ignoreZeros: true,
					aggregation: "Average"
				}]}
				title={language["resting-heart-rate"]}
				month={month}
				year={year}
				syncId="DeviceDataCharts" />
		</div>
	);
}