import React, { useEffect, useState } from 'react'
import Calendar from '../../presentational/Calendar';
import MyDataHelps from "@careevolution/mydatahelps-js"
import { LoadingIndicator } from '../../presentational';
import { add } from 'date-fns';
import "./RestingHeartRateCalendar.css";
import getDayKey from '../../../helpers/get-day-key';
import { queryDailyData, DailyDataType } from '../../../helpers';

type HeartRateMap = { [key: string]: number };

export type RestingHeartRateCalendarPreviewState = "WithData" | "NoData" | "Loading";
export type RestingHeartRateDataSource = "Combined" | "AppleHealth" | "Fitbit" | "Garmin" | "HealthConnect";

export interface RestingHeartRateCalendarProps {
	month: number,
	year: number,
	showPreviewData: RestingHeartRateCalendarPreviewState
	dataTypeSource?: RestingHeartRateDataSource
	innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: RestingHeartRateCalendarProps) {
	const [loading, setLoading] = useState(false);
	const [heartRates, setHeartRates] = useState<HeartRateMap>({});

	var monthStart = new Date(props.year, props.month, 1, 0, 0, 0, 0);
	var monthEnd = add(monthStart, { months: 1 });

	function getRestingHeartRates(dataTypeSource?: RestingHeartRateDataSource) {
		var dailyDataType: DailyDataType = DailyDataType.RestingHeartRate;
		
		if (dataTypeSource == "AppleHealth") dailyDataType = DailyDataType.AppleHealthRestingHeartRate;
		if (dataTypeSource == "Fitbit") dailyDataType = DailyDataType.FitbitRestingHeartRate;
		if (dataTypeSource == "Garmin") dailyDataType = DailyDataType.GarminRestingHeartRate;
		if (dataTypeSource == "HealthConnect") dailyDataType = DailyDataType.HealthConnectAverageRestingHeartRate;
		
		return queryDailyData(dailyDataType, monthStart, monthEnd, props.showPreviewData !== undefined).then(function (result) {
			setHeartRates(result);
		});
	}

	function getHeartRate(year: number, month: number, day?: number): number | undefined {
		if (day === undefined) {
			return undefined;
		}

		var dateString = getDayKey(new Date(year, month, day));
		return heartRates[dateString];
	}

	function renderDay(year: number, month: number, day?: number): JSX.Element {
		const heartRate = getHeartRate(year, month, day);
		return (
			day !== undefined ?
				<div className="mdhui-calendar-day-with-data-value">
					<div className="calendar-value">{heartRate}</div>
					<div className="calendar-day">{day}</div>
				</div> :
				<div></div>
		);
	}

	function initialize() {
		if (props.showPreviewData === "NoData") {
			return;
		}
		if (props.showPreviewData === "Loading") {
			setLoading(true);
			return;
		}

		setLoading(true);
		getRestingHeartRates(props.dataTypeSource).then(() => setLoading(false));
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		MyDataHelps.on("externalAccountSyncComplete", initialize);

		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
			MyDataHelps.off("externalAccountSyncComplete", initialize);
		}
	}, [props]);

	return (
		<div ref={props.innerRef}>
			{loading && <LoadingIndicator />}
			{!loading && <Calendar year={props.year} month={props.month} dayRenderer={renderDay}></Calendar>}
		</div>
	);
}