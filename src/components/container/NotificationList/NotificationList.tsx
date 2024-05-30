import React, { useState, useEffect, useRef } from 'react'
import MyDataHelps,  { Guid, Notification, NotificationQueryParameters, NotificationType } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, SingleNotification, Card, TextBlock } from '../../presentational'
import { previewNotifications } from './NotificationList.previewdata'
import language from '../../../helpers/language';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger'

export interface NotificationListProps {
	notificationType?: NotificationType,
	previewState?: NotificationListPreviewState
	innerRef?: React.Ref<HTMLDivElement>
}

export type NotificationListPreviewState = "Default" | "NoData";

/** Notification List. Can be filtered by Email/Push/SMS */
export default function (props: NotificationListProps) {
	const [loading, setLoading] = useState(false);
	const [nextPageID, setNextPageID] = useState<Guid | undefined>(undefined);
	const [finishedLoading, setFinishedLoading] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	function loadNextPage() {
		if (props.previewState == "Default") {
			setNotifications(previewNotifications.filter(n => !props.notificationType || n.type == props.notificationType));
		}

		if (props.previewState) {
			setLoading(false);
			setFinishedLoading(true);
			return;
		}

		if (loading || finishedLoading) { return; }
		setLoading(true);
		var parameters: NotificationQueryParameters = {
			statusCode: "Succeeded",
			limit: 10
		};
		if (props.notificationType) {
			parameters.type = props.notificationType;
		}
		if (nextPageID) {
			parameters.pageID = nextPageID;
		}
		MyDataHelps.queryNotifications(parameters).then(function (result) {
			setNotifications(notifications.concat(result.notifications));
			setLoading(false);
			if (!result.nextPageID) {
				setFinishedLoading(true);
			}
			setNextPageID(result.nextPageID);
		});
	}

	useEffect(() => {
		loadNextPage();

		var initialize = function () {
			setNotifications([]);
			setNextPageID(undefined);
			setFinishedLoading(false);
			loadNextPage();
		}
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
		}
	}, [props.notificationType]);

	return (
		<div ref={props.innerRef} className="mdhui-notification-list">
			{notifications && notifications.map((notification) =>
				<Card key={notification.id.toString()}>
					<SingleNotification notification={notification} />
				</Card>
			)}
			{loading && !finishedLoading &&
				<LoadingIndicator />
			}
			{!loading && finishedLoading && notifications.length == 0 &&
				<Card>
					<TextBlock>
						{language("no-notifications-received")}
					</TextBlock>
				</Card>
			}
			<OnVisibleTrigger onTrigger={loadNextPage} enabled={!loading && !finishedLoading}></OnVisibleTrigger>
		</div>
	);
}