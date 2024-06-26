import React, { useContext } from 'react'
import './SingleSurveyTask.css'
import { SurveyTask } from '@careevolution/mydatahelps-js'
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import formatRelative from 'date-fns/formatRelative'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import add from 'date-fns/add'
import { isAfter, isSameDay, startOfToday } from 'date-fns'
import language from '../../../helpers/language'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Button from '../Button';
import { LayoutContext } from '../Layout';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { ButtonVariant } from '../Button/Button';
import checkMark from '../../../assets/greenCheck.svg';
import Action from '../Action';
import LoadingIndicator from '../LoadingIndicator';
import MyDataHelps from "@careevolution/mydatahelps-js";
import { getLocaleFromIso } from '../../../helpers/locale';
import { noop } from '../../../helpers/functions';
import UnstyledButton from '../UnstyledButton';

export type SingleSurveyTaskVariant = 'default' | 'expanded';

export interface SingleSurveyTaskProps {
	task: SurveyTask;
	onClick: () => void;
	variant?: SingleSurveyTaskVariant;
	descriptionIcon?: IconDefinition;
	surveyActive?: boolean;
	buttonColor?: ColorDefinition;
	buttonVariant?: ButtonVariant;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleSurveyTaskProps) {
	const layoutContext = useContext(LayoutContext);

	const getDueDate = () => {
		let today = startOfToday();
		let tomorrow = add(new Date(today), {days: 1});
		let dueDate = parseISO(props.task.dueDate);

		let dueDateClasses: string[] = ['due-date'];
		let dueDateString: string;

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
			dueDateString = language('due-in') + ' ' + formatDistanceToNow(dueDate, {locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage())});
		}

		return <div className={dueDateClasses.join(' ')}>{dueDateString}</div>;
	};

	const getExpandedIncompleteTask = () => {
		return <UnstyledButton className="mdhui-single-survey-task incomplete-expanded" onClick={() => props.onClick()}>
			<div className="header">
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				{props.task.dueDate && getDueDate()}
			</div>
			<div className="survey-description">
				<>{props.descriptionIcon} {props.task.surveyDescription}</>
			</div>
			{props.surveyActive && <LoadingIndicator/>}
			{!props.surveyActive &&
				<Button color={resolveColor(layoutContext.colorScheme, props.buttonColor)} variant={props.buttonVariant} onClick={noop}>
					{!props.task.hasSavedProgress ? language('start-survey') : language('resume-survey')}
				</Button>
			}
		</UnstyledButton>;
	};

	const getIncompleteTask = () => {
		const indicator = props.surveyActive ? <LoadingIndicator/> : <Button color={resolveColor(layoutContext.colorScheme, props.buttonColor)} variant={props.buttonVariant ?? 'light'} onClick={noop}>
			{!props.task.hasSavedProgress ? language('start') : language('resume')}
		</Button>;
		return <Action renderAs='div' innerRef={props.innerRef} onClick={() => props.onClick()} className="mdhui-single-survey-task incomplete" indicator={indicator}>
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
				<div className="completed-date">{language('completed')} {formatRelative(parseISO(props.task.endDate), new Date(), {locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage())})}</div>
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