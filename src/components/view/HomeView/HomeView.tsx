import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import AppDownload from "../../container/AppDownload";

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
	ehrConnectApplicationUrl?: string
	notificationsViewUrl?: string
	tasksViewUrl?: string
	preview?: boolean;
	colorScheme?: "auto" | "light" | "dark";
}

/**
 * This view includes all the essential features for MDH engagement:
 * It displays a prompt to download the MyDataHelps app, the latest notification, 
 * a list of incomplete tasks, options to connect devices and providers/health plans, 
 * and support information for the project.
 */
export default function HomeView(props: HomeViewProps) {
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
		<Layout colorScheme={props.colorScheme ?? "auto"}>
			<StatusBarBackground color='#FFFFFF' />
			<Card>
				<AppDownload previewDevicePlatform={props.preview ? 'Web' : undefined} previewProjectPlatforms={props.preview ? ['Web', 'Android', 'iOS'] : undefined} />
			</Card>
			<Card>
				<MostRecentNotification
					notificationType={notificationType}
					onViewMore={props.notificationsViewUrl ? () => viewAllNotifications() : undefined}
					previewState={props.preview ? "loaded with data" : undefined}
					hideAfterHours={props.notificationHideAfterHours} />
			</Card>
			<SurveyTaskList
				variant='singleCard'
				status="incomplete"
				limit={3}
				title={language("tasks")}
				onDetailLinkClick={props.tasksViewUrl ? () => viewAllTasks() : undefined}
				previewState={props.preview ? "IncompleteTasks" : undefined}
			/>
			<Card>
				<ConnectDevicesMenu headerVariant='medium' previewState={props.preview ? "Web" : undefined} />
			</Card>
			<Card>
				{props.ehrConnectApplicationUrl &&
					<ConnectEhr variant="medium" previewState={props.preview ? "enabled" : undefined} applicationUrl={props.ehrConnectApplicationUrl} />
				}
			</Card>
			<Card>
				<ProjectSupport previewState={props.preview ? "Default" : undefined} />
			</Card>
		</Layout>
	)
}