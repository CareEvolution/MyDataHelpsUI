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

const baseIncompleteArgs = {
	limit: 3,
	status: 'incomplete',
	title: 'Incomplete Tasks',
	previewState: "IncompleteTasks",
	sequential: false
};

export const Incomplete = {
	args: {
		...baseIncompleteArgs,
		variant: "singleCard",
	},
	render: render
}

export const Sequential = {
	args: {
		...baseIncompleteArgs,
		variant: "singleCard",
		sequential: true
	},
	render: render
}

export const Multicard = {
	args: {
		...baseIncompleteArgs,
		variant: "multiCard"
	},
	render: render
}

export const CustomStyle = {
	args: {
		...baseIncompleteArgs,
		variant: "multiCard",
		titleColor: "red",
		cardBackgroundColor: "#eee",
		cardStyle: {
			boxShadow:"none"
		},
		buttonVariant: "default",
		buttonColor: "blue",
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
		title: 'Completed Tasks',
		previewState: "Empty",
		variant: 'singleCard',
		emptyText: '',
		hideIfEmpty: true,
	},
	render: render
}
