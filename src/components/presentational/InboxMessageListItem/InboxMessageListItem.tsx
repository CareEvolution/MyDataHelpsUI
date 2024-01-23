import React from 'react'
import './InboxMessageListItem.css'
import { InboxMessage } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Action from '../Action';
import InboxCompletedListItem from '../InboxCompletedListItem';
import language from '../../../helpers/language';

export interface InboxMessageListItemProps {
    message: InboxMessage;
    onClick: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxMessageListItemProps) {
    if (props.message.status === 'incomplete') {
        return <div className="mdhui-inbox-message-list-item" ref={props.innerRef}>
            <Action title={props.message.title} onClick={() => props.onClick()}/>
        </div>;
    }
    if (props.message.status === 'complete') {
        return <InboxCompletedListItem name={props.message.title} status={language('inbox-message-completed-status')} onClick={() => props.onClick()} innerRef={props.innerRef}/>;
    }
    return null;
}