import React, { useState } from 'react'
import DeviceDataMonthChart from '../DeviceDataMonthChart'
import language from '../../../helpers/language';
import { DateRangeNavigator, TextBlock } from '../../presentational';

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
					{language["device-data-no-data"]}
				</TextBlock>
			}
			<div style={{ display: visible ? "block" : "none" }}>
				<DateRangeNavigator intervalType="Month" intervalStart={intervalStart} onIntervalChange={updateInterval} />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: "FitbitSteps",
						label: language["steps"]
					}]}
					title={"Fitbit " + language["steps"]}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: "FitbitRestingHeartRate",
						label: language["resting-heart-rate"]
					}]}
					title={"Fitbit " + language["resting-heart-rate"]}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				<DeviceDataMonthChart onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "Default" ? "WithData" : undefined}
					lines={[{
						showAverage: true,
						dailyDataType: "AppleHealthSteps",
						label: language["steps"]
					}]}
					title={"Apple Health " + language["steps"]}
					month={month}
					year={year}
					syncId="DeviceDataCharts" />
				{/*<DeviceDataMonthChart onDataDetected={() => onDataDetected()}*/}
				{/*	previewState={props.previewState == "Default" ? "WithData" : undefined}*/}
				{/*	lines={[{*/}
				{/*		showAverage: true,*/}
				{/*		dailyDataType: "HourlyDistanceWalkingRunning",*/}
				{/*		label: language["distance-traveled"],*/}
				{/*		displayByDate: "start",*/}
				{/*		ignoreDateOffsets: false,*/}
				{/*		ignoreZeros: true,*/}
				{/*		aggregation: "Sum",*/}
				{/*		valueConverter: function (dataPoint: DeviceDataPoint) {*/}
				{/*			if (dataPoint.units == "m") {*/}
				{/*				return parseFloat(dataPoint.value) * 0.000621371;*/}
				{/*			}*/}
				{/*			return null;*/}
				{/*		}*/}
				{/*	}]}*/}
				{/*	title={"Apple Health " + language["distance-traveled"] + " (Miles)"}*/}
				{/*	month={month}*/}
				{/*	year={year}*/}
				{/*	syncId="DeviceDataCharts" />*/}
				{/*<DeviceDataMonthChart onDataDetected={() => onDataDetected()}*/}
				{/*	previewState={props.previewState == "Default" ? "WithData" : undefined}*/}
				{/*	namespace="GoogleFit"*/}
				{/*	lines={[{*/}
				{/*		showAverage: true,*/}
				{/*		deviceDataPointType: "Steps",*/}
				{/*		label: language["steps"],*/}
				{/*		displayByDate: "start",*/}
				{/*		ignoreDateOffsets: false,*/}
				{/*		ignoreZeros: true,*/}
				{/*		aggregation: "Sum"*/}
				{/*	}]}*/}
				{/*	title={"Google Fit " + language["steps"]}*/}
				{/*	month={month}*/}
				{/*	year={year}*/}
				{/*	syncId="DeviceDataCharts" />*/}
			</div>
		</>
	);
}