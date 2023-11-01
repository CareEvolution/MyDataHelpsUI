import React, { useContext } from 'react';
import './ViewHeader.css'
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ViewHeaderAction {
    icon: IconDefinition;
    onClick: () => void;
    color?: ColorDefinition;
}

export interface ViewHeaderProps {
    title?: string;
    subtitle?: string;
    titleColor?: ColorDefinition;
    subtitleColor?: ColorDefinition;
    action?: ViewHeaderAction;
}

export default function (props: ViewHeaderProps) {
    let layoutContext = useContext(LayoutContext);

    if (!props.title && !props.subtitle) return null;
    return (
        <div className="mdhui-view-header">
            <div className="mdhui-view-header-text">
                {props.title &&
                    <div style={{color: resolveColor(layoutContext.colorScheme, props.titleColor)}} className="mdhui-view-header-title">{props.title}</div>
                }
                {props.subtitle &&
                    <div style={{color: resolveColor(layoutContext.colorScheme, props.subtitleColor)}} className="mdhui-view-header-subtitle">{props.subtitle}</div>
                }
            </div>
            <div className="mdhui-view-header-action" onClick={props.action ? props.action.onClick : undefined}>
                {props.action &&
                    <div className="mdhui-view-header-action-icon" style={{color: resolveColor(layoutContext.colorScheme, props.action.color)}}>
                        <FontAwesomeIcon icon={props.action.icon}/>
                    </div>
                }
            </div>
        </div>
    );
}