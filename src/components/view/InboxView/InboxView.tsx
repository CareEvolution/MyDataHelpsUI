import React, { useState } from 'react';
import './InboxView.css';
import MyDataHelps, { InboxItem } from '@careevolution/mydatahelps-js';
import { add } from 'date-fns';
import Layout from '../../presentational/Layout';
import InboxItemListCoordinator from '../../container/InboxItemListCoordinator';
import ViewHeader from '../../presentational/ViewHeader';
import LoadingIndicator from '../../presentational/LoadingIndicator';
import InboxItemList from '../../container/InboxItemList';
import Card from '../../presentational/Card';
import Action from '../../presentational/Action';
import { InboxSurveyVariant, ResourceButtonVariant, ResourceImageAlignment } from '../../presentational';
import language from '../../../helpers/language';

export interface InboxViewProps {
    previewState?: 'default' | 'empty';
    colorScheme?: 'auto' | 'light' | 'dark';
    surveyVariant?: InboxSurveyVariant;
    resourceImageAlignment?: ResourceImageAlignment;
    resourceButtonVariant?: ResourceButtonVariant;
    resourceButtonText?: string;
    messageViewerUrl: string;
    historyViewerUrl: string;
    itemCategory?: string;
}

export default function (props: InboxViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <InboxItemListCoordinator>
            <InboxViewInner {...props} />
        </InboxItemListCoordinator>
    </Layout>;
}

function InboxViewInner(props: InboxViewProps) {
    const [messages, setMessages] = useState<InboxItem[]>();
    const [surveys, setSurveys] = useState<InboxItem[]>();
    const [resources, setResources] = useState<InboxItem[]>();

    const onHistoryClicked = (): void => {
        if (props.previewState) return;
        MyDataHelps.openApplication(props.historyViewerUrl, { modal: true });
    };

    let loading = !messages && !surveys && !resources;
    let items = [...messages ?? [], ...surveys ?? [], ...resources ?? []];

    return <div className="mdhui-inbox">
        <ViewHeader title={language('inbox-view-title')} />
        {loading &&
            <LoadingIndicator />
        }
        {!loading && items.length === 0 &&
            <div className="mdhui-inbox-empty-text">{language('inbox-view-empty-text')}</div>
        }
        <InboxItemList
            previewState={props.previewState === 'default' ? 'incomplete message' : props.previewState === 'empty' ? 'no items' : undefined}
            title={language('inbox-view-messages-title')}
            type="message"
            status="incomplete"
            sortOrder="descending"
            sortColumn="insertedDate"
            messageViewerUrl={props.messageViewerUrl}
            onItemsLoaded={setMessages}
            hideLoadingIndicator={true}
            category={props.itemCategory}
        />
        <InboxItemList
            previewState={props.previewState === 'default' ? 'incomplete survey' : props.previewState === 'empty' ? 'no items' : undefined}
            title={language('inbox-view-surveys-title')}
            type="survey"
            status="incomplete"
            sortOrder="ascending"
            sortColumn="dueDate"
            onItemsLoaded={setSurveys}
            hideLoadingIndicator={true}
            surveyVariant={props.surveyVariant}
            category={props.itemCategory}
        />
        <InboxItemList
            previewState={props.previewState === 'default' ? 'incomplete resource' : props.previewState === 'empty' ? 'no items' : undefined}
            title={language('inbox-view-resources-title')}
            type="resource"
            status="incomplete"
            sortOrder="descending"
            sortColumn="insertedDate"
            onItemsLoaded={setResources}
            hideLoadingIndicator={true}
            resourceImageAlignment={props.resourceImageAlignment}
            resourceButtonVariant={props.resourceButtonVariant}
            resourceButtonText={props.resourceButtonText}
            category={props.itemCategory}
        />
        <div className="mdhui-inbox-recently-completed">
            <InboxItemList
                previewState={props.previewState === 'default' ? 'complete items' : props.previewState === 'empty' ? 'no items' : undefined}
                title={language('inbox-view-recently-completed-title')}
                status="complete"
                sortOrder="descending"
                sortColumn="endDate"
                messageViewerUrl={props.messageViewerUrl}
                endsAfter={add(new Date(), { days: -3 }).toISOString()}
                showTitleWhenEmpty={true}
                emptyText={language('inbox-view-recently-completed-empty-text')}
                syncOnChanges={true}
                category={props.itemCategory}
            />
            {!loading &&
                <Card style={{ margin: '12px 16px' }}>
                    <Action title={language('inbox-view-history-button-text')} onClick={() => onHistoryClicked()} />
                </Card>
            }
        </div>
    </div>;
}