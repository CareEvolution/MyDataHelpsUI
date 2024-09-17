import React, { useState, useEffect } from 'react'
import "./MostRecentNotification.css"
import MyDataHelps, { NotificationQueryParameters, NotificationType, Notification } from "@careevolution/mydatahelps-js"
import { Action, SingleNotification } from '../../presentational'
import { add } from 'date-fns'
import { previewNotification } from './MostRecentNotification.previewdata'
import language from '../../../helpers/language'

export interface MostRecentNotificationProps {
	notificationType?: NotificationType,
	onViewMore?: Function,
	hideAfterHours?: number,
	previewState?: MostRecentNotificationPreviewState
	innerRef?: React.Ref<HTMLDivElement>
}

export type MostRecentNotificationPreviewState = "Default";

export default function (props: MostRecentNotificationProps) {
	const [notification, setNotification] = useState<Notification | null>(null);

	function initialize() {
		if (props.previewState == "Default") {
			setNotification(previewNotification);
			return;
		}

		var parameters: NotificationQueryParameters = {
			limit: 1,
			statusCode: "Succeeded"
		};

		if (props.hideAfterHours) {
			var minDate = add(new Date(), { hours: -1 * props.hideAfterHours });
			parameters.sentAfter = minDate.toISOString();
		}
		if (props.notificationType) {
			parameters.type = props.notificationType;
		}

		MyDataHelps.queryNotifications(parameters).then(function (result) {
			if (result.notifications.length) {
				setNotification(result.notifications[0]);
			}
		});
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
		}
	}, []);

	if (!notification) {
		return null;
	}

	return (
		<div ref={props.innerRef} className="mdhui-most-recent-notification">
			<SingleNotification notification={notification} />
			{props.onViewMore &&
				<Action subtitle={language("all-notifications")} onClick={props.onViewMore} />
			}
		</div>
	);
}