import React from 'react';
import './AsthmaToolLink.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface AsthmaToolLinkProps {
    text: string;
    onClick: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaToolLinkProps) {
    return <div className="mdhui-asthma-tool-link" ref={props.innerRef} onClick={() => props.onClick()}>
        <div className="mdhui-asthma-tool-link-icon">
            <FontAwesomeIcon icon={faPlus}/>
        </div>
        <div className="mdhui-asthma-tool-link-text">
            {props.text}
        </div>
    </div>;
}