import React from "react";
import { DailyDataQueryResult } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import DateRangeCoordinator, { DateRangeCoordinatorProps } from "./DateRangeCoordinator";
import DailyDataChart from "../../container/DailyDataChart/DailyDataChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";
import { SurveyDataChart } from "../../container";
import { SurveyAnswer } from "@careevolution/mydatahelps-js";

export default { title: "Presentational/DateRangeCoordinator", component: DateRangeCoordinator, parameters: { layout: 'fullscreen' } };
let render = (args: DateRangeCoordinatorProps) => <Layout><DateRangeCoordinator {...args} /></Layout>

let children = <Card><DailyDataChart title="Steps"
	intervalType="Week"
	weekStartsOn="6DaysAgo"
	dailyDataType="DailyDataType.Steps"
	valueFormatter={(value: number) => Number(value.toFixed(0)).toLocaleString()}
	chartType="Line"
	previewDataProvider={(start: Date, end: Date) => {
		let data: DailyDataQueryResult = {};
		let currentDate = new Date(start);
		while (currentDate < end) {
			let dayKey = getDayKey(currentDate);
			data[dayKey] = Math.random() * 100;
			currentDate = add(currentDate, { days: 1 });
		}
		return Promise.resolve(data);
	}} /><SurveyDataChart title="Pain Score"
	intervalType="Week"
	weekStartsOn="6DaysAgo"
	chartType="Line"
	charts={[{label: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }]}
	previewDataProvider={(start: Date, end: Date) => {
		function generateSurveyResponse(date: Date, resultIdentifier: string, surveyName: string): SurveyAnswer {
			return {
				"id": "00000000-0000-0000-0000-000000000000",
				"surveyID": "00000000-0000-0000-0000-000000000000",
				"surveyResultID": "00000000-0000-0000-0000-000000000000",
				"surveyVersion": 0,
				"surveyName": surveyName,
				"surveyDisplayName": surveyName,
				"date": date.toISOString(),
				"stepIdentifier": resultIdentifier,
				"resultIdentifier": resultIdentifier,
				"answers": [
					(Math.random() * 90 + 10).toString()
				],
				"insertedDate": date.toISOString()
			};
		}
		var data = [];
		let currentDate = new Date(start);
		while (currentDate < end) {
			data.push(generateSurveyResponse(currentDate, "PainToday", 'Pain Survey'));
			currentDate = add(currentDate, { days: 7 });
		}
		let standardData: SurveyAnswer[][] = [data];
		return Promise.resolve(standardData);
	}} /><DailyDataChart title="Steps"
	intervalType="Week"
	weekStartsOn="6DaysAgo"
	dailyDataType="DailyDataType.Steps"
	valueFormatter={(value: number) => Number(value.toFixed(0)).toLocaleString()}
	chartType="Line"
	previewDataProvider={(start: Date, end: Date) => {
		let data: DailyDataQueryResult = {};
		let currentDate = new Date(start);
		while (currentDate < end) {
			let dayKey = getDayKey(currentDate);
			data[dayKey] = Math.random() * 100;
			currentDate = add(currentDate, { days: 1 });
		}
		return Promise.resolve(data);
	}} /><DailyDataChart title="Steps"
	intervalType="Week"
	weekStartsOn="6DaysAgo"
	dailyDataType="DailyDataType.Steps"
	valueFormatter={(value: number) => Number(value.toFixed(0)).toLocaleString()}
	chartType="Line"
	previewDataProvider={(start: Date, end: Date) => {
		let data: DailyDataQueryResult = {};
		let currentDate = new Date(start);
		while (currentDate < end) {
			let dayKey = getDayKey(currentDate);
			data[dayKey] = Math.random() * 100;
			currentDate = add(currentDate, { days: 1 });
		}
		return Promise.resolve(data);
	}} /></Card>;

export const day = {
	args: {
		variant: "rounded",
		initialIntervalStart: new Date(),
		intervalType: "Day",
		children: <Card></Card>
	},
	render: render
};

export const month = {
	args: {
		variant: "rounded",
		intervalType: "Month",
		children: children
	},
	render: render
};

export const sixMonth = {
	args: {
		variant: "rounded",
		intervalType: "SixMonth",
		children: children
	},
	render: render
};

export const weekStartsSunday = {
	args: {
		variant: "rounded",
		intervalType: "Week",
		weekStartsOn: "Sunday",
		children: children
	},
	render: render
};

export const weekStarts6DaysAgo = {
	args: {
		variant: "default",
		intervalType: "Week",
		weekStartsOn: "6DaysAgo",
		children: children
	},
	render: render
};