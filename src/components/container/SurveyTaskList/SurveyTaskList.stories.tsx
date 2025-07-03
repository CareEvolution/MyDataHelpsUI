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

// Ease up typing for the 'flattened' sortBehavior props
const render = (args: any) => {
	const { 'sortBehavior.type': type, 'sortBehavior.direction': direction, 'sortBehavior.userDefinedOrder': userDefinedOrder, ...rest } = args;
	const completeArgs: SurveyTaskListProps = {
		...rest,
		sortBehavior: {
			type: type,
			direction: direction,
			userDefinedOrder: userDefinedOrder
		}
	};

	return (
		<Layout colorScheme="auto">
			<SurveyTaskList {...completeArgs} />
		</Layout>
	);
};

export const Incomplete = {
	args: {
		limit: 3,
		status: 'incomplete',
		title: 'Incomplete Tasks',
		previewState: 'IncompleteTasks',
		variant: 'singleCard',
		sequential: false,
		'sortBehavior.type': 'dueDate',
		'sortBehavior.direction': 'ascending'
	},
	argTypes: {
		sortBehavior: {
			table: {
				disable: true
			}
		},
		'sortBehavior.type': {
			name: 'Sort Type',
			description: 'The property to sort the incomplete tasks by.',
			control: {
				type: 'select'
			},
			options: ['alphabetical', 'dueDate', 'insertedDate', 'userDefined', 'shuffle'],
			table: {
				category: 'Sort Behavior',
			}
		},
		'sortBehavior.direction': {
			name: 'Sort Direction',
			description: 'The direction of the sort.',
			control: {
				type: 'radio'
			},
			options: ['ascending', 'descending'],
			if: {
				arg: 'sortBehavior.type',
				in: ['alphabetical', 'dueDate', 'insertedDate']
			},
			table: {
				category: 'Sort Behavior',
			}
		},
		'sortBehavior.userDefinedOrder': {
			name: 'User Defined Order',
			description: 'An array of survey names in the desired order. Only applies when Sort Type is "userDefined".',
			control: {
				type: 'object'
			},
			if: {
				arg: 'sortBehavior.type',
				eq: 'userDefined'
			},
			table: {
				category: 'Sort Behavior',
			}
		}
	},
	render: render
}

export const Sequential = {
	args: {
		...Incomplete.args,
		sequential: true
	},
	argTypes: { ...Incomplete.argTypes },
	render: render
}

export const UserDefinedSort = {
	name: "User-defined Sort",
	args: {
		...Incomplete.args,
		'sortBehavior.type': 'userDefined',
		'sortBehavior.userDefinedOrder': ["Rating: CheckIn", "Rating2: CheckIn"],
		'sortBehavior.direction': undefined,
	},
	argTypes: { ...Incomplete.argTypes },
	render: render,
}


export const Multicard = {
	args: {
		...Incomplete.args,
		variant: "multiCard"
	},
	argTypes: { ...Incomplete.argTypes },
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
			boxShadow: "none"
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
		title: 'Completed Tasks',
		previewState: "Empty",
		variant: 'singleCard',
		emptyText: '',
		hideIfEmpty: true,
	},
	render: render
}
