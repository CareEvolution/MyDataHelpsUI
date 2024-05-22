import React, { useState } from 'react'
import { DateRangeNavigator } from '../../presentational';
import DeviceDataMonthChart, { DeviceDataChartLine } from '../DeviceDataMonthChart'

export interface MonthChartsProps {
	previewState?: MonthChartsPreviewState
	charts?: {
		lines: DeviceDataChartLine[],
		title: string,
		syncId: string
	}[]
}

export type MonthChartsPreviewState = "notEnabled" | "notConnected" | "connected";

export default function (props: MonthChartsProps) {
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
			{props.charts?.map((chart) =>
				<DeviceDataMonthChart
					onDataDetected={() => onDataDetected()}
					previewState={props.previewState == "connected" ? "WithData" : props.previewState == "notEnabled" || props.previewState == "notConnected" ? "NoData" : undefined}
					lines={chart.lines}
					title={chart.title}
					syncId={chart.syncId}
					month={month}
					year={year} />	
			)}
		</div>
	);
}