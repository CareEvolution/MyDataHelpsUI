import React from 'react'
import "./SingleNotification.css"
import { Notification } from "@careevolution/mydatahelps-js"
import { getRelativeDateString } from '../../../helpers/date-helpers';

export interface SingleNotificationProps {
	notification: Notification | null
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleNotificationProps) {
	if (!props.notification) {
		return (
			<div ref={props.innerRef} className="mdhui-single-notification">
				<div className="notification-body">No notifications received</div>
			</div>
		)
	}
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
				{getRelativeDateString(props.notification.sentDate, new Date())}
			</div>
		</div>
	)
}