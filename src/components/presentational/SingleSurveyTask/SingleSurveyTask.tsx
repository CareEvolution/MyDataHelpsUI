import React from 'react'
import "./SingleSurveyTask.css"
import MyDataHelps, { SurveyTask } from "@careevolution/mydatahelps-js"
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
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
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';

export interface SingleSurveyTaskProps {
	task: SurveyTask,
	descriptionIcon?: IconDefinition,
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
						<FontAwesomeSvgIcon icon={faCircleHalfStroke} />
					}
					{!props.task.hasSavedProgress &&
						<FontAwesomeSvgIcon icon={faCircle} />
					}
				</div>
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				<div className="survey-description">{props.descriptionIcon} {props.task.surveyDescription}</div>
				{!props.hideDueDate &&
					<div className={"due-date " + dueDateIntent}>{dueDateString}</div>
				}
				<div className="indicator">
					<FontAwesomeSvgIcon icon={faChevronRight} />
				</div>
			</div>
		);
	}

	if (props.task.status == 'complete' && props.task.endDate) {
		return (
			<div className="mdhui-single-survey-task complete">
				<div className="status-icon">
					<FontAwesomeSvgIcon icon={faCircleCheck} />
				</div>
				<div className="survey-name">{props.task.surveyDisplayName}</div>
				<div className="completed-date">{language["completed"]} {formatRelative(parseISO(props.task.endDate), new Date(), { locale: locale })}</div>
			</div>
		)
	}
	return null;
}