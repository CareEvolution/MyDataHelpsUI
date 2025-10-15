import { InsightsData, resolveColor } from '../../../helpers';
import React, { CSSProperties, Ref, useContext } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { InsightsBadgeConfiguration } from '../InsightsRenderingCoordinator';
import { LayoutContext, ProgressRing } from '../index';
import './InsightsBadge.css';

export interface InsightsBadgeProps {
    configuration: InsightsBadgeConfiguration;
    data: InsightsData;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsBadge(props: InsightsBadgeProps) {
    const layoutContext = useContext(LayoutContext);

    const percentComplete = props.configuration.getPercentComplete(props.data);
    const shouldHighlight = percentComplete === 100;

    const iconColor = shouldHighlight ? props.configuration.iconColor ?? 'var(--mdhui-color-primary)' : { lightMode: '#acacb8', darkMode: '#8f8f9f' };
    const progressColor = props.configuration.iconColor ?? 'var(--mdhui-color-primary)';

    const resolvedBackgroundColor = resolveColor(layoutContext.colorScheme, { lightMode: '#fdfdfd', darkMode: '#43424f' });
    const resolvedIconColor = resolveColor(layoutContext.colorScheme, iconColor);
    const resolvedProgressColor = resolveColor(layoutContext.colorScheme, progressColor);
    const resolvedIncompleteProgressColor = resolveColor(layoutContext.colorScheme, { lightMode: '#dedfe3', darkMode: '#43424f' });

    const iconStyle: CSSProperties = {
        background: resolvedBackgroundColor,
        borderColor: resolvedBackgroundColor,
        color: resolvedIconColor,
        ...(shouldHighlight && props.configuration.customHighlightStyling)
    };

    return <div className="mdhui-insights-badge" ref={props.innerRef}>
        <ProgressRing
            diameter={44}
            strokeWidth={6}
            color={resolvedProgressColor}
            incompleteColor={resolvedIncompleteProgressColor}
            percentCompleted={percentComplete}
            animate
        >
            <div className="mdhui-insights-badge-icon" style={iconStyle}>
                {props.configuration.icon
                    ? <FontAwesomeSvgIcon icon={props.configuration.icon} style={{ height: '100%', width: '100%' }} />
                    : <div className="mdhui-insights-badge-icon-label">{props.configuration.identifier.substring(0, 1).toUpperCase()}</div>
                }
            </div>
        </ProgressRing>
    </div>;
}