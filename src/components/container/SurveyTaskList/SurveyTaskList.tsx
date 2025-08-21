import React, { useState, useContext } from 'react'
import "./SurveyTaskList.css"
import MyDataHelps, { Guid, SortOrder, SurveyTask, SurveyTaskQueryParameters, SurveyTaskStatus } from "@careevolution/mydatahelps-js"
import { Card, CardTitle, LayoutContext, LoadingIndicator, SingleSurveyTask } from '../../presentational'
import { parseISO } from 'date-fns'
import { previewCompleteTasks, previewIncompleteTasks } from './SurveyTaskList.previewdata'
import language from '../../../helpers/language'
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { ButtonVariant } from '../../presentational/Button/Button'
import { useInitializeView } from '../../../helpers/Initialization';

export type SurveyTaskListSortBehaviorType = 'alphabetical' | 'dueDate' | 'insertedDate' | 'userDefined' | 'shuffle';

export interface SurveyTaskListSortBehavior {
	type: SurveyTaskListSortBehaviorType;
	direction?: SortOrder;
	userDefinedOrder?: string[];
}

export interface SurveyTaskListProps {
	status: SurveyTaskStatus;
	limit?: number;
	sequential?: boolean;
	title?: string;
	surveys?: string[];
	category?: string;
	sortBehavior?: SurveyTaskListSortBehavior;
	onDetailLinkClick?: Function;
	previewState?: SurveyTaskListListPreviewState;
	variant?: "noCard" | "singleCard" | "multiCard";
	innerRef?: React.Ref<HTMLDivElement>;
	titleColor?: ColorDefinition;
	cardBackgroundColor?: ColorDefinition;
	cardStyle?: React.CSSProperties;
	buttonVariant?: ButtonVariant;
	buttonColor?: ColorDefinition;
	hideIfEmpty?: boolean;
	emptyText?: string;
}

export type SurveyTaskListListPreviewState = "IncompleteTasks" | "CompleteTasks" | "Empty";

