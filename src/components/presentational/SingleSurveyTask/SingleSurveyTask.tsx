import React from 'react'
import "./SingleSurveyTask.css"
import MyDataHelps, { SurveyTask } from "@careevolution/mydatahelps-js"
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import formatRelative from 'date-fns/formatRelative'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import add from 'date-fns/add'
import { isAfter } from 'date-fns'
import language from '../../../helpers/language'
import { enUS, es } from 'date-fns/locale'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Button from '../Button';

export interface SingleSurveyTaskProps {
	task: SurveyTask,
	descriptionIcon?: IconDefinition,
	disableClick?: boolean
}

export default function (props: SingleSurveyTaskProps) {
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
			dueDateString = language["due-tomorrow"];
			dueDateIntent = "warning";
		} else if (datesAreOnSameDay(dueDate, today)) {
			dueDateString = language["due-today"];
			dueDateIntent = "warning";
		} else if (isAfter(today, dueDate)) {
			dueDateString = language["overdue"];
			dueDateIntent = "danger";
		} else {
			let timeDifference;
			let dueDateFormatted = new Date(props.task.dueDate);
			timeDifference = formatDistanceToNow(dueDateFormatted, { locale: locale });
			dueDateString = language["due-in"] + " " + timeDifference;
		}
	}

	if (props.task.status == 'incomplete') {
		return (
			<div className="mdhui-single-survey-task incomplete" onClick={() => startSurvey(props.task.surveyName!)}>
				<div>
					<div className="survey-name">{props.task.surveyDisplayName}</div>
					<div className="survey-description"><>{props.descriptionIcon} {props.task.surveyDescription}</></div>
					{dueDateString &&
						<div className={"due-date " + dueDateIntent}>{dueDateString}</div>
					}
				</div>
				<div>
					<Button variant="light" onClick={() => { }}>
						{!props.task.hasSavedProgress ? language["start"] : language["resume"]}
					</Button>
				</div>
			</div>
		);
	}

	if (props.task.status == 'complete' && props.task.endDate) {
		return (
			<div className="mdhui-single-survey-task complete">
				<div>
					<div className="survey-name">{props.task.surveyDisplayName}</div>
					<div className="completed-date">{language["completed"]} {formatRelative(parseISO(props.task.endDate), new Date(), { locale: locale })}</div>
				</div>
				<div className="status-icon">
					<FontAwesomeSvgIcon icon={faCircleCheck} />
				</div>
			</div>
		)
	}
	return null;
}