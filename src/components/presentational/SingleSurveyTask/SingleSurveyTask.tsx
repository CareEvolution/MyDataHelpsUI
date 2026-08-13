import React, { useContext } from 'react'
import './SingleSurveyTask.css'
import { SurveyTask } from '@careevolution/mydatahelps-js'
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { isAfter, isSameDay, startOfToday, parseISO, add } from 'date-fns'
import language from '../../../helpers/language'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Button from '../Button';
import { LayoutContext } from '../Layout';
import { ColorDefinition, resolveColor } from '../../../helpers';
import { ButtonVariant } from '../Button/Button';
import checkMark from '../../../assets/greenCheck.svg';
import Action from '../Action';
import LoadingIndicator from '../LoadingIndicator';
import { noop } from '../../../helpers/functions';
import { getTimeFromNowString, getStrictTimeFromNowString, getRelativeDateString, getTimeOfDayString, isEndOfLocalDay } from "../../../helpers/date-helpers";

export type SingleSurveyTaskVariant = 'default' | 'expanded';

export interface SingleSurveyTaskProps {
	task: SurveyTask;
	onClick: () => void;
	variant?: SingleSurveyTaskVariant;
	descriptionIcon?: IconDefinition;
	surveyActive?: boolean;
	surveyBlocked?: boolean;
	buttonColor?: ColorDefinition;
	buttonVariant?: ButtonVariant;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleSurveyTaskProps) {
	const layoutContext = useContext(LayoutContext);

	const getDueDate = () => {
		let now = new Date();
		let today = startOfToday();
		let tomorrow = add(new Date(today), { days: 1 });
		let dueDate = parseISO(props.task.dueDate ?? '');

		let dueDateClasses: string[] = ['due-date'];
		let dueDateString: string;

		// No precision flag on the SDK type, so infer day-granular vs. precise from the timestamp itself.
		if (isEndOfLocalDay(dueDate)) {
			// Day-granular: omit the clock time, it's just an artifact of the snap.
			if (isSameDay(dueDate, tomorrow)) {
				dueDateString = language('due-tomorrow');
				dueDateClasses.push('warning');
			} else if (isSameDay(dueDate, today)) {
				dueDateString = language('due-today');
				dueDateClasses.push('warning');
			} else if (isAfter(today, dueDate)) {
				dueDateString = language('overdue');
				dueDateClasses.push('danger');
			} else {
				dueDateString = language('due-in') + ' ' + getTimeFromNowString(dueDate);
			}
		} else {
			// Effectively precise: show the clock time, and compare against now (not startOfToday())
			// so a task due earlier today reads as overdue instead of "Due Today at 9:00 AM".
			if (isAfter(now, dueDate)) {
				dueDateString = language('overdue');
				dueDateClasses.push('danger');
			} else if (isSameDay(dueDate, tomorrow)) {
				dueDateString = language('due-tomorrow-with-time', undefined, { time: getTimeOfDayString(dueDate) });
				dueDateClasses.push('warning');
			} else if (isSameDay(dueDate, today)) {
				dueDateString = language('due-today-with-time', undefined, { time: getTimeOfDayString(dueDate) });
				dueDateClasses.push('warning');
			} else {
				dueDateString = language('due-in') + ' ' + getStrictTimeFromNowString(dueDate);
			}
		}

		return <div className={dueDateClasses.join(' ')}>{dueDateString}</div>;
	};

	const getExpandedIncompleteTask = () => {
		return <div className={`mdhui-single-survey-task incomplete-expanded ${!props.surveyBlocked ? 'active' : ''}`}
			onClick={!props.surveyBlocked ? () => props.onClick() : undefined}>
			<div className="header">
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				{props.task.dueDate && getDueDate()}
			</div>
			<div className="survey-description">
				<>{props.descriptionIcon} {props.task.surveyDescription}</>
			</div>
			{props.surveyActive && <LoadingIndicator />}
			{!props.surveyActive &&
				<Button color={resolveColor(layoutContext.colorScheme, props.buttonColor)} variant={props.buttonVariant} onClick={noop} disabled={props.surveyBlocked}>
					{!props.task.hasSavedProgress ? language('start-survey') : language('resume-survey')}
				</Button>
			}
		</div>;
	};

	const getIncompleteTask = () => {
		let indicator;
		if (props.surveyActive) {
			indicator = <LoadingIndicator />;
		} else {
			indicator = <Button color={resolveColor(layoutContext.colorScheme, props.buttonColor)} variant={props.buttonVariant ?? 'light'} onClick={noop} disabled={props.surveyBlocked}>
				{!props.task.hasSavedProgress ? language('start') : language('resume')}
			</Button>;
		}
		return <Action renderAs='div' innerRef={props.innerRef} onClick={!props.surveyBlocked ? () => props.onClick() : undefined} className="mdhui-single-survey-task incomplete" indicator={indicator}>
			<div className="survey-name">{props.task.surveyDisplayName}</div>
			<div className="survey-description">
				<>{props.descriptionIcon} {props.task.surveyDescription}</>
			</div>
			{props.task.dueDate && getDueDate()}
		</Action>;
	};

	const getCompleteTask = () => {
		return <Action renderAs='div' className="mdhui-single-survey-task complete" indicator={<img src={checkMark} alt="check mark"></img>} innerRef={props.innerRef}>
			<div className="survey-name">{props.task.surveyDisplayName}</div>
			{props.task.endDate &&
				<div className="completed-date">{language('completed')} {getRelativeDateString(props.task.endDate, new Date())}</div>
			}
		</Action>;
	};

	if (props.task.status === 'incomplete' && props.variant === 'expanded') {
		return getExpandedIncompleteTask();
	}
	if (props.task.status === 'incomplete') {
		return getIncompleteTask()
	}
	if (props.task.status === 'complete') {
		return getCompleteTask();
	}
	return null;
}