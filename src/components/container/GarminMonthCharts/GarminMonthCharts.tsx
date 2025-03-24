import React from 'react'
import language from '../../../helpers/language';
import { DailyDataType } from '../../../helpers';
import MonthCharts, { MonthChartsPreviewState } from '../MonthCharts/MonthCharts';

export interface GarminMonthChartsProps {
	previewState?: MonthChartsPreviewState
}

/**
 * This component displays Garmin Steps and Garmin Resting Heart Rate as line charts based on the availability of participant data
 */
export default function GarminMonthCharts(props: GarminMonthChartsProps) {
	return (
		<MonthCharts previewState={props.previewState} charts={
			[
				{
					lines:
						[{
							showAverage: true,
							dailyDataType: DailyDataType.GarminSteps,
							label: language("steps")
						}],
					title: language("steps"),
					syncId: "garmin"
				},
				{
					lines:
						[{
							showAverage: true,
							dailyDataType: DailyDataType.GarminRestingHeartRate,
							label: language("resting-heart-rate")
						}],
					title: language("resting-heart-rate"),
					syncId: "DeviceDataCharts"
				},
			]}
		/>
	);
}