import React, { Ref, useContext, useMemo } from 'react';
import { Action, Card, DateRangeContext, InsightsRenderer, InsightsRenderingContext, ShinyOverlay, TextBlock } from '../index';
import { isToday, startOfToday } from 'date-fns';
import { getDayKey } from '../../../helpers';
import { InsightsDataContext } from '../../container';
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface InsightsPreviewProps {
    noLogTitle?: string;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsPreview(props: InsightsPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const insightsDataContext = useContext(InsightsDataContext);
    const insightsRenderingContext = useContext(InsightsRenderingContext);

    if (!insightsDataContext) {
        return <TextBlock innerRef={props.innerRef}>Error: InsightsPreview must be used within an InsightsDataCoordinator.</TextBlock>;
    }

    const currentDate = useMemo<Date>(
        () => dateRangeContext?.intervalStart ?? startOfToday(),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    if (insightsDataContext.loading && insightsDataContext.firstTimeLoading) return null;

    const insightsData = insightsDataContext.insightsData[getDayKey(currentDate)];
    if (!insightsData) return null;

    const canLog = !!insightsDataContext.logSurveyName;
    const hasLogged = canLog && insightsData.surveyAnswers.some(surveyAnswer => surveyAnswer.surveyName === insightsDataContext.logSurveyName);

    return <div className="mdhui-insights-preview" ref={props.innerRef}>
        {canLog && !hasLogged
            ? <Card variant="highlight">
                <ShinyOverlay />
                <Action
                    title={props.noLogTitle ?? 'Enter Log'}
                    indicator={<FontAwesomeSvgIcon icon={insightsDataContext.loading ? faRefresh : faPlus} spin={insightsDataContext.loading} />}
                    onClick={!insightsDataContext.loading ? () => insightsDataContext.enterSurveyLog(currentDate) : undefined}
                />
            </Card>
            : <Card>
                <InsightsRenderer
                    title={isToday(currentDate) ? 'Today' : undefined}
                    logSurveyName={insightsDataContext.logSurveyName}
                    onEnterSurveyLog={insightsDataContext.enterSurveyLog}
                    badgeConfigurations={insightsRenderingContext?.badgeConfigurations}
                    getDetails={insightsRenderingContext?.getDetails}
                    insightsData={insightsData}
                    loading={insightsDataContext.loading}
                />
            </Card>
        }
    </div>;
}