import { InsightsData, resolveColor } from '../../../helpers';
import React, { CSSProperties, Ref, useContext } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { InsightsBadgeConfiguration } from '../InsightsRenderingCoordinator';
import { LayoutContext } from '../index';
import './InsightsBadge.css';

export interface InsightsBadgeProps {
    configuration: InsightsBadgeConfiguration;
    data: InsightsData;
    variant?: 'default' | 'xsmall';
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsBadge(props: InsightsBadgeProps) {
    const layoutContext = useContext(LayoutContext);

    const shouldHighlight = props.configuration.shouldHighlight(props.data);
    const iconColor = shouldHighlight ? props.configuration.iconColor ?? 'var(--mdhui-color-primary)' : { lightMode: '#ccc', darkMode: '#555' };
    const resolvedIconColor = resolveColor(layoutContext.colorScheme, iconColor);

    const classNames: string[] = ['mdhui-insights-badge'];
    if (props.variant === 'xsmall') {
        classNames.push('mdhui-insights-badge-xsmall');
    }
    if (shouldHighlight) {
        classNames.push('mdhui-insights-badge-highlighted');
    }

    const style: CSSProperties = {
        background: resolvedIconColor,
        borderColor: resolvedIconColor,
        ...(shouldHighlight && props.configuration.customHighlightStyling)
    };

    return <div className={classNames.join(' ')} style={style} ref={props.innerRef}>
        {props.configuration.icon
            ? <FontAwesomeSvgIcon className="mdhui-insights-badge-icon" icon={props.configuration.icon} />
            : <div className="mdhui-insights-badge-label">{props.configuration.identifier.substring(0, 1).toUpperCase()}</div>
        }
    </div>;
}