import React from 'react'
import "./SingleNotification.css"
import MyDataHelps, { Notification } from "@careevolution/mydatahelps-js"
import formatRelative from 'date-fns/formatRelative'
import parseISO from 'date-fns/parseISO'
import { enUS, es } from 'date-fns/locale'

export interface SingleNotificationProps {
	notification: Notification
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleNotificationProps) {
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	return (
		<div ref={props.innerRef} className="mdhui-single-notification">
			{props.notification.content?.title &&
				<div className="notification-title">{props.notification.content.title}</div>
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