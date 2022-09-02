import React, { useState, useEffect, useRef } from 'react'
import "./DeviceDataMonthChart.css"
import MyDataHelps, { DeviceDataNamespace, DeviceDataPoint, DeviceDataPointQuery, Guid } from "@careevolution/mydatahelps-js"
import parseISO from 'date-fns/parseISO'
import add from 'date-fns/add'
import { format } from 'date-fns'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LoadingIndicator } from '../../presentational'
import { getPreviewData } from './DeviceDataMonthChart.previewdata'

export interface DeviceDataMonthChartProps {
	namespace: DeviceDataNamespace,
	lines: DeviceDataChartLine[],
	month: number,
	year: number,
	syncId?: string,
	title?: string,
	previewState?: DeviceDataMonthChartPreviewState,
	onDataDetected?: Function
}

export interface DeviceDataChartLine {
	label: string,
	deviceDataPointType: string,
	valueConverter?: Function,
	displayByDate?: DateAnchor,
	aggregation: AggregationType,
	//if true, all dates are treated as local time
	ignoreDateOffsets?: boolean,
	ignoreZeros?: boolean,
	showAverage?: boolean
}

export type DeviceDataMonthChartPreviewState = "WithData" | "NoData" | "Loading";

export type AggregationType = "Sum" | "Average" | "Count";
export type DateAnchor = "observation" | "start";

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
	const [dataPoints, setDeviceDataPoints] = useState<DeviceDataPoint[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [hasData, setHasData] = useState(false);

	var currentInitialization = useRef<number>();

	var monthStart = new Date(props.year, props.month, 1, 0, 0, 0, 0);
	var monthEnd = add(monthStart, { months: 1 });

	function checkForAnyData() {
		if (!hasData) {
			var params: DeviceDataPointQuery = {
				namespace: props.namespace,
				type: props.lines.map((l) => l.deviceDataPointType),
				limit: 1
			}
			MyDataHelps.queryDeviceData(params).then(function (result) {
				if (result.deviceDataPoints.length) {
					setHasData(true);
					if (props.onDataDetected) {
						props.onDataDetected();
					}
				}
			})
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
		}
		if (props.previewState == "WithData") {
			var previewData: DeviceDataPoint[] = [];
			props.lines.forEach((l) => {
				var newData = getPreviewData(l.deviceDataPointType, props.namespace, props.year, props.month);
				if (newData) {
					previewData = previewData.concat(newData);
				}
			})
			setDeviceDataPoints(previewData);
		}

		if (props.previewState == "NoData") {
			setDeviceDataPoints([]);
			setLoading(false);
		}
		if (props.previewState) { return; }

		checkForAnyData();

		currentInitialization.current = (currentInitialization.current ?? 0) + 1;
		var initialization = currentInitialization.current ?? 0;
		setLoading(true);
		var loadData = function () {
			var allDataPoints: DeviceDataPoint[] = [];
			var makeRequest = function (pageID: Guid | null) {
				var params: DeviceDataPointQuery = {
					namespace: props.namespace,
					type: props.lines.map((l) => l.deviceDataPointType),
					//Add a buffer so "startDate" anchored data points are filled in, and any utc shifting is accounted for
					observedAfter: add(monthStart, { days: -3 }).toISOString(),
					observedBefore: add(monthEnd, { days: 1 }).toISOString()
				}
				if (pageID) {
					params.pageID = pageID;
				}
				return MyDataHelps.queryDeviceData(params).then(function (result) {
					if (initialization != currentInitialization.current) {
						return;
					}

					allDataPoints = allDataPoints.concat(result.deviceDataPoints);
					if (result.nextPageID) {
						makeRequest(result.nextPageID);
					} else {
						setLoading(false);
						setDeviceDataPoints(allDataPoints);
					}
				});
			}
			makeRequest(null);
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

	var getDay = function (deviceDataPoint: DeviceDataPoint) {
		var type = props.lines.filter((l) => l.deviceDataPointType == deviceDataPoint.type)[0];

		var dateString:string = deviceDataPoint.observationDate!;
		if (type.displayByDate == "start") {
			dateString = deviceDataPoint.startDate!;
		}
		if (type.ignoreDateOffsets) {
			dateString = dateString?.substr(0, 19);
		}
		if (!dateString) {
			return null;
		}
		var date = parseISO(dateString);
		if (date.getMonth() != props.month) {
			return null;
		}
		return date.getDate();
	}

	function getGroupedDataPoints(line: DeviceDataChartLine) {
		var groupedDataPoints: { [day: number]: number[] } = {};
		dataPoints?.forEach((d) => {
			if (d.type != line.deviceDataPointType) {
				return;
			}

			var day = getDay(d);
			if (!day) {
				return;
			}
			if (line.ignoreZeros && parseFloat(d.value) == 0) {
				return;
			}

			if (!groupedDataPoints[day]) {
				groupedDataPoints[day] = [];
			}

			var value = parseFloat(d.value);
			if (line.valueConverter) {
				value = line.valueConverter(d);
			}

			groupedDataPoints[day].push(value);
		});
		return groupedDataPoints;
	}

	var typeGroups: { [type: string]: { [day: number]: number[] } } = {};
	props.lines.forEach(function (l) {
		typeGroups[l.deviceDataPointType] = getGroupedDataPoints(l);
	});

	var data: any[] = [];
	var currentDate = monthStart;
	var graphHasData = false;
	while (currentDate < monthEnd) {
		var dataDay: any = {
			day: currentDate.getDate()
		};
		data.push(dataDay);
		props.lines.forEach((line) => {
			var dataPoints = typeGroups[line.deviceDataPointType][dataDay.day];
			if (dataPoints && dataPoints.length) {
				if (line.aggregation == "Average") {
					dataDay[line.deviceDataPointType] = dataPoints.reduce((a, b) => a + b) / dataPoints.length;
				} else if (line.aggregation == "Count") {
					dataDay[line.deviceDataPointType] = dataPoints.length;
				} else if (line.aggregation == "Sum") {
					dataDay[line.deviceDataPointType] = dataPoints.reduce((partialSum, a) => partialSum + a, 0);
				}
				graphHasData = true;
			}
		});
		currentDate = add(currentDate, { days: 1 });
	}

	const GraphToolTip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			var date = new Date(props.year, props.month, payload[0].payload.day);
			var labelLookup: { [key: string]: string } = {};
			props.lines.forEach(function (line) {
				labelLookup[line.deviceDataPointType] = line.label;
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
		var values = data.map((d) => d[line.deviceDataPointType]) as number[];
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
		<div className="mdhui-device-data-month-chart">
			{props.title &&
				<div className="title">
					{props.title}
				</div>
			}
			{!loading && average != null &&
				<div className="average">
					Daily Average: <span className="average-value">{average}</span>
				</div>
			}
			<div style={{ clear: "both" }}></div>
			<div className="chart-container">
				{(!graphHasData || loading) &&
					<div>
						{!graphHasData && !loading &&
							<div className="no-data-label">No Data</div>
						}
						{loading &&
							<LoadingIndicator />
						}
						<ResponsiveContainer width="100%" height={150}>
							<LineChart width={400} height={400} data={data} syncId={props.syncId}>
								<CartesianGrid strokeDasharray="3 3" />
								<YAxis axisLine={false} interval={0} tickLine={false} width={30} scale="linear" />
								<XAxis tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={1} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				}
				{graphHasData && !loading &&
					<ResponsiveContainer width="100%" height={150}>
						<LineChart width={400} height={400} data={data} syncId={props.syncId}>
							{props.lines.map((line) =>
								<Line key={line.deviceDataPointType} type="monotone" dataKey={line.deviceDataPointType} stroke="var(--color-primary)" />
							)}
							<Tooltip content={<GraphToolTip />} />
							<CartesianGrid strokeDasharray="3 3" />
							<YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={30} />
							<XAxis tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={1} />
						</LineChart>
					</ResponsiveContainer>
				}
			</div>
		</div>
	);
}