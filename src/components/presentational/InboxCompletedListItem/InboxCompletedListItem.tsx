import React from 'react'
import './InboxCompletedListItem.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Action from '../Action';
import Card from '../Card';

export interface InboxCompletedListItemProps {
    name: string;
    status: string;
    onClick?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxCompletedListItemProps) {
    return <div className="mdhui-inbox-completed-list-item" ref={props.innerRef}>
        {props.onClick && <Action title={props.name} subtitle={props.status} onClick={() => props.onClick!()}/>}
        {!props.onClick &&
            <Card>
                <div className="mdhui-inbox-completed-list-item-name">{props.name}</div>
                <div className="mdhui-inbox-completed-list-item-status">{props.status}</div>
            </Card>
        }
    </div>;
}