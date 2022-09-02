import React, { useState, useEffect, useRef } from 'react'
import MyDataHelps,  { Guid, Notification, NotificationQueryParameters, NotificationType } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, SingleNotification, Card, TextBlock } from '../../presentational'
import useInterval from '../../../hooks/UseInterval'
import { previewNotifications } from './NotificationList.previewdata'
import language from '../../../helpers/language';

export interface NotificationListProps {
	notificationType?: NotificationType,
	previewState?: NotificationListPreviewState
}

export type NotificationListPreviewState = "Default" | "NoData";

export default function (props: NotificationListProps) {
	const [loading, setLoading] = useState(false);
	const [nextPageID, setNextPageID] = useState<Guid | undefined>(undefined);
	const [finishedLoading, setFinishedLoading] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const loader = useRef<HTMLDivElement>(null);

	function loadNextPage() {
		if (props.previewState == "Default") {
			setNotifications(previewNotifications);
		}

		if (props.previewState) {
			setLoading(false);
			setFinishedLoading(true);
			return;
		}

		if (loading || finishedLoading) { return; }
		setLoading(true);
		var parameters: NotificationQueryParameters = {
			statusCode: "Succeeded"
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

	function elementIsVisible(elm: HTMLElement) {
		var rect = elm.getBoundingClientRect();
		var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	}

	useInterval(() => {
		if (loader.current && elementIsVisible(loader.current as HTMLElement)) {
			loadNextPage();
		}
	}, loading ? null : 1000);

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
	}, []);

	return (
		<div className="mdhui-notification-list">
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
						{language["no-notifications-received"]}
					</TextBlock>
				</Card>
			}
			{!loading && !finishedLoading &&
				<div style={{ height: "20px" }} ref={loader} />
			}
		</div>
	);
}