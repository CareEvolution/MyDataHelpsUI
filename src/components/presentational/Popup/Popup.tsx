import React from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface PopupProps {
    children?: React.ReactNode;
    onCollapse: () => void;
    title?: string;
    titleIcon?: React.JSX.Element;
}

export default function (props: PopupProps) {

    return <div className="mdhui-popup">
        <div className="mdhui-popup-header">
            {props.titleIcon}
            {props.title}
            <FontAwesomeSvgIcon icon={faChevronDown} className="collapse-button" onClick={() => props.onCollapse()} />
        </div>
        {props.children}
    </div>
}
