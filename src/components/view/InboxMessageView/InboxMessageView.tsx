import React, { useEffect, useState } from 'react';
import './InboxMessageView.css';
import MyDataHelps, { Guid, InboxMessage, InboxMessageResource, PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import inboxDataService from '../../../helpers/Inbox/inbox-data';
import { Layout, LoadingIndicator, NavigationBar, Title } from '../../presentational';
import InboxResourceDisplay from '../../presentational/InboxResourceDisplay/InboxResourceDisplay';
import language from '../../../helpers/language';

export interface InboxMessageViewProps {
    previewState?: InboxMessage;
    colorScheme?: 'light' | 'dark' | 'auto';
    resourceImageAlignment?: 'left' | 'center' | 'right';
    resourceButtonText?: string;
}

export default function (props: InboxMessageViewProps) {
    const [message, setMessage] = useState<InboxMessage>();

    useEffect(() => {
        if (props.previewState) {
            setMessage(props.previewState);
            return;
        }

        MyDataHelps.queryDeviceData({namespace: 'Project', type: 'MDHUI-InboxMessage'}).then(dataPointsPage => {
            if (dataPointsPage.deviceDataPoints.length > 0) {
                let messageId = dataPointsPage.deviceDataPoints[0].value as Guid;
                inboxDataService.loadInboxItem(messageId).then(inboxItem => {
                    if (inboxItem && inboxItem.type === 'message') {
                        setMessage(inboxItem as InboxMessage);
                    } else {
                        MyDataHelps.dismiss();
                    }
                });
            } else {
                MyDataHelps.dismiss();
            }
        });
    }, [props.previewState]);

    const onRelatedResourceClicked = (resource: InboxMessageResource): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(resource.url);
    }

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}/>
        {!message &&
            <LoadingIndicator/>
        }
        {message &&
            <div className="mdhui-inbox-message">
                <Title order={3}>{message.title}</Title>
                <div className="mdhui-inbox-message-content" dangerouslySetInnerHTML={{__html: message.content}}/>
                {message.relatedResources && message.relatedResources.length > 0 &&
                    <div className="mdhui-inbox-message-related-resources">
                        <Title order={4}>{language('inbox-message-view-related-resources-title')}</Title>
                        {message.relatedResources.map((resource, index) => {
                            return <InboxResourceDisplay
                                key={index}
                                resource={resource}
                                onClick={() => onRelatedResourceClicked(resource)}
                                imageAlignment={props.resourceImageAlignment}
                                buttonText={props.resourceButtonText}
                            />;
                        })}
                    </div>
                }
            </div>
        }
    </Layout>;
}

export function viewInboxMessage(message: InboxMessage, url: string): void {
    let messageDataPoint: PersistableDeviceDataPoint = {
        type: 'MDHUI-InboxMessage',
        value: message.id.toString()
    };
    MyDataHelps.persistDeviceData([messageDataPoint]).then(() => {
        MyDataHelps.openApplication(url, {modal: true});
    });
}