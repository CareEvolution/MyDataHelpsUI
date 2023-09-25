import { InboxItem, InboxMessage, InboxResource, InboxSurvey } from '@careevolution/mydatahelps-js';
import resourceImage from "../../../assets/resource-image.png";

export type InboxItemListPreviewState = 'no items' | 'incomplete message' | 'incomplete survey' | 'incomplete resource' | 'incomplete items' | 'complete items';

export interface InboxItemListPreviewData {
    items: InboxItem[];
}

export const previewData: Record<InboxItemListPreviewState, InboxItemListPreviewData> = {
    'no items': {
        items: []
    },
    'incomplete message': {
        items: [
            {
                type: 'message',
                status: 'incomplete',
                title: 'Congrats! You have a notification!'
            } as InboxMessage
        ]
    },
    'incomplete survey': {
        items: [
            {
                type: 'survey',
                status: 'incomplete',
                name: 'Some Survey',
                description: 'This is the survey description.'
            } as InboxSurvey
        ]
    },
    'incomplete resource': {
        items: [
            {
                type: 'resource',
                status: 'incomplete',
                title: 'Using your Apple Watch',
                subTitle: 'Setup and troubleshooting',
                imageUrl: resourceImage
            } as InboxResource
        ]
    },
    'incomplete items': {
        items: [
            {
                type: 'message',
                status: 'incomplete',
                title: 'Congrats! You have a notification!'
            } as InboxMessage,
            {
                type: 'survey',
                status: 'incomplete',
                name: 'Some Survey',
                description: 'This is the survey description.'
            } as InboxSurvey,
            {
                type: 'resource',
                status: 'incomplete',
                title: 'Using your Apple Watch',
                subTitle: 'Setup and troubleshooting',
                imageUrl: resourceImage
            } as InboxResource
        ]
    },
    'complete items': {
        items: [
            {
                type: 'message',
                status: 'complete',
                title: 'Congrats! You have a notification!',
            } as InboxMessage,
            {
                type: 'survey',
                status: 'complete',
                name: 'Some Survey',
            } as InboxSurvey,
            {
                type: 'resource',
                status: 'complete',
                title: 'Using your Apple Watch',
                imageUrl: resourceImage,
            } as InboxResource
        ]
    }
};