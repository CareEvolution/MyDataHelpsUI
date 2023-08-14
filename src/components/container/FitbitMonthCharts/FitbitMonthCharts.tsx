import React, { useState } from 'react'
import { DateRangeNavigator } from '../../presentational';
import DeviceDataMonthChart from '../DeviceDataMonthChart'
import language from '../../../helpers/language';
import { DailyDataType } from '../../../helpers/query-daily-data';
import MonthCharts, { MonthChartsPreviewState } from '../MonthCharts/MonthCharts';

export interface FitbitMonthChartsProps {
	previewState?: MonthChartsPreviewState
}

export default function (props: FitbitMonthChartsProps) {
	return (
		<MonthCharts previewState={props.previewState} charts={
			[
				{
					lines: [{
						showAverage: true,
						dailyDataType: DailyDataType.FitbitSteps,
						label: language("steps")
					}],
					title: language("steps"),
					syncId: "fitbit"
				},
				{
					lines: [{
						showAverage: true,
						dailyDataType: DailyDataType.FitbitRestingHeartRate,
						label: language("resting-heart-rate")
					}],
					title: language("resting-heart-rate"),
					syncId: "DeviceDataCharts"
				}
			]}
		/>
	);
}