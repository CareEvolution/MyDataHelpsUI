import React from 'react'
import { Layout, NavigationBar, NotificationList, StatusBarBackground } from "../../.."
import { NotificationType } from "@careevolution/mydatahelps-js"

import language from '../../../helpers/language';

export interface NotificationsViewProps {
	notificationType?: NotificationType
	presentation?: ViewPresentationType
	preview?: boolean
	colorScheme?: "auto" | "light" | "dark";
}

export type ViewPresentationType = "Modal" | "Push";

/*
** TODO: When I have internet
*/
export default function NotificationsView(props: NotificationsViewProps) {
	var notificationType: NotificationType = "Push";
	if (props.notificationType) {
		notificationType = props.notificationType;
	}

	return (
		<Layout colorScheme={props.colorScheme ?? "auto"}>
			{props.presentation &&
				<NavigationBar title={language("notifications")}
					showBackButton={props.presentation == "Push"}
					showCloseButton={props.presentation == "Modal"} />
			}
			{!props.presentation &&
				<StatusBarBackground />
			}
			<NotificationList notificationType={notificationType} previewState={props.preview ? "Default" : undefined} />
		</Layout>
	)
}