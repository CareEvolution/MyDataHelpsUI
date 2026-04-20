import { Card, InsightsRenderer, InsightsRenderingContext, TextBlock } from '../index';
import React, { Ref, useContext } from 'react';
import { compareDesc, isAfter } from 'date-fns';
import { InsightsData } from '../../../helpers';
import { InsightsDataContext } from '../../container';

export interface InsightsListProps {
    shouldRender?: (insightsData: InsightsData) => boolean;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsList(props: InsightsListProps) {
    const insightsDataContext = useContext(InsightsDataContext);
    const insightsRenderingContext = useContext(InsightsRenderingContext);

    if (!insightsDataContext) {
        return <TextBlock innerRef={props.innerRef}>Error: InsightsList must be used within an InsightsDataCoordinator.</TextBlock>;
    }

    const allInsightsData = Object.values(insightsDataContext.insightsData as Record<string, InsightsData>);

    return <div className="mdhui-insights-list" ref={props.innerRef}>
        {allInsightsData
            .filter(insightsData => props.shouldRender ? props.shouldRender(insightsData) : !isAfter(insightsData.date, new Date()))
            .sort((insightsData1, insightsData2) => compareDesc(insightsData1.date, insightsData2.date))
            .map((insightsData, index) => {
                return <Card key={index}>
                    <InsightsRenderer
                        logSurveyName={insightsDataContext.logSurveyName}
                        onEnterSurveyLog={insightsDataContext.enterSurveyLog}
                        badgeConfigurations={insightsRenderingContext?.badgeConfigurations}
                        getDetails={insightsRenderingContext?.getDetails}
                        insightsData={insightsData}
                        loading={insightsDataContext.loading}
                    />
                </Card>;
            })}
    </div>;
}