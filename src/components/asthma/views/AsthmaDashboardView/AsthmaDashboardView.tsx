import React from "react";
import { Card, DateRangeCoordinator, Layout } from '../../../presentational';
import { AsthmaControlCalendar, AsthmaDashboardViewHeader } from '../../container';
import { AsthmaDashboardViewPreviewState, previewData } from './AsthmaDashboardView.previewData';

export interface AsthmaDashboardViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: AsthmaDashboardViewPreviewState;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
}

export default function (props: AsthmaDashboardViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <AsthmaDashboardViewHeader
            previewState={props.previewState ? previewData[props.previewState].headerPreviewState : undefined}
            logTodayEntrySurveyName={props.logTodayEntrySurveyName}
            logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
        />
        <Card>
            <DateRangeCoordinator intervalType="Month">
                <AsthmaControlCalendar previewState={props.previewState ? previewData[props.previewState].controlCalendarPreviewState : undefined}/>
            </DateRangeCoordinator>
        </Card>
    </Layout>;
}
