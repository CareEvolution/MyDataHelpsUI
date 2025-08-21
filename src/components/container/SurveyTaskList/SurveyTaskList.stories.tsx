import React from "react"
import SurveyTaskList, { SurveyTaskListProps, SurveyTaskListSortBehaviorType } from "./SurveyTaskList"
import { SortOrder } from "@careevolution/mydatahelps-js";
import Layout from "../../presentational/Layout"
import { previewIncompleteTasks } from "./SurveyTaskList.previewdata";
import { argTypesToHide } from "../../../../.storybook/helpers";

export default {
	title: "Container/SurveyTaskList",
	component: SurveyTaskList,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
        sortBehaviorType: {
            control: { type: 'select' },
            options: ['alphabetical', 'dueDate', 'insertedDate', 'userDefined', 'shuffle'],
        },
        sortBehaviorDirection: {
            control: { type: 'radio' },
            options: ['ascending', 'descending'],
        }
    }
};

type SurveyTaskListStoryArgs = React.ComponentProps<typeof SurveyTaskList> & {
    sortBehaviorType: SurveyTaskListSortBehaviorType;
	sortBehaviorDirection: SortOrder;
	sortBehaviorUserDefinedOrder: string[];
};

const render = (args: SurveyTaskListStoryArgs) => {
    const { sortBehaviorType, sortBehaviorDirection, sortBehaviorUserDefinedOrder, ...rest } = args;

    const sortBehavior = {
        type: sortBehaviorType,
        direction: sortBehaviorDirection,
        userDefinedOrder: sortBehaviorUserDefinedOrder
    };

    return <Layout colorScheme="auto">
        <SurveyTaskList {...rest} sortBehavior={sortBehavior} />
    </Layout>;
};

const baseIncompleteArgs = {
	limit: 3,
	status: 'incomplete',
	title: 'Incomplete Tasks',
	previewState: "IncompleteTasks",
	sequential: false,
	sortBehaviorType: 'dueDate',
    sortBehaviorDirection: 'ascending'
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

export const UserDefinedOrder = {
    args: {
        ...baseIncompleteArgs,
        variant: "singleCard",
        title: "Sorted by User-Defined Order",
        sortBehaviorType: 'userDefined',
        sortBehaviorUserDefinedOrder: [
            previewIncompleteTasks[1].surveyName,
            previewIncompleteTasks[2].surveyName,
            previewIncompleteTasks[0].surveyName
        ]
    },
	argTypes: {
		...argTypesToHide(['sortBehaviorDirection'])
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
