import React, { ReactNode, Ref, useContext } from 'react';
import { InsightsBadge, InsightsBadgeConfiguration, LayoutContext, LoadingIndicator, Title, UnstyledButton } from '../index';
import { formatDateForLocale, InsightsData } from '../../../helpers';
import './InsightsRenderer.css';

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
                    return <InsightsBadge key={index} configuration={configuration} data={props.insightsData} />;
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