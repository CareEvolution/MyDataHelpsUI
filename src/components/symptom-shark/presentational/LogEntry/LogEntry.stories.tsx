import React from "react";
import { default as SymptomSharkLogEntry, SymptomSharkLogEntryProps } from "./LogEntry";
import { add } from "date-fns";
import { SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";
import { Layout } from "../../../presentational";

export default { title: "SymptomShark/Presentational/LogEntry", component: SymptomSharkLogEntry, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogEntryProps) => <Layout colorScheme="auto"><SymptomSharkLogEntry {...args} /></Layout>

let configuration: SymptomSharkConfiguration = {
	participantID: "123",
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

export const WithLogEntry = {
	args: {
		date: new Date(),
		configuration: configuration,
		noDataMessage: "Tap to log your symptoms and treatments",
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

export const NoLogEntryToday = {
	args: {
		date: new Date(),
		configuration: configuration,
		noDataMessage: "Tap to log your symptoms and treatments!",
	},
	render: render
};

export const NoLogEntryLastWeek = {
	args: {
		date: add(new Date(), { weeks: -1 }),
		configuration: configuration
	},
	render: render
};


export const NoSymptomsTreatments = {
	args: {
		title: "Today's Log",
		date: new Date(),
		configuration: configuration,
		logEntry: {
			symptoms: [
			],
			treatments: [
			],
			overallFeeling: 5,
			notes: "My notes\nLorem ipsum"
		},
		titleVariant: "today"
	},
	render: render
};

export const CustomTitleWithLogEntry = {
	args: {
		title: "Today's Log",
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
		titleVariant: "today"
	},
	render: render
};

export const CustomTitleNoLogEntry = {
	args: {
		date: new Date(),
		configuration: configuration,
		title: "Log Symptoms"
	},
	render: render
};