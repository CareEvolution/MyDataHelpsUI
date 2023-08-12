import React from "react";
import { DailyDataType } from "../../../helpers/query-daily-data";
import { DeviceDataMonthChart } from "../../container";
import { Card, Layout } from "../../presentational";
import DateRangeCoordinator, { DateRangeCoordinatorProps } from "./DateRangeCoordinator";

export default { title: "Presentational/DateRangeCoordinator", component: DateRangeCoordinator, parameters: { layout: 'fullscreen' } };
let render = (args: DateRangeCoordinatorProps) => <Layout><DateRangeCoordinator {...args} /></Layout>
export const steps = {
	args: {
		variant: "rounded",
		intervalType: "Month",
		children:
			<Card>
				<DeviceDataMonthChart title="Steps" lines={[{
					showAverage: true,
					dailyDataType: DailyDataType.FitbitSteps,
					label: "Steps"
				}, {
					showAverage: true,
					dailyDataType: DailyDataType.AppleHealthSteps,
					label: "Steps"
				}]} previewState="WithData" />
			</Card>
	},
	render: render
};