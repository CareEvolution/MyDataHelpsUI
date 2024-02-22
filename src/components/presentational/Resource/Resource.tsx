import React from 'react'
import './Resource.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import UnstyledButton from '../UnstyledButton/UnstyledButton';
import Button from '../Button/Button';
import { noop } from '../../../helpers/functions';
import language from '../../../helpers/language';

export type ResourceImageAlignment = 'left' | 'center' | 'right';

export interface ResourceProps {
    imageUrl?: string;
    title: string;
    subTitle?: string;
    imageAlignment?: ResourceImageAlignment;
    buttonText?: string;
    onClick: () => void;
    hideButton?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: ResourceProps) {
    return <div className="mdhui-resource" ref={props.innerRef}>
        <UnstyledButton onClick={() => props.onClick()}>
            {props.imageUrl &&
                <div className="mdhui-resource-image" style={{textAlign: props.imageAlignment ?? 'left'}}>
                    <img src={props.imageUrl} alt="resource image"/>
                </div>
            }
            <div className="mdhui-resource-title">{props.title}</div>
            <div className="mdhui-resource-subtitle">{props.subTitle}</div>
            {!props.hideButton && <Button className="mdhui-resource-button" onClick={noop}>{props.buttonText || language('resource-default-button-text')}</Button>}
        </UnstyledButton>
    </div>;
}