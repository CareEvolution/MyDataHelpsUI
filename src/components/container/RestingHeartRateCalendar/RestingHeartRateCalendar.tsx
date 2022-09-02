import React, { useEffect, useState } from 'react'
import Calendar from '../../presentational/Calendar';
import MyDataHelps, { DeviceDataPoint } from "@careevolution/mydatahelps-js"
import { LoadingIndicator } from '../../presentational';
import { getPreviewData } from '../DeviceDataMonthChart/DeviceDataMonthChart.previewdata';
import { add } from 'date-fns';
import "./RestingHeartRateCalendar.css";

type HeartRateMap = { [key: string]: number[] };

export type RestingHeartRateCalendarPreviewState = "WithData" | "NoData" | "Loading";

export interface RestingHeartRateCalendarProps {
	month: number,
	year: number,
	showPreviewData: RestingHeartRateCalendarPreviewState
}

export default function (props: RestingHeartRateCalendarProps) {
	const [loading, setLoading] = useState(false);
	const [heartRates, setHeartRates] = useState<HeartRateMap>({});

	var monthStart = new Date(props.year, props.month, 1, 0, 0, 0, 0);
	var monthEnd = add(monthStart, { months: 1 });

	function getAppleHeartRates() {
		return MyDataHelps.queryDeviceData({
			namespace: 'AppleHealth',
			type: ['RestingHeartRate'],
			observedAfter: add(monthStart, { days: -3 }).toISOString(),
			observedBefore: add(monthEnd, { days: 1 }).toISOString()
		});
	}

	function getFitbitHeartRates() {
		return MyDataHelps.queryDeviceData({
			namespace: 'Fitbit',
			type: ['RestingHeartRate'],
			observedAfter: add(monthStart, { days: -3 }).toISOString(),
			observedBefore: add(monthEnd, { days: 1 }).toISOString()
		});
	}

	function getRestingHeartRates() {
		return Promise.all([getAppleHeartRates(), getFitbitHeartRates()]).then(function (heartRates) {
			var result = parseRestingHeartRates(heartRates[0].deviceDataPoints.concat(heartRates[1].deviceDataPoints));
			setHeartRates(result);
		});
	}

	function parseRestingHeartRates(heartRates: DeviceDataPoint[]) {
		var result: HeartRateMap = {};
		heartRates.forEach(function (heartRate) {
			var startDate = heartRate.startDate?.substring(0, 10);
			if (startDate) {
				if (!result[startDate]) {
					result[startDate] = [];
				}
				result[startDate].push(parseFloat(heartRate.value));
			}
		});

		return result;
	}

	function getHeartRate(year: number, month: number, day?: number): number | undefined {
		if (day === undefined) {
			return undefined;
		}

		var dateString = new Date(year, month, day).toJSON().substring(0, 10);
		var heartRatesForDay = heartRates[dateString];
		if (!heartRatesForDay) {
			return undefined;
		}

		return Math.round(heartRatesForDay.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / heartRatesForDay.length);
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
		if (props.showPreviewData) {
			if (props.showPreviewData === "Loading") {
				setLoading(true);
			}
			else if (props.showPreviewData === "WithData") {
				var previewData = getPreviewData("RestingHeartRate", "Fitbit", props.year, props.month);
				if (previewData) {
					setHeartRates(parseRestingHeartRates(previewData));
				}
			}
		}
		else {
			setLoading(true);
			getRestingHeartRates().then(() => setLoading(false));
		}
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
		<div>
			{loading && <LoadingIndicator />}
			{!loading && <Calendar year={props.year} month={props.month} dayRenderer={renderDay}></Calendar>}
		</div>
	);
}