import React from 'react'
import SingleSurveyTask, { SingleSurveyTaskProps } from './SingleSurveyTask'
import Layout from '../Layout'
import { add } from 'date-fns';

export default {
	title: 'Presentational/SingleSurveyTask',
	component: SingleSurveyTask,
	parameters: {layout: 'fullscreen'}
};

const render = (args: SingleSurveyTaskProps) => <Layout colorScheme="auto"><SingleSurveyTask {...args} /></Layout>

const now = new Date();

const commonTask = {
	surveyName: 'PainSurvey',
	surveyDisplayName: 'Pain Survey',
	surveyDescription: '5 minutes',
	dueDate: add(new Date(now), {days: 3}).toISOString(),
}

export const Incomplete = {
	args: {
		task: {
			...commonTask,
			status: 'incomplete'
		}
	},
	render: render
};

export const IncompleteInProgress = {
	args: {
		task: {
			...commonTask,
			status: 'incomplete',
			hasSavedProgress: true
		}
	},
	render: render
};

export const IncompleteAlreadyClicked = {
	args: {
		previewState: 'hasBeenClicked',
		task: {
			...commonTask,
			status: 'incomplete'
		}
	},
	render: render
};

export const IncompleteWithLongDescription = {
	args: {
		task: {
			...commonTask,
			status: 'incomplete',
			surveyDescription: 'Here is a really long description that will likely need to wrap.  It should wrap before overlapping the action indicator.'
		}
	},
	render: render
};

export const Complete = {
	args: {
		task: {
			...commonTask,
			status: 'complete',
			endDate: add(new Date(now), {days: -2}).toISOString(),
		}
	},
	render: render
};