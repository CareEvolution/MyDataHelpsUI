import React from "react";
import { DailyDataQueryResult } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import DateRangeCoordinator, { DateRangeCoordinatorProps } from "./DateRangeCoordinator";
import DailyDataChart from "../../container/DailyDataChart/DailyDataChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";
import { DailyDataType } from "../../../helpers";

export default { title: "Presentational/DateRangeCoordinator", component: DateRangeCoordinator, parameters: { layout: 'fullscreen' } };
let render = (args: DateRangeCoordinatorProps) => <Layout><DateRangeCoordinator {...args} /></Layout>

let children = <Card>
	<DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default" />
	<DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default" />
	<DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default"
	/><DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default" />
</Card>;

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