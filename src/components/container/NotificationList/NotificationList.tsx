import React, { useState } from 'react';
import MyDataHelps, { Guid, Notification, NotificationQueryParameters, NotificationType } from '@careevolution/mydatahelps-js';
import { Card, LoadingIndicator, SingleNotification, TextBlock } from '../../presentational';
import { previewNotifications } from './NotificationList.previewdata';
import language from '../../../helpers/language';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger';
import { useInitializeView } from '../../../helpers';

export type NotificationListPreviewState = 'loading' | 'loaded with data' | 'loaded with no data';

export interface NotificationListProps {
    previewState?: NotificationListPreviewState;
    notificationType?: NotificationType;
    notificationIdentifierPattern?: RegExp;
    displayLimit?: number;
    hideWhenEmpty?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * A list of participant notifications.
 *
 * <ul>
 * <li>The list can be filtered by type (i.e. Email/Push/SMS) and/or identifier pattern.</li>
 * <li>You can set a limit on the number of displayed notifications.</li>
 * <li>The list can be hidden when there are no notifications.</li>
 * </ul>
 **/
export default function NotificationList(props: NotificationListProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [nextPageID, setNextPageID] = useState<Guid>();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const loadNextPage = (existingNotifications?: Notification[]) => {
        setLoading(true);
        setNextPageID(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState === 'loaded with data') {
            const typeFilteredNotifications = previewNotifications.filter(n => !props.notificationType || n.type === props.notificationType);
            const typeAndIdentifierFilteredNotifications = typeFilteredNotifications.filter(n => !props.notificationIdentifierPattern || n.identifier.match(props.notificationIdentifierPattern));
            const filteredAndLimitedNotifications = typeAndIdentifierFilteredNotifications.slice(0, props.displayLimit);
            setNotifications(filteredAndLimitedNotifications);
            setLoading(false);
            return;
        }

        if (props.previewState === 'loaded with no data') {
            setNotifications([]);
            setLoading(false);
            return;
        }

        const parameters: NotificationQueryParameters = {
            statusCode: 'Succeeded',
            limit: 10
        };
        if (props.notificationType) {
            parameters.type = props.notificationType;
        }
        if (nextPageID) {
            parameters.pageID = nextPageID;
        }
        MyDataHelps.queryNotifications(parameters).then(result => {
            const filteredResultNotifications = result.notifications.filter(n => !props.notificationIdentifierPattern || n.identifier.match(props.notificationIdentifierPattern));
            const updatedNotifications = (existingNotifications ?? []).concat(filteredResultNotifications).slice(0, props.displayLimit);

            setNotifications(updatedNotifications);
            setNextPageID((!props.displayLimit || updatedNotifications.length < props.displayLimit) ? result.nextPageID : undefined);
            setLoading(false);
        });
    };

    useInitializeView(() => {
        setNotifications([]);
        loadNextPage();
    }, [], [props.previewState, props.notificationType, props.notificationIdentifierPattern, props.displayLimit]);

    if (!loading && !nextPageID && notifications.length === 0 && props.hideWhenEmpty) {
        return null;
    }

    return <div ref={props.innerRef} className="mdhui-notification-list">
        {notifications.map(notification =>
            <Card key={notification.id.toString()}>
                <SingleNotification notification={notification} />
            </Card>
        )}
        {loading && <LoadingIndicator />}
        {!loading && !nextPageID && notifications.length === 0 &&
            <Card>
                <TextBlock>
                    {language('no-notifications-received')}
                </TextBlock>
            </Card>
        }
        <OnVisibleTrigger onTrigger={() => loadNextPage(notifications)} enabled={!loading && !!nextPageID}></OnVisibleTrigger>
    </div>;
}