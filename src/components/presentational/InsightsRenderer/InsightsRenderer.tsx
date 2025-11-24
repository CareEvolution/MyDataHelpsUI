import React, { ReactNode, Ref } from 'react';
import { InsightsBadge, InsightsBadgeConfiguration, LoadingIndicator, Title, UnstyledButton } from '../index';
import { formatDateForLocale, InsightsData } from '../../../helpers';
import './InsightsRenderer.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export interface InsightsRendererProps {
    title?: string;
    logSurveyName?: string;
    onEnterSurveyLog?: (date: Date) => void;
    badgeConfigurations?: InsightsBadgeConfiguration[];
    getDetails?: (insightsData: InsightsData) => ReactNode;
    insightsData: InsightsData;
    loading?: boolean;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsRenderer(props: InsightsRendererProps) {

    const canLog = !!props.logSurveyName && !!props.onEnterSurveyLog;
    const hasLogged = canLog && props.insightsData.surveyAnswers.some(surveyAnswer => surveyAnswer.surveyName === props.logSurveyName);

    const title = props.title ?? formatDateForLocale(props.insightsData.date, 'PPP');
    const titleAccessory = props.loading
        ? <LoadingIndicator variant="inline" />
        : canLog
            ? <UnstyledButton onClick={() => props.onEnterSurveyLog!(props.insightsData.date)}>
                {hasLogged ?
                    <FontAwesomeSvgIcon icon={faEdit} /> :
                    <div className="mdhui-insights-renderer-log-button">Add Log</div>
                }
            </UnstyledButton>
            : undefined;

    const badges = props.insightsData
        ? props.badgeConfigurations
            ?.filter(configuration => !configuration.shouldRender || configuration.shouldRender(props.insightsData))
            .map((configuration, index) => {
                return <InsightsBadge key={index} configuration={configuration} data={props.insightsData} />;
            })
        : undefined;

    const details = props.getDetails?.(props.insightsData);

    return <div className="mdhui-insights-renderer" ref={props.innerRef}>
        <Title order={4} accessory={titleAccessory}>{title}</Title>
        {!!badges?.length && <div className="mdhui-insights-renderer-badges">{badges}</div>}
        {details && <div className="mdhui-insights-renderer-details">{details}</div>}
    </div>;
}