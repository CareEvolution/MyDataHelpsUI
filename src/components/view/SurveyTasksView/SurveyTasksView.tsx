import React from 'react'
import { Layout, Card, SurveyTaskList, NavigationBar, StatusBarBackground } from "../../.."
import language from '../../../helpers/language';

export interface SurveyTasksViewProps {
	hideCompleteTasks?: boolean
	hideIncompleteTasks?: boolean
	hideDueDate?: boolean
	presentation?: ViewPresentationType
	preview?: boolean
}

export type ViewPresentationType = "Modal" | "Push";

export default function (props: SurveyTasksViewProps) {
	return (
		<Layout>
			{props.presentation &&
				<NavigationBar title={language["tasks"]}
					showBackButton={props.presentation == "Push"}
					showCloseButton={props.presentation == "Modal"} />
			}
			{!props.presentation &&
				<StatusBarBackground color="var(--main-bg-color)" />
			}
			{!props.hideIncompleteTasks &&
				<Card>
					<SurveyTaskList
						title={language["incomplete-tasks"]}
						status="incomplete"
						hideDueDate={props.hideDueDate}
						previewState={props.preview ? "IncompleteTasks" : undefined} />
				</Card>
			}
			{!props.hideCompleteTasks &&
				<Card>
					<SurveyTaskList
						title={language["completed-tasks"]}
						status="complete"
						hideDueDate={props.hideDueDate}
						previewState={props.preview ? "CompleteTasks" : undefined} />
				</Card>
			}
		</Layout>
	)
}