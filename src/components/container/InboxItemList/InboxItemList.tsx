import React, { useContext, useState } from 'react';
import './InboxItemList.css';
import MyDataHelps, { InboxItem, InboxItemQueryParameters, InboxItemSortColumn, InboxItemStatus, InboxItemType, InboxMessage, InboxResource, InboxSurvey, SortOrder } from '@careevolution/mydatahelps-js';
import { InboxMessageListItem, InboxResourceListItem, InboxSurveyListItem, InboxSurveyVariant, LoadingIndicator, ResourceButtonVariant, ResourceImageAlignment } from '../../presentational';
import { useInitializeView } from '../../../helpers';
import inboxDataService from '../../../helpers/Inbox/inbox-data';
import { InboxItemListCoordinatorContext } from '../InboxItemListCoordinator';
import { viewInboxMessage } from '../../view/InboxMessageView';
import { InboxItemListPreviewState, previewData } from './InboxItemList.previewData';

export interface InboxItemListProps {
    previewState?: InboxItemListPreviewState;
    title?: string;
    type?: InboxItemType | InboxItemType[];
    status?: InboxItemStatus | InboxItemStatus[];
    category?: string;
    sortOrder?: SortOrder;
    sortColumn?: InboxItemSortColumn;
    endsAfter?: string;
    endsBefore?: string;
    limit?: number;
    messageViewerUrl?: string;
    emptyText?: string;
    showTitleWhenEmpty?: boolean;
    surveyVariant?: InboxSurveyVariant;
    resourceImageAlignment?: ResourceImageAlignment;
    resourceButtonVariant?: ResourceButtonVariant;
    resourceButtonText?: string;
    hideLoadingIndicator?: boolean;
    onItemsLoaded?: (items: InboxItem[]) => void;
    syncOnChanges?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxItemListProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<InboxItem[]>();

    const onItemsLoaded = (items: InboxItem[]): void => {
        setItems(items);
        if (props.onItemsLoaded) {
            props.onItemsLoaded(items);
        }
    };

    const loadData = (): void => {
        setLoading(true);

        if (props.previewState) {
            onItemsLoaded(previewData[props.previewState].items);
            setLoading(false);
            return;
        }

        let query: InboxItemQueryParameters = {
            type: props.type,
            status: props.status,
            category: props.category,
            sortOrder: props.sortOrder,
            sortColumn: props.sortColumn,
            endsAfter: props.endsAfter,
            endsBefore: props.endsBefore
        };
        inboxDataService.loadInboxItems(query).then(items => {
            onItemsLoaded(items);
            setLoading(false);
        });
    };

    let inboxContext = useContext(InboxItemListCoordinatorContext);
    if (inboxContext && props.syncOnChanges) {
        inboxContext.registerChangeListener(loadData);
    }

    useInitializeView(loadData, [], [props.previewState]);

    if (loading && !items) {
        return <div className="mdhui-inbox-item-list" ref={props.innerRef}>
            {props.title && props.showTitleWhenEmpty &&
                <div className="mdhui-inbox-item-list-title">{props.title}</div>
            }
            {!props.hideLoadingIndicator &&
                <LoadingIndicator />
            }
        </div>;
    }

    const onClick = (inboxItem: InboxItem): void => {
        if (loading || props.previewState) return;

        if (inboxItem.isNew) {
            inboxDataService.markItemRead(inboxItem).then(() => {
                if (!props.syncOnChanges) {
                    loadData();
                }
                if (inboxContext) {
                    inboxContext.notifyChangeListeners();
                }
            });
        }
        if (inboxItem.type === 'message' && props.messageViewerUrl) {
            viewInboxMessage(inboxItem as InboxMessage, props.messageViewerUrl);
        } else if (inboxItem.type === 'survey') {
            MyDataHelps.querySurveyTasks({ status: 'incomplete' }).then(surveyTasksPage => {
                const surveyName = surveyTasksPage.surveyTasks.find(t => t.id === inboxItem.id)?.surveyName;
                if (surveyName) {
                    MyDataHelps.startSurvey(surveyName);
                }
            });
        } else if (inboxItem.type === 'resource') {
            MyDataHelps.openEmbeddedUrl((inboxItem as InboxResource).url);
        }
    };

    return <div className="mdhui-inbox-item-list" ref={props.innerRef}>
        {props.title && (items!.length > 0 || props.showTitleWhenEmpty) &&
            <div className="mdhui-inbox-item-list-title">{props.title}</div>
        }
        {items!.length === 0 && props.emptyText &&
            <div className="mdhui-inbox-item-list-empty-text">
                {props.emptyText}
            </div>
        }
        {items!.slice(0, props.limit).map((inboxItem, index) => {
            if (inboxItem.type === 'message') {
                return <InboxMessageListItem key={index} message={inboxItem as InboxMessage} onClick={() => onClick(inboxItem)} />
            }
            if (inboxItem.type === 'survey') {
                return <InboxSurveyListItem key={index} survey={inboxItem as InboxSurvey} onClick={() => onClick(inboxItem)} variant={props.surveyVariant} />;
            }
            if (inboxItem.type === 'resource') {
                return <InboxResourceListItem key={index} resource={inboxItem as InboxResource} onClick={() => onClick(inboxItem)} imageAlignment={props.resourceImageAlignment} buttonVariant={props.resourceButtonVariant} buttonText={props.resourceButtonText} />;
            }
            return null;
        })}
    </div>;
}