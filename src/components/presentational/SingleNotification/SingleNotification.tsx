import React from 'react'
import "./SingleNotification.css"
import MyDataHelps, { Notification } from "@careevolution/mydatahelps-js"
import formatRelative from 'date-fns/formatRelative'
import parseISO from 'date-fns/parseISO'
import { getLocaleFromIso } from '../../../helpers/locale';

export interface SingleNotificationProps {
	notification: Notification
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleNotificationProps) {
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());
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
				{capitalizeFirstLetter(formatRelative(parseISO(props.notification.sentDate), new Date(), { locale: locale }))}
			</div>
		</div>
	)
}