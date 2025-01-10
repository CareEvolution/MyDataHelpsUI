import React, { useState } from "react";
import WeekCalendar, { WeekCalendarProps } from "./WeekCalendar";
import Layout from "../Layout"
import DateRangeNavigator from "../DateRangeNavigator";
import { add } from "date-fns";
import { Section, SparkBarChart } from "..";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof WeekCalendar> = {
	title: "Presentational/WeekCalendar",
	component: WeekCalendar,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof WeekCalendar>;

let currentDate = new Date();
currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
var initialIntervalStart = currentDate;
while (initialIntervalStart.getDay() != 0) {
	initialIntervalStart = add(initialIntervalStart, { days: -1 });
}

const renderEmpty = (args: WeekCalendarProps) => {
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [intervalStartDate, setIntervalStartDate] = useState(initialIntervalStart);

	return (<Layout colorScheme="auto">
		<WeekCalendar hideDateLabel={false}
			dayRenderer={() => null}
			loading={false}
			startDate={intervalStartDate}
			selectedDate={selectedDate}
			onDateSelected={(d) => setSelectedDate(d)}
			onStartDateChange={(d) => setIntervalStartDate(d)} />
	</Layout>);
};

export const Empty: Story = {
	render: renderEmpty
}

const renderWithNavigator = (args: WeekCalendarProps) => {
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [intervalStartDate, setIntervalStartDate] = useState(initialIntervalStart);

	function getDaySparkChart() {
		var bars = [
			{
				barFillPercent: .5,
				color: "#f5b722"
			},
			{
				barFillPercent: .1,
				color: "#f5b722"
			},
			{
				barFillPercent: .2,
				color: "#7b88c6"
			},
			{
				barFillPercent: .7,
				color: "#7b88c6"
			},
			{
				barFillPercent: .6,
				color: "#7b88c6"
			},
			{
				barFillPercent: .8,
				color: "#e35c33"
			},
			{
				barFillPercent: 1,
				color: "#e35c33"
			}];

		return <div style={{ paddingTop: "8px" }}><SparkBarChart averageFillPercent={0.3} bars={bars} /></div>;
	}

	return (<Layout colorScheme="auto">
		<DateRangeNavigator intervalStart={intervalStartDate}
			intervalType="Week"
			onIntervalChange={(n, _) => setIntervalStartDate(n)} />
		<Section>
			<WeekCalendar hideDateLabel={false}
				dayRenderer={(y, m, d, s) => getDaySparkChart()}
				loading={false}
				startDate={intervalStartDate}
				selectedDate={selectedDate}
				onDateSelected={(d) => setSelectedDate(d)}
				onStartDateChange={(d) => setIntervalStartDate(d)} />
		</Section>
	</Layout>);
};

export const WithNavigator: Story = {
	render: renderWithNavigator
}
