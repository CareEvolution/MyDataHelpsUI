import React, { useState, useEffect, useContext } from 'react'
import "./SurveyTaskList.css"
import MyDataHelps, { Guid, SurveyTask, SurveyTaskQueryParameters, SurveyTaskStatus } from "@careevolution/mydatahelps-js"
import { Card, CardTitle, LayoutContext, LoadingIndicator, SingleSurveyTask } from '../../presentational'
import parseISO from 'date-fns/parseISO'
import { previewCompleteTasks, previewIncompleteTasks } from './SurveyTaskList.previewdata'
import language from '../../../helpers/language'
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { ButtonVariant } from '../../presentational/Button/Button'

export interface SurveyTaskListProps {
	status: SurveyTaskStatus,
	limit?: number,
	title?: string,
	surveys?: string[],
	onDetailLinkClick?: Function,
	previewState?: SurveyTaskListListPreviewState
	variant?: "noCard" | "singleCard" | "multiCard"
	innerRef?: React.Ref<HTMLDivElement>
	titleColor?: ColorDefinition
	cardBackgoundColor?: ColorDefinition
	cardStyle?: React.CSSProperties
	buttonVariant?: ButtonVariant
	buttonColor?: ColorDefinition
}

export type SurveyTaskListListPreviewState = "IncompleteTasks" | "CompleteTasks";

export default function (props: SurveyTaskListProps) {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState<SurveyTask[] | null>(null);
	const context = useContext(LayoutContext);

	useEffect(() => {
		initialize()
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
		}
	}, [props.previewState]);

	function getSurveyTaskElement(task: SurveyTask) {
		return <SingleSurveyTask buttonColor={props.buttonColor} buttonVariant={props.buttonVariant} key={task.id.toString()} task={task} disableClick={loading} />
	}

	function initialize() {
		if (props.previewState == "IncompleteTasks") {
			setTasks(previewIncompleteTasks);
			return;
		}
		if (props.previewState == "CompleteTasks") {
			setTasks(previewCompleteTasks);
			return;
		}

		var loadData = function () {
			var allTasks: SurveyTask[] = [];
			var makeRequest = function (pageID: Guid | null) {
				var parameters: SurveyTaskQueryParameters = { status: props.status }
				if (props.surveys) {
					parameters.surveyName = props.surveys;
				}
				if (pageID) {
					parameters.pageID = pageID;
				}

				return MyDataHelps.querySurveyTasks(parameters).then(function (result) {
					allTasks = allTasks.concat((result as any).surveyTasks);
					if (result.nextPageID) {
						makeRequest(result.nextPageID);
					} else {
						//sort by due date for incomplete tasks
						if (props.status == "incomplete") {
							allTasks.sort((a, b) => {
								if (parseISO(a.dueDate) > parseISO(b.dueDate)) { return 1; }
								if (parseISO(a.dueDate) < parseISO(b.dueDate)) { return -1; }
								return 0;
							});
						}

						//sort by completed date for complete tasks
						if (props.status == "complete") {
							allTasks.sort((a, b) => {
								if (!a.endDate || !b.endDate) { return 0; }
								if (parseISO(a.endDate) > parseISO(b.endDate)) { return -1; }
								if (parseISO(a.endDate) < parseISO(b.endDate)) { return 1; }
								return 0;
							});
						}

						setTasks(allTasks);
						setLoading(false);
					}
				});
			}
			makeRequest(null);
		}
		loadData();
	}

	if (props.status == "complete" && !tasks?.length) {
		return null;
	}

	let variant = props.variant ?? "noCard";
	return (
		<TaskListWrapper cardStyle={props.cardStyle} cardBackroundColor={props.cardBackgoundColor} innerRef={props.innerRef} card={variant == "singleCard"}>
			<div className="mdhui-survey-task-list">
				{props.title &&
					<CardTitle color={props.titleColor} title={props.title} detailLinkText={props.onDetailLinkClick ? language("view-all") + " (" + (tasks?.length ?? 0) + ")" : undefined} onDetailClick={props.onDetailLinkClick} />
				}
				{loading && !tasks &&
					<LoadingIndicator />
				}
				{!tasks?.length && !loading &&
					<div className="empty-message">{language("all-tasks-complete")}</div>
				}
				{tasks?.slice(0, props.limit).map((task) =>
					variant == "multiCard" ? <Card style={props.cardStyle} backgroundColor={resolveColor(context.colorScheme, props.cardBackgoundColor)} key={task.id as string}>{getSurveyTaskElement(task)}</Card> : getSurveyTaskElement(task)
				)}
			</div>
		</TaskListWrapper>
	);
}

function TaskListWrapper(props: { children?: React.ReactNode, card: boolean, innerRef?: React.Ref<HTMLDivElement>, cardStyle?: React.CSSProperties, cardBackroundColor?: ColorDefinition }) {
	const context = useContext(LayoutContext);
	return props.card ? <Card style={props.cardStyle} backgroundColor={resolveColor(context.colorScheme, props.cardBackroundColor)} innerRef={props.innerRef}>{props.children}</Card> : <div ref={props.innerRef}>{props.children}</div>;
}