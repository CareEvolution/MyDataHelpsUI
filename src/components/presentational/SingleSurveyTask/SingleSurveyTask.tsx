import React, { useContext } from 'react'
import "./SingleSurveyTask.css"
import MyDataHelps, { SurveyTask } from "@careevolution/mydatahelps-js"
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import formatRelative from 'date-fns/formatRelative'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import add from 'date-fns/add'
import { isAfter } from 'date-fns'
import language from '../../../helpers/language'
import { enUS, es } from 'date-fns/locale'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Button from '../Button';
import { LayoutContext } from '../Layout';
import { ColorDefinition } from '../../../helpers/colors';
import { ButtonVariant } from '../Button/Button';
import checkMark from '../../../assets/greenCheck.svg';
import Action from '../Action';

export interface SingleSurveyTaskProps {
	task: SurveyTask,
	descriptionIcon?: IconDefinition,
	disableClick?: boolean
	innerRef?: React.Ref<HTMLDivElement>;
	buttonColor?: ColorDefinition;
	buttonVariant?: ButtonVariant;
}

export default function (props: SingleSurveyTaskProps) {
	const context = useContext(LayoutContext);

	function startSurvey(survey: string) {
		if (!props.disableClick) {
			MyDataHelps.startSurvey(survey);
		}
	}

	const datesAreOnSameDay = (first: Date, second: Date) =>
		first.getFullYear() === second.getFullYear() &&
		first.getMonth() === second.getMonth() &&
		first.getDate() === second.getDate();

	let today = new Date();
	let tomorrow = add(new Date(), { days: 1 });
	let dueDateString = "";
	let dueDateIntent = "";
	let locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	if (props.task.dueDate) {
		let dueDate = parseISO(props.task.dueDate);
		if (datesAreOnSameDay(dueDate, tomorrow)) {
			dueDateString = language("due-tomorrow");
			dueDateIntent = "warning";
		} else if (datesAreOnSameDay(dueDate, today)) {
			dueDateString = language("due-today");
			dueDateIntent = "warning";
		} else if (isAfter(today, dueDate)) {
			dueDateString = language("overdue");
			dueDateIntent = "danger";
		} else {
			let timeDifference;
			let dueDateFormatted = new Date(props.task.dueDate);
			timeDifference = formatDistanceToNow(dueDateFormatted, { locale: locale });
			dueDateString = language("due-in") + " " + timeDifference;
		}
	}


	if (props.task.status == 'incomplete') {
		return (
			<Action innerRef={props.innerRef}
				className="mdhui-single-survey-task incomplete"
				indicator={<Button color={props.buttonColor} variant={props.buttonVariant || "light"} onClick={() => startSurvey(props.task.surveyName!)}>
					{!props.task.hasSavedProgress ? language("start") : language("resume")}
				</Button>}>
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				<div className="survey-description"><>{props.descriptionIcon} {props.task.surveyDescription}</></div>
				{dueDateString &&
					<div className={"due-date " + dueDateIntent}>{dueDateString}</div>
				}
			</Action>
		);
	}

	if (props.task.status == 'complete' && props.task.endDate) {
		return (
			<Action indicator={<img src={checkMark}></img>} innerRef={props.innerRef} className="mdhui-single-survey-task complete">
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				<div className="completed-date">{language("completed")} {formatRelative(parseISO(props.task.endDate), new Date(), { locale: locale })}</div>
			</Action>
		)
	}
	return null;
}