import React, { useState } from 'react'
import language from '../../../helpers/language';
import { DailyDataType } from '../../../helpers/query-daily-data';
import MonthCharts, { MonthChartsPreviewState } from '../MonthCharts/MonthCharts';

export interface GarminMonthChartsProps {
	previewState?: MonthChartsPreviewState
}

export default function (props: GarminMonthChartsProps) {
	return (
		<MonthCharts previewState={props.previewState} charts={
			[
				{
					lines:
						[{
							showAverage: true,
							dailyDataType: DailyDataType.GarminSteps,
							label: language["steps"]
						}],
					title: language["steps"],
					syncId: "garmin"
				},
				{
					lines:
						[{
							showAverage: true,
							dailyDataType: DailyDataType.GarminRestingHeartRate,
							label: language["resting-heart-rate"]
						}],
					title: language["resting-heart-rate"],
					syncId: "DeviceDataCharts"
				},
			]}
		/>
	);
}