import React, { useState, useEffect, useRef } from 'react'
import "./DeviceDataMonthChart.css"
import MyDataHelps from "@careevolution/mydatahelps-js"
import add from 'date-fns/add'
import { format } from 'date-fns'
import { LineChart, Line, ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { LoadingIndicator } from '../../presentational'
import { queryDailyData, checkDailyDataAvailability, DailyDataQueryResult } from '../../../helpers/query-daily-data'
import getDayKey from '../../../helpers/get-day-key'
import language from "../../../helpers/language"

export interface DeviceDataMonthChartProps {
	lines: DeviceDataChartLine[],
	month: number,
	year: number,
	syncId?: string,
	title?: string,
	previewState?: DeviceDataMonthChartPreviewState,
	onDataDetected?: Function
	innerRef?: React.Ref<HTMLDivElement>
}

export interface DeviceDataChartLine {
	label: string,
	dailyDataType: string,
	valueConverter?: Function,
	showAverage?: boolean
}

export type DeviceDataMonthChartPreviewState = "WithData" | "NoData" | "Loading";

interface TickProps {
	x: number,
	y: number,
	stroke: any,
	payload: any
}

function DayTick(props: TickProps) {
	const { x, y, stroke, payload } = props;
	var value = payload.value;
	return (
		<text x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>
	);
}

export default function (props: DeviceDataMonthChartProps) {
	const [dailyData, setDailyData] = useState<{ [key: string]: DailyDataQueryResult } | null>(null);
	const [loading, setLoading] = useState(false);
	const [hasData, setHasData] = useState(false);

	var currentInitialization = useRef<number>();

	var monthStart = new Date(props.year, props.month, 1, 0, 0, 0, 0);
	var monthEnd = add(monthStart, { months: 1 });

	function checkForAnyData() {
		if (!hasData) {
			var promises = props.lines.map(l => checkDailyDataAvailability(l.dailyDataType));
			Promise.all(promises).then(function (values) {
				if (values.find(v => v)) {
					setHasData(true);
					if (props.onDataDetected) {
						props.onDataDetected();
					}
				}
			});
		}
	}

	function initialize() {
		if (props.previewState) {
			setHasData(true);
			if (props.onDataDetected) {
				props.onDataDetected();
			}
		}

		if (props.previewState == "Loading") {
			setLoading(true);
			return;
		}

		if (props.previewState == "NoData") {
			var previewData: { [key: string]: { [key: string]: number } } = {};
			props.lines.forEach((l) => {
				previewData[l.dailyDataType] = {};
			})
			setDailyData(previewData);
			setLoading(false);
			return;
		}

		checkForAnyData();

		currentInitialization.current = (currentInitialization.current ?? 0) + 1;
		var initialization = currentInitialization.current ?? 0;
		setLoading(true);
		var loadData = function () {
			var dataRequests = props.lines.map(l => queryDailyData(l.dailyDataType, monthStart, monthEnd, props.previewState !== undefined));
			Promise.all(dataRequests).then(function (data) {
				if (initialization != currentInitialization.current) {
					return;
				}
				var newDailyData: { [key: string]: DailyDataQueryResult } = {};
				for (var i = 0; i < props.lines.length; i++) {
					newDailyData[props.lines[i].dailyDataType] = data[i];
				}
				setDailyData(newDailyData);
				setLoading(false);
			})
		}

		loadData();
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

	var data: any[] = [];
	var currentDate = monthStart;
	var graphHasData = false;
	while (currentDate < monthEnd) {
		var dataDay: any = {
			day: currentDate.getDate()
		};
		data.push(dataDay);
		var dayKey = getDayKey(currentDate);
		props.lines.forEach((line) => {
			if (dailyData) {
				dataDay[line.dailyDataType] = dailyData[line.dailyDataType][dayKey];
				if (line.valueConverter) {
					dataDay[line.dailyDataType] = line.valueConverter(dataDay[line.dailyDataType]);
				}
				if (dataDay[line.dailyDataType] > 0) {
					graphHasData = true;
				}
			}
		});
		currentDate = add(currentDate, { days: 1 });
	}

	const GraphToolTip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			var date = new Date(props.year, props.month, payload[0].payload.day);
			var labelLookup: { [key: string]: string } = {};
			props.lines.forEach(function (line) {
				labelLookup[line.dailyDataType] = line.label;
			});

			return (
				<div className="graph-tooltip">
					<div className="graph-date">{format(date, 'MM/dd/yyyy')}</div>
					<table className="payload-values">
						<tbody>
							{payload.map((p: any) =>
								<tr key={p.dataKey}>
									<th>{labelLookup[p.dataKey]}</th>
									<td>{parseFloat(p.value.toFixed(2))}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			);
		}

		return null;
	};

	function tickFormatter(args: any) {
		if (args >= 10000) {
			return Math.floor(args / 1000) + 'K';
		}
		return args;
	}

	function calculateAverage() {
		var lines = props.lines.filter((l) => l.showAverage);
		if (lines.length == 0) { return null };
		if (lines.length > 1) {
			console.error("Only one line can display an average");
			return null;
		}

		var line = lines[0];
		var values = data.map((d) => d[line.dailyDataType]) as number[];
		values = values.filter(v => !!v);
		if (!values.length) { return null; }
		var calculated = values.reduce((a, b) => a + b) / values.length;
		return calculated.toLocaleString('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 1
		});
	}

	if (!hasData) {
		return null;
	}

	var average = calculateAverage();
	return (
		<div className="mdhui-device-data-month-chart" ref={props.innerRef}>
			{props.title &&
				<div className="title">
					{props.title}
				</div>
			}
			{!loading && average != null &&
				<div className="average">
					{language("device-data-month-chart-daily-average")}: <span className="average-value">{average}</span>
				</div>
			}
			<div style={{ clear: "both" }}></div>
			<div className="chart-container">
				{(!graphHasData || loading) &&
					<div>
						{!graphHasData && !loading &&
							<div className="no-data-label">{language("device-data-month-chart-no-data")}</div>
						}
						{loading &&
							<LoadingIndicator />
						}
						<ResponsiveContainer width="100%" height={150}>
							<LineChart width={400} height={400} data={data} syncId={props.syncId}>
								<CartesianGrid strokeDasharray="3 3" />
								<YAxis axisLine={false} interval={0} tickLine={false} width={30} scale="linear" />
								<XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={1} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				}
				{graphHasData && !loading &&
					<ResponsiveContainer width="100%" height={150}>
						<LineChart width={400} height={400} data={data} syncId={props.syncId}>
							{props.lines.map((line) =>
								<Line key={line.dailyDataType} type="monotone" dataKey={line.dailyDataType} stroke="var(--mdhui-color-primary)" />
							)}
							<Tooltip content={<GraphToolTip />} />
							<CartesianGrid strokeDasharray="3 3" />
							<YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={30} />
							<XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={1} />
						</LineChart>
					</ResponsiveContainer>
				}
			</div>
		</div>
	);
}