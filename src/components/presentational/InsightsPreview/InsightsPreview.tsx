import React, { Ref, useContext, useMemo } from 'react';
import { Card, DateRangeContext, InsightsRenderer, InsightsRenderingContext, TextBlock } from '../index';
import { isToday, startOfToday } from 'date-fns';
import { getDayKey } from '../../../helpers';
import { InsightsDataContext } from '../../container';

export interface InsightsPreviewProps {
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

    return <div className="mdhui-insights-preview" ref={props.innerRef}>
        <Card>
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
    </div>;
}