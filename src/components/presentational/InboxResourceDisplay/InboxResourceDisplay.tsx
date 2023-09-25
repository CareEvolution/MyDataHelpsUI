import React from 'react'
import './InboxResourceDisplay.css'
import { InboxMessageResource, InboxResource } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import UnstyledButton from '../UnstyledButton/UnstyledButton';
import Button from '../Button/Button';
import { noop } from '../../../helpers/functions';
import language from '../../../helpers/language';

export interface InboxResourceDisplayProps {
    resource: InboxResource | InboxMessageResource;
    onClick: () => void;
    imageAlignment?: 'left' | 'center' | 'right';
    buttonText?: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxResourceDisplayProps) {
    return <div className="mdhui-inbox-resource" ref={props.innerRef}>
        <UnstyledButton onClick={() => props.onClick()}>
            {props.resource.imageUrl &&
                <div className="mdhui-inbox-resource-image" style={{textAlign: props.imageAlignment ?? 'left'}}>
                    <img src={props.resource.imageUrl} alt="resource image"/>
                </div>
            }
            <div className="mdhui-inbox-resource-title">{props.resource.title}</div>
            <div className="mdhui-inbox-resource-subtitle">{props.resource.subTitle}</div>
            <Button onClick={noop}>{props.buttonText || language('inbox-resource-default-button-text')}</Button>
        </UnstyledButton>
    </div>;
}