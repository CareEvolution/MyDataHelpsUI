import React from 'react';
import { Card, DateRangeCoordinator, Layout, Section, TextBlock } from '../../../presentational';
import { AsthmaCalendarViewPreviewState, previewData } from './AsthmaCalendarView.previewData';
import { AsthmaControlCalendar, AsthmaLogEntryHeader } from '../../components';

export interface AsthmaCalendarViewProps {
    previewState?: AsthmaCalendarViewPreviewState;
    colorScheme?: 'light' | 'dark' | 'auto';
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    dayViewUrl: string;
}

export default function (props: AsthmaCalendarViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <DateRangeCoordinator intervalType="Month">
                <AsthmaControlCalendar
                    previewState={props.previewState ? previewData[props.previewState]?.controlCalendarPreviewState : undefined}
                    dayViewUrl={props.dayViewUrl}
                />
                <AsthmaLogEntryHeader
                    previewState={props.previewState ? previewData[props.previewState]?.logEntryHeaderPreviewState : undefined}
                    logTodayEntrySurveyName={props.logTodayEntrySurveyName}
                    logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
                    dayViewUrl={props.dayViewUrl}
                />
            </DateRangeCoordinator>
        </Section>
        <Card>
            <TextBlock>
                TODO: Log History List
            </TextBlock>
        </Card>
    </Layout>;
}