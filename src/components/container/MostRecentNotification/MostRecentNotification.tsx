import React, { useState } from 'react'
import "./MostRecentNotification.css"
import MyDataHelps, { NotificationQueryParameters, NotificationType, Notification, QueryParameters } from "@careevolution/mydatahelps-js"
import { Action, LoadingIndicator, SingleNotification } from '../../presentational'
import { add } from 'date-fns'
import { previewNotifications } from './MostRecentNotification.previewdata'
import language from '../../../helpers/language'
import { useInitializeView } from '../../../helpers'

export interface MostRecentNotificationProps {
	notificationType?: NotificationType,
	notificationIdentifierRegex?: RegExp;
	onViewMore?: Function,
	hideAfterHours?: number,
	previewState?: MostRecentNotificationPreviewState
	innerRef?: React.Ref<HTMLDivElement>
}

export type MostRecentNotificationPreviewState = 'loading' | 'loaded with data' | 'loaded with no data';

export default function (props: MostRecentNotificationProps) {
	const [notification, setNotification] = useState<Notification | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	function validateRegex(regex: RegExp | undefined): boolean {
		if (!regex) {
			return true;
		}
		try {
			// Limit the length of the regex pattern to prevent ReDoS attacks
			if (regex.source.length > 100) {
				return false;
			}
			new RegExp(regex.source);
			return true;
		} catch (e) {
			return false;
		}
	}


	async function initialize() {
		setLoading(true);
		if (props.previewState === 'loading') {
			setNotification(null);
			return;
		}

		if (props.previewState === 'loaded with data') {
			const typeFilteredNotifications = previewNotifications.filter(n => !props.notificationType || n.type === props.notificationType);
			const typeAndIdentifierFilteredNotifications = typeFilteredNotifications.filter(n => !props.notificationIdentifierRegex || n.identifier.match(props.notificationIdentifierRegex));
			const hideAfterHoursFilteredNotifications = typeAndIdentifierFilteredNotifications.filter(n => !props.hideAfterHours || new Date(n.sentDate) > add(new Date(), { hours: -1 * props.hideAfterHours }));
			if (hideAfterHoursFilteredNotifications.length > 0) {
				const previewNotification = hideAfterHoursFilteredNotifications[0];
				setNotification(previewNotification);
			} else {
				setNotification(null);
			}
			setLoading(false);
			return;
		}

		if (props.previewState === 'loaded with no data') {
			setNotification(null);
			setLoading(false);
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

		if (!props.notificationIdentifierRegex) {
			const notificationPage = await MyDataHelps.queryNotifications(parameters)
			setLoading(false);
			if (notificationPage.notifications.length > 0) {
				setNotification(notificationPage.notifications[0]);
			}
		} else {
			const notification = await findMatchingNotification(parameters, props.notificationIdentifierRegex);
			setLoading(false);
			if (notification) {
				setNotification(notification);
			}
		}
	}

	async function findMatchingNotification(queryParams: NotificationQueryParameters, identifierRegex: RegExp): Promise<Notification | null> {

		let count = 1;
		const MAX_PAGES = 100;
		const MAX_PAGE_SIZE = 100;
		const LIMIT_INCREASE_STEP = 20;

		do {
			count++;
			queryParams.limit = Math.min(MAX_PAGE_SIZE, count * LIMIT_INCREASE_STEP);
			const result = await MyDataHelps.queryNotifications(queryParams);
			const matchingNotification = result.notifications.find(n => n.identifier.match(identifierRegex));
			if (matchingNotification) {
				return matchingNotification;
			}
			if (!result.nextPageID) {
				return null;
			}
			queryParams.pageID = result.nextPageID;

		} while (count <= MAX_PAGES); //limit to 100 requests just for sanity

		return null;
	}

	useInitializeView(() => {
		if (!validateRegex(props.notificationIdentifierRegex)) {
			console.error("Invalid regex pattern");
			return;
		}
		initialize().catch(console.error);
	}, [], [props.previewState, props.notificationType, props.notificationIdentifierRegex, props.hideAfterHours]);

	return (
		<div ref={props.innerRef} className="mdhui-most-recent-notification">
			{loading && <LoadingIndicator />}
			{!loading && <div>
				<SingleNotification notification={notification} />
				{props.onViewMore &&
					<Action subtitle={language("all-notifications")} onClick={props.onViewMore} />
				}
			</div>}
		</div>
	);
}