export default function (props: SurveyTaskListProps) {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasksInner] = useState<SurveyTask[] | null>(null);
	const [activeSurveys, setActiveSurveys] = useState<string[]>([]);
	const context = useContext(LayoutContext);

	const setTasks = (tasks: SurveyTask[]): void => {
		setTasksInner(tasks);
		setActiveSurveys([]);
	};

	useInitializeView(initialize, [], [props.previewState]);

	const isSurveyActive = (task: SurveyTask): boolean => {
		return activeSurveys.includes(task.surveyName);
	};

	const onTaskClicked = (task: SurveyTask) => {
		if (!props.previewState && !isSurveyActive(task)) {
			setActiveSurveys([...activeSurveys, task.surveyName]);
			MyDataHelps.startSurvey(task.surveyName);
		}
	};

	const isSurveyBlocked = (task: SurveyTask): boolean => {
		return props.sequential! && (tasks![0].id !== task.id);
	}

	function getSurveyTaskElement(task: SurveyTask) {
		return <SingleSurveyTask buttonColor={props.buttonColor}
			buttonVariant={props.buttonVariant}
			key={task.id.toString()}
			task={task}
			onClick={() => onTaskClicked(task)}
			surveyActive={isSurveyActive(task)}
			surveyBlocked={isSurveyBlocked(task)} />
	}

	function initialize() {

		const sortIncomplete = function (a: SurveyTask, b: SurveyTask): number {
			const { sortBehavior } = props;

			const type = sortBehavior?.type ?? 'dueDate';
			const direction = sortBehavior?.direction ?? 'ascending';
			const sortMultiplier = direction === 'descending' ? -1 : 1;

			switch (type) {
				case 'alphabetical':
					return a.surveyName.localeCompare(b.surveyName) * sortMultiplier;

				case 'insertedDate':
					if (a.insertedDate === b.insertedDate) return 0;
					if (!a.insertedDate) return 1;
					if (!b.insertedDate) return -1;

					const dateA = parseISO(a.insertedDate);
					const dateB = parseISO(b.insertedDate);
					if (dateA > dateB) return 1 * sortMultiplier;
					if (dateA < dateB) return -1 * sortMultiplier;

					return 0;

				case 'userDefined':
					const userDefinedOrder = sortBehavior?.userDefinedOrder ?? [];
					const indexA = userDefinedOrder.indexOf(a.surveyName);
					const indexB = userDefinedOrder.indexOf(b.surveyName);

					// If a survey is not in the list, it's pushed to the end.
					if (indexA === -1 && indexB === -1) return 0;
					if (indexA === -1) return 1;
					if (indexB === -1) return -1;

					// The direction prop doesn't apply here as the array defines the explicit order.
					return indexA - indexB;

				case 'shuffle':
					return Math.random() - 0.5;

				case 'dueDate':
				default:
					if (a.dueDate === b.dueDate) return 0;
					if (!a.dueDate) { return 1; }
					if (!b.dueDate) { return -1; }

					const dueDateA = parseISO(a.dueDate);
					const dueDateB = parseISO(b.dueDate);
					if (dueDateA > dueDateB) { return 1 * sortMultiplier; }
					if (dueDateA < dueDateB) { return -1 * sortMultiplier; }

					return 0;
			}
		};

		if (props.previewState == "IncompleteTasks") {
			previewIncompleteTasks.sort(sortIncomplete);
			setTasks(previewIncompleteTasks);
			return;
		}

		if (props.previewState == "CompleteTasks") {
			setTasks(previewCompleteTasks);
			return;
		}

		if (props.previewState == "Empty") {
			setTasks([]);
			setLoading(false);
			return;
		}

		var loadData = function () {
			var allTasks: SurveyTask[] = [];
			var makeRequest = function (pageID: Guid | null) {
				var parameters: SurveyTaskQueryParameters = { status: props.status }
				if (props.surveys) {
					parameters.surveyName = props.surveys;
				}
				if (props.category) {
					parameters.surveyCategory = props.category;
				}
				if (pageID) {
					parameters.pageID = pageID;
				}

				return MyDataHelps.querySurveyTasks(parameters).then(function (result: any) {
					allTasks = allTasks.concat((result as any).surveyTasks);
					if (result.nextPageID) {
						makeRequest(result.nextPageID);
					} else {
						// sort by provided sort behavior
						if (props.status == "incomplete") {
							allTasks.sort(sortIncomplete);
						}

						// always sort by completed date
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

	// If 'complete', default to hiding the task list
	const { hideIfEmpty: hide } = props;
	const hideIfEmpty = props.status == "complete" ? (hide ?? true) : hide;

	if (!tasks?.length && hideIfEmpty) {
		return null;
	}

	let variant = props.variant ?? "noCard";
	return (
		<TaskListWrapper cardStyle={props.cardStyle} cardBackgroundColor={props.cardBackgroundColor} innerRef={props.innerRef} card={variant == "singleCard"}>
			<div className="mdhui-survey-task-list">
				{props.title &&
					<CardTitle color={props.titleColor} title={props.title} detailLinkText={props.onDetailLinkClick ? language("view-all") + " (" + (tasks?.length ?? 0) + ")" : undefined} onDetailClick={props.onDetailLinkClick} />
				}
				{loading && !tasks &&
					<LoadingIndicator />
				}
				{!tasks?.length && !loading &&
					<div className="empty-message">
						{props.emptyText?.trim() || language(`empty-tasks-${props.status}`)}
					</div>
				}
				{tasks?.slice(0, props.limit).map((task) =>
					variant == "multiCard" ? <Card style={props.cardStyle} backgroundColor={resolveColor(context.colorScheme, props.cardBackgroundColor)} key={task.id as string}>{getSurveyTaskElement(task)}</Card> : getSurveyTaskElement(task)
				)}
			</div>
		</TaskListWrapper>
	);
}

function TaskListWrapper(props: { children?: React.ReactNode, card: boolean, innerRef?: React.Ref<HTMLDivElement>, cardStyle?: React.CSSProperties, cardBackgroundColor?: ColorDefinition }) {
	const context = useContext(LayoutContext);
	return props.card ? <Card style={props.cardStyle} backgroundColor={resolveColor(context.colorScheme, props.cardBackgroundColor)} innerRef={props.innerRef}>{props.children}</Card> : <div ref={props.innerRef}>{props.children}</div>;
}