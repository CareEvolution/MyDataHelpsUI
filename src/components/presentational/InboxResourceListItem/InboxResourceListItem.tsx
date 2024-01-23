import React from 'react'
import { InboxResource } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import InboxCompletedListItem from '../InboxCompletedListItem';
import Resource, { ResourceImageAlignment } from '../Resource';
import language from '../../../helpers/language';

export interface InboxResourceListItemProps {
    resource: InboxResource;
    onClick: () => void;
    imageAlignment?: ResourceImageAlignment;
    buttonText?: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxResourceListItemProps) {
    if (props.resource.status === 'incomplete') {
        return <div className="mdhui-inbox-resource-list-item" ref={props.innerRef}>
            <Resource
                imageUrl={props.resource.imageUrl}
                title={props.resource.title}
                subTitle={props.resource.subTitle}
                imageAlignment={props.imageAlignment}
                buttonText={props.buttonText}
                onClick={() => props.onClick()}
            />
        </div>;
    }
    if (props.resource.status === 'complete') {
        return <InboxCompletedListItem name={props.resource.title} status={language('inbox-resource-completed-status')} onClick={() => props.onClick()} innerRef={props.innerRef}/>;
    }
    return null;
}