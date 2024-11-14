import React from 'react'
import { Layout, Card, SurveyTaskList, NavigationBar, StatusBarBackground } from "../../.."
import language from '../../../helpers/language';

export interface SurveyTasksViewProps {
	hideCompleteTasks?: boolean
	hideIncompleteTasks?: boolean
	hideDueDate?: boolean
	presentation?: ViewPresentationType
	preview?: boolean
	colorScheme?: "auto" | "light" | "dark"
}

export type ViewPresentationType = "Modal" | "Push";

/*
** TODO: When I have internet
*/
export default function SurveyTasksView (props: SurveyTasksViewProps) {
	return (
		<Layout colorScheme={props.colorScheme ?? "auto"}>
			{props.presentation &&
				<NavigationBar title={language("tasks")}
					showBackButton={props.presentation == "Push"}
					showCloseButton={props.presentation == "Modal"} />
			}
			{!props.presentation &&
				<StatusBarBackground />
			}
			{!props.hideIncompleteTasks &&
				<SurveyTaskList
					variant='multiCard'
					title={language("incomplete-tasks")}
					status="incomplete"
					previewState={props.preview ? "IncompleteTasks" : undefined} />
			}
			{!props.hideCompleteTasks &&
				<SurveyTaskList
					variant='multiCard'
					title={language("completed-tasks")}
					status="complete"
					previewState={props.preview ? "CompleteTasks" : undefined} />
			}
		</Layout>
	)
}