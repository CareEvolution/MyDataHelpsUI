import React from 'react';
import { Card, Layout } from '../../../presentational';
import { AsthmaCalendarViewHeader } from '../../container';
import { AsthmaCalendarViewPreviewState, previewData } from './AsthmaCalendarView.previewData';

export interface AsthmaCalendarViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: AsthmaCalendarViewPreviewState;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
}

export default function (props: AsthmaCalendarViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <AsthmaCalendarViewHeader
            previewState={props.previewState ? previewData[props.previewState].headerPreviewState : undefined}
            logTodayEntrySurveyName={props.logTodayEntrySurveyName}
            logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
        />
        <Card>
            <div style={{padding: '16px'}}>
                Log History List
            </div>
        </Card>
    </Layout>;
}
