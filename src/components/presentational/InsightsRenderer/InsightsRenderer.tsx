import React, { CSSProperties, ReactNode, Ref, useContext } from 'react';
import { InsightsBadgeConfiguration, LayoutContext, LoadingIndicator, Title, UnstyledButton } from '../index';
import { formatDateForLocale, InsightsData, resolveColor } from '../../../helpers';
import './InsightsRenderer.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface InsightsRendererProps {
    title?: string;
    logSurveyName?: string;
    onEnterSurveyLog?: (date: Date) => void;
    badgeConfigurations?: InsightsBadgeConfiguration[];
    getDetails?: (insightsData: InsightsData) => NonNullable<ReactNode>;
    insightsData: InsightsData;
    loading?: boolean;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsRenderer(props: InsightsRendererProps) {
    const layoutContext = useContext(LayoutContext);

    const canLog = !!props.logSurveyName && !!props.onEnterSurveyLog;
    const hasLogged = canLog && props.insightsData.surveyAnswers.some(surveyAnswer => surveyAnswer.surveyName === props.logSurveyName);

    const title = props.title ?? formatDateForLocale(props.insightsData.date, 'PPP');
    const titleAccessory = props.loading
        ? <LoadingIndicator variant="inline" />
        : canLog
            ? <UnstyledButton className="mdhui-insights-renderer-log-button" onClick={() => props.onEnterSurveyLog!(props.insightsData.date)}>
                {hasLogged ? 'Edit Log' : 'Add Log'}
            </UnstyledButton>
            : undefined;

    return <div className="mdhui-insights-renderer" ref={props.innerRef}>
        <Title order={4} accessory={titleAccessory}>{title}</Title>
        {!!props.badgeConfigurations?.length &&
            <div className="mdhui-insights-renderer-badges">
                {props.badgeConfigurations.map((configuration, index) => {
                    const shouldHighlight = configuration.shouldHighlight(props.insightsData);
                    const iconColor = shouldHighlight ? configuration.iconColor ?? 'var(--mdhui-color-primary)' : { lightMode: '#ccc', darkMode: '#555' };
                    const resolvedIconColor = resolveColor(layoutContext.colorScheme, iconColor);

                    const classNames: string[] = ['mdhui-insights-renderer-badge'];
                    if (shouldHighlight) {
                        classNames.push('mdhui-insights-renderer-badge-highlighted');
                    }

                    const style: CSSProperties = {
                        background: resolvedIconColor,
                        borderColor: resolvedIconColor,
                        ...(shouldHighlight && configuration.customHighlightStyling)
                    };

                    return <div key={index} className={classNames.join(' ')} style={style}>
                        {configuration.icon
                            ? <FontAwesomeSvgIcon className="mdhui-insights-renderer-badge-icon" icon={configuration.icon} />
                            : <div className="mdhui-insights-renderer-badge-label">{configuration.identifier.substring(0, 1).toUpperCase()}</div>
                        }
                    </div>;
                })}
            </div>
        }
        {!!props.getDetails &&
            <div className="mdhui-insights-renderer-details">
                {props.getDetails(props.insightsData)}
            </div>
        }
    </div>;
}