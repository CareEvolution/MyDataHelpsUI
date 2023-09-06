import React from "react";
import { Layout } from "..";
import SymptomSharkLogEntry, { SymptomSharkLogEntryProps } from "./SymptomSharkLogEntry";
import { add } from "date-fns";
import { SymptomSharkConfiguration } from "../../../helpers/symptom-shark-data";

export default { title: "Presentational/SymptomSharkLogEntry", component: SymptomSharkLogEntry, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogEntryProps) => <Layout><SymptomSharkLogEntry {...args} /></Layout>

let configuration: SymptomSharkConfiguration = {
	symptoms: [
		{
			id: "1",
			color: "red",
			name: "Headache",
			severityTracking: '3PointScale'
		},
		{
			id: "2",
			color: "#2e6e9e",
			name: "Migraine",
			severityTracking: '3PointScale'
		},
		{
			id: "3",
			color: "darkblue",
			name: "Fatigue",
			severityTracking: '10PointScale'
		}
	],
	treatments: [
		{
			id: "A",
			color: "#FF0000",
			name: "Aspirin"
		},
		{
			id: "B",
			color: "blue",
			name: "Tylenol"
		}
	]
};

export const ListVariant = {
	args: {
		date: new Date(),
		configuration: configuration,
		logEntry: {
			symptoms: [
				{
					id: "1",
					severity: 5
				},
				{
					id: "2",
					severity: 8
				},
				{
					id: "3",
					severity: 5
				}
			],
			treatments: [
				{ id: "A" }, { id: "B" }
			],
			overallFeeling: 5,
			notes: "My notes"
		}
	},
	render: render
};

export const ListVariantNoLogEntryToday = {
	args: {
		date: new Date(),
		configuration: configuration,
		variant: "list"
	},
	render: render
};

export const ListVariantNoLogEntryLastWeek = {
	args: {
		date: add(new Date(), { weeks: -1 }),
		configuration: configuration,
		variant: "list"
	},
	render: render
};

export const TodayVariant = {
	args: {
		date: new Date(),
		configuration: configuration,
		logEntry: {
			symptoms: [
				{
					id: "1",
					severity: 5
				},
				{
					id: "2",
					severity: 8
				},
				{
					id: "3",
					severity: 5
				}
			],
			treatments: [
				{ id: "A" }, { id: "B" }
			],
			overallFeeling: 5,
			notes: "My notes"
		},
		variant: "today"
	},
	render: render
};


export const TodayVariantNoLogEntry = {
	args: {
		date: new Date(),
		configuration: configuration,
		variant: "today"
	},
	render: render
};
