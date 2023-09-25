import React from 'react'
import { InboxResource } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import InboxCompletedListItem from '../InboxCompletedListItem';
import InboxResourceDisplay from '../InboxResourceDisplay';
import language from '../../../helpers/language';

export type InboxResourceImageAlignment = 'left' | 'center' | 'right';

export interface InboxResourceListItemProps {
    resource: InboxResource;
    onClick: () => void;
    imageAlignment?: InboxResourceImageAlignment;
    buttonText?: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxResourceListItemProps) {
    if (props.resource.status === 'incomplete') {
        return <div className="mdhui-inbox-resource-list-item" ref={props.innerRef}>
            <InboxResourceDisplay resource={props.resource} imageAlignment={props.imageAlignment} buttonText={props.buttonText} onClick={() => props.onClick()}/>
        </div>;
    }
    if (props.resource.status === 'complete') {
        return <InboxCompletedListItem name={props.resource.title} status={language('inbox-resource-completed-status')} onClick={() => props.onClick()} innerRef={props.innerRef}/>;
    }
    return null;
}