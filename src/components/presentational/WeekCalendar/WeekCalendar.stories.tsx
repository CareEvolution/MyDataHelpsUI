import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WeekCalendar, { WeekCalendarProps } from "./WeekCalendar";
import Layout from "../Layout"
import DateRangeNavigator from "../DateRangeNavigator";
import { add } from "date-fns";
import { Section, SparkBarChart } from "..";

export default {
	title: "Presentational/WeekCalendar",
	component: WeekCalendar,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof WeekCalendar>;

export function Empty() {
	var currentDate = new Date();
	currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
	var initialIntervalStart = currentDate;
	while (initialIntervalStart.getDay() != 0) {
		initialIntervalStart = add(initialIntervalStart, { days: -1 });
	}

	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [intervalStartDate, setIntervalStartDate] = useState(initialIntervalStart);

	return <Layout  colorScheme="light">
		<WeekCalendar hideDateLabel={false}
			dayRenderer={() => null}
			loading={false}
			startDate={intervalStartDate}
			selectedDate={selectedDate}
			onDateSelected={(d) => setSelectedDate(d)}
			onStartDateChange={(d) => setIntervalStartDate(d)} />
	</Layout>
}

export function WithNavigator() {
	var currentDate = new Date();
	currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
	var initialIntervalStart = currentDate;
	while (initialIntervalStart.getDay() != 0) {
		initialIntervalStart = add(initialIntervalStart, { days: -1 });
	}

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

	return <Layout  colorScheme="light">
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
	</Layout>
}
