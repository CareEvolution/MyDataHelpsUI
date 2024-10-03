import React from "react"
import SurveyTaskList, { SurveyTaskListProps } from "./SurveyTaskList"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/SurveyTaskList",
	component: SurveyTaskList,
	parameters: {
		layout: 'fullscreen',
	}
};

const render = (args: SurveyTaskListProps) => {
    return <Layout colorScheme="auto">
        <SurveyTaskList {...args} />
    </Layout>;
};

export const Incomplete = {
	args: {
		limit: 3,
		status: 'incomplete',
		title: 'Incomplete Tasks',
		previewState: "IncompleteTasks",
		variant: "singleCard",
		sequential: false
	},
	render: render
}

export const Sequential = {
	args: {
		...Incomplete.args,
		sequential: true
	},
	render: render
}

export const Multicard = {
	args: {
		...Incomplete.args,
		variant: "multiCard"
	},
	render: render
}

export const CustomStyle = {
	args: {
		limit: 3,
		status: 'incomplete',
		title: 'Incomplete Tasks',
		previewState: "IncompleteTasks",
		variant: "multiCard",
		titleColor: "red",
		cardBackgroundColor: "#eee",
		cardStyle: {
			boxShadow:"none"
		},
		buttonVariant: "default",
		buttonColor: "blue",
		sequential: false
	},
	render: render
}

export const Complete = {
	args: {
		limit: 3,
		status: 'complete',
		title: 'Completed Tasks',
		previewState: "CompleteTasks",
		variant: "singleCard"
	},
	render: render
}

export const EmptyIncomplete = {
	args: {
		status: 'incomplete',
		title: 'Incomplete Tasks',
		previewState: "Empty",
		variant: 'singleCard',
		hideIfEmpty: false,
		emptyText: ''
	},
	render: render
}

export const EmptyComplete = {
	args: {
		status: 'complete',
		previewState: "Empty"
	},
	render: render
}
