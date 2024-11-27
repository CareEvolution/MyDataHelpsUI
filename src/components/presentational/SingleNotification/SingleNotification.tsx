import React from 'react'
import "./SingleNotification.css"
import { Notification } from "@careevolution/mydatahelps-js"
import { formatRelativeDateForLocale } from '../../../helpers/locale';

export interface SingleNotificationProps {
	notification: Notification
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleNotificationProps) {
	return (
		<div ref={props.innerRef} className="mdhui-single-notification">
			{props.notification.content?.title &&
				<div className="notification-title">{props.notification.content.title}</div>
			}
			{props.notification.content?.subject &&
				<div className="notification-title">{props.notification.content.subject}</div>
			}
			{props.notification.content?.body &&
				<div className="notification-body">{props.notification.content.body}</div>
			}
			<div className="notification-date">
				{formatRelativeDateForLocale(props.notification.sentDate, new Date())}
			</div>
		</div>
	)
}