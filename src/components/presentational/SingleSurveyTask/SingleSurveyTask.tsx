import React from 'react'
import "./SingleSurveyTask.css"
import MyDataHelps, { SurveyTask } from "@careevolution/mydatahelps-js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons/faCircleHalfStroke'
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle'
import formatRelative from 'date-fns/formatRelative'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import add from 'date-fns/add'
import { isAfter } from 'date-fns'
import language from '../../../helpers/language'
import { enUS, es } from 'date-fns/locale'

export interface SingleSurveyTaskProps {
	task: SurveyTask,
	descriptionIcon?: React.ReactNode;
	hideDueDate?: boolean,
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

	var dueDate = parseISO(props.task.dueDate);
	var today = new Date();
	var tomorrow = add(new Date(), { days: 1 });
	var dueDateString = "";
	var dueDateIntent = "";
	var locale = MyDataHelps.getCurrentLanguage() == "es" ? es : enUS;
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
		var timeDifference;
		var dueDateFormatted = new Date(props.task.dueDate);
		timeDifference = formatDistanceToNow(dueDateFormatted, { locale: locale });
		dueDateString = language["due-in"] + " " + timeDifference;
	}

	if (props.task.status == 'incomplete') {
		return (
			<div className="mdhui-single-survey-task incomplete" onClick={() => startSurvey(props.task.surveyName!)}>
				<div className="status-icon">
					{props.task.hasSavedProgress &&
						<FontAwesomeIcon icon={faCircleHalfStroke} />
					}
					{!props.task.hasSavedProgress &&
						<FontAwesomeIcon icon={faCircle} />
					}
				</div>
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				<div className="survey-description">{props.descriptionIcon} {props.task.surveyDescription}</div>
				{!props.hideDueDate &&
					<div className={"due-date " + dueDateIntent}>{dueDateString}</div>
				}
				<div className="indicator">
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
			</div>
		);
	}

	if (props.task.status == 'complete' && props.task.endDate) {
		return (
			<div className="mdhui-single-survey-task complete">
				<div className="status-icon">
					<FontAwesomeIcon icon={faCircleCheck} />
				</div>
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				<div className="completed-date">{language["completed"]} {formatRelative(parseISO(props.task.endDate), new Date(), { locale: locale })}</div>
			</div>
		)
	}
	return null;
}