import React from 'react'
import SingleSurveyTask, { SingleSurveyTaskVariant } from './SingleSurveyTask'
import Layout from '../Layout'
import Card from '../Card';
import { SurveyTask, SurveyTaskStatus } from "@careevolution/mydatahelps-js";
import { noop } from '../../../helpers/functions';

export default {
	title: 'Presentational/SingleSurveyTask',
	component: SingleSurveyTask,
	parameters: {layout: 'fullscreen'}
};

interface SingleSurveyTaskStoryArgs {
	name: string;
	status: SurveyTaskStatus;
	description?: string;
	dueDate?: number;
	hasSavedProgress?: boolean;
	variant?: SingleSurveyTaskVariant;
	endDate?: number;
	surveyActive?: boolean;
	surveyBlocked?: boolean;
}

const render = (args: SingleSurveyTaskStoryArgs) => {
	const task = {
		surveyDisplayName: args.name,
		surveyDescription: args.description,
		status: args.status,
		dueDate: args.dueDate ? new Date(args.dueDate).toISOString() : undefined,
		endDate: args.endDate ? new Date(args.endDate).toISOString() : undefined,
		hasSavedProgress: args.hasSavedProgress
	} as SurveyTask;

	return <Layout colorScheme="auto">
		<Card>
			<SingleSurveyTask task={task} variant={args.variant} surveyActive={args.surveyActive} onClick={noop} surveyBlocked={args.surveyBlocked}/>
		</Card>
	</Layout>;
};

export const Default = {
	args: {
		variant: 'default',
		name: 'Survey Name',
		description: 'This is the survey description.',
		status: 'incomplete',
		dueDate: undefined,
		hasSavedProgress: false,
		endDate: undefined,
		surveyActive: false,
		surveyBlocked: false
	},
	argTypes: {
		variant: {
			control: 'radio',
			options: ['default', 'expanded'],
		},
		status: {
			control: 'radio',
			options: ['incomplete', 'complete', 'closed']
		},
		dueDate: {
			name: 'due date',
			control: 'date',
			if: {arg: 'status', eq: 'incomplete'}
		},
		hasSavedProgress: {
			name: 'in progress',
			control: 'boolean',
			if: {arg: 'status', eq: 'incomplete'}
		},
		surveyActive: {
			name: 'survey active',
			control: 'boolean',
			if: {arg: 'status', eq: 'incomplete'}
		},
		surveyBlocked: {
			name: 'survey blocked',
			control: 'boolean',
			if: {arg: 'status', eq: 'incomplete'}
		},
		endDate: {
			name: 'end date',
			control: 'date',
			if: {arg: 'status', eq: 'complete'}
		}
	},
	render: render
};

const dueLaterToday = () => {
	const dueDate = new Date();
	dueDate.setHours(23, 0, 0, 0);
	return dueDate.getTime();
};

const dueEarlyTomorrow = () => {
	const dueDate = new Date();
	dueDate.setDate(dueDate.getDate() + 1);
	dueDate.setHours(1, 0, 0, 0);
	return dueDate.getTime();
};

export const DueTodayWithTime = {
	args: {
		...Default.args,
		name: 'Survey Name',
		description: 'This is the survey description.',
		status: 'incomplete',
		dueDate: dueLaterToday()
	},
	argTypes: Default.argTypes,
	render: render
};

export const DueTomorrowWithTime = {
	args: {
		...Default.args,
		name: 'Survey Name',
		description: 'This is the survey description.',
		status: 'incomplete',
		dueDate: dueEarlyTomorrow()
	},
	argTypes: Default.argTypes,
	render: render
};

// Snapped to end-of-local-day (23:59), already past - the day-granular overdue case.
const dueYesterdayEndOfDay = () => {
	const dueDate = new Date();
	dueDate.setDate(dueDate.getDate() - 1);
	dueDate.setHours(23, 59, 0, 0);
	return dueDate.getTime();
};

export const OverdueDayGranular = {
	args: {
		...Default.args,
		name: 'Survey Name',
		description: 'This is the survey description.',
		status: 'incomplete',
		dueDate: dueYesterdayEndOfDay()
	},
	argTypes: Default.argTypes,
	render: render
};

// Non-midnight time, earlier today - the effectively-precise overdue case.
const dueEarlierToday = () => {
	const dueDate = new Date();
	dueDate.setHours(dueDate.getHours() - 3);
	return dueDate.getTime();
};

export const OverdueEarlierToday = {
	args: {
		...Default.args,
		name: 'Survey Name',
		description: 'This is the survey description.',
		status: 'incomplete',
		dueDate: dueEarlierToday()
	},
	argTypes: Default.argTypes,
	render: render
};

// Several days out, non-midnight time - the effectively-precise "due in N" case.
const dueInSeveralDays = () => {
	const dueDate = new Date();
	dueDate.setDate(dueDate.getDate() + 3);
	dueDate.setHours(14, 0, 0, 0);
	return dueDate.getTime();
};

export const DueInDays = {
	args: {
		...Default.args,
		name: 'Survey Name',
		description: 'This is the survey description.',
		status: 'incomplete',
		dueDate: dueInSeveralDays()
	},
	argTypes: Default.argTypes,
	render: render
};