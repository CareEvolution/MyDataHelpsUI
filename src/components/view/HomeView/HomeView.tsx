import React from 'react'
import { Layout, StatusBarBackground, ProjectHeader, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ProjectSupport } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";

export interface HomeViewProps {
	/** 
	 * Notification Type to display for the most recent notification
	 * @default Push
	 * */
	notificationType?: "Sms" | "Push";
	/** Hides the most recent notification after a certain number of hours of it being sent */
	notificationHideAfterHours?: number
	/** Hide the task due date on displayed tasks */
	hideTaskDueDate?: boolean
	/** When present, causes the EHR connect widget to display. */
	ehrConnectApplicationUrl?: ConnectEhrApplicationUrl
	notificationsViewUrl?: string
	tasksViewUrl?: string
	preview?: boolean;
}

export default function (props: HomeViewProps) {
	var notificationType: NotificationType = "Push";
	if (props.notificationType) {
		notificationType = props.notificationType;
	}

	var viewAllNotifications = function () {
		if (props.notificationsViewUrl) {
			MyDataHelps.openApplication(props.notificationsViewUrl);
		}
	}

	var viewAllTasks = function () {
		if (props.tasksViewUrl) {
			MyDataHelps.openApplication(props.tasksViewUrl);
		}
	}

	return (
		<Layout autoDarkMode>
			<StatusBarBackground />
			<ProjectHeader previewState={props.preview ? "Default" : undefined} />
			<Card>
				<MostRecentNotification
					notificationType={notificationType}
					onViewMore={props.notificationsViewUrl ? () => viewAllNotifications() : undefined}
					previewState={props.preview ? "Default" : undefined}
					hideAfterHours={props.notificationHideAfterHours} />
			</Card>
			<Card>
				<SurveyTaskList
					status="incomplete"
					limit={3}
					title={language["tasks"]}
					onDetailLinkClick={props.tasksViewUrl ? () => viewAllTasks() : undefined}
					hideDueDate={props.hideTaskDueDate}
					previewState={props.preview ? "IncompleteTasks" : undefined}
				/>
			</Card>
			<Card>
				<ConnectFitbit title="Fitbit" previewState={props.preview ? "notConnected" : undefined} />
			</Card>
			<Card>
				{props.ehrConnectApplicationUrl &&
					<ConnectEhr previewState={props.preview ? "enabled" : undefined} applicationUrl={props.ehrConnectApplicationUrl} />
				}
			</Card>
			<Card>
				<ProjectSupport previewState={props.preview ? "Default" : undefined} />
			</Card>
		</Layout>
	)
}