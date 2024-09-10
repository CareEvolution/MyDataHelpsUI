import { InboxItem, InboxMessage, InboxResource, InboxSurvey } from '@careevolution/mydatahelps-js';
import resourceImage from '../../../assets/resource-image.png';

export type InboxItemListPreviewState =
    'no items'
    | 'incomplete message'
    | 'incomplete survey'
    | 'incomplete resource'
    | 'incomplete message and survey'
    | 'incomplete message and resource'
    | 'incomplete survey and resource'
    | 'incomplete items'
    | 'complete message'
    | 'complete survey'
    | 'complete resource'
    | 'complete message and survey'
    | 'complete message and resource'
    | 'complete survey and resource'
    | 'complete items';

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
    'incomplete message and survey': {
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
            } as InboxSurvey
        ]
    },
    'incomplete message and resource': {
        items: [
            {
                type: 'message',
                status: 'incomplete',
                title: 'Congrats! You have a notification!'
            } as InboxMessage,
            {
                type: 'resource',
                status: 'incomplete',
                title: 'Using your Apple Watch',
                subTitle: 'Setup and troubleshooting',
                imageUrl: resourceImage
            } as InboxResource
        ]
    },
    'incomplete survey and resource': {
        items: [
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
    'complete message': {
        items: [
            {
                type: 'message',
                status: 'complete',
                title: 'Congrats! You have a notification!',
            } as InboxMessage
        ]
    },
    'complete survey': {
        items: [
            {
                type: 'survey',
                status: 'complete',
                name: 'Some Survey',
            } as InboxSurvey,
        ]
    },
    'complete resource': {
        items: [
            {
                type: 'resource',
                status: 'complete',
                title: 'Using your Apple Watch',
                imageUrl: resourceImage,
            } as InboxResource
        ]
    },
    'complete message and survey': {
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
            } as InboxSurvey
        ]
    },
    'complete message and resource': {
        items: [
            {
                type: 'message',
                status: 'complete',
                title: 'Congrats! You have a notification!',
            } as InboxMessage,
            {
                type: 'resource',
                status: 'complete',
                title: 'Using your Apple Watch',
                imageUrl: resourceImage,
            } as InboxResource
        ]
    },
    'complete survey and resource': {
        items: [
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