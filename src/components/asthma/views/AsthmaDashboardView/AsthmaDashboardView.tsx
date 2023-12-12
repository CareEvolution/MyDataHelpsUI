import React, { useState } from 'react';
import { Card, DateRangeCoordinator, Layout, LoadingIndicator, Section, TextBlock } from '../../../presentational';
import { AsthmaParticipant } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService } from '../../helpers';
import { AsthmaDashboardViewPreviewState, previewData } from './AsthmaDashboardView.previewData';
import { AsthmaControlCalendar, AsthmaControlStatusHeader, AsthmaLogEntryHeader, AsthmaTools } from '../../components';

export interface AsthmaDashboardViewProps {
    previewState?: AsthmaDashboardViewPreviewState;
    colorScheme?: 'light' | 'dark' | 'auto';
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    dayViewUrl: string;
}

export default function (props: AsthmaDashboardViewProps) {
    const [participant, setParticipant] = useState<AsthmaParticipant>();

    useInitializeView(() => {
        if (props.previewState) {
            setParticipant(previewData[props.previewState].participant);
            return;
        }
        asthmaDataService.loadParticipant().then(participant => {
            setParticipant(participant);
        });
    })

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        {!participant && <LoadingIndicator/>}
        {participant &&
            <Section backgroundColor="#fff">
                <TextBlock>
                    <h1>Hi {participant.getFirstName()},</h1>
                </TextBlock>
                <AsthmaControlStatusHeader
                    previewState={props.previewState ? previewData[props.previewState]?.controlStatusHeaderPreviewState : undefined}
                    participant={participant}
                />
                <AsthmaLogEntryHeader
                    previewState={props.previewState ? previewData[props.previewState]?.logEntryHeaderPreviewState : undefined}
                    logTodayEntrySurveyName={props.logTodayEntrySurveyName}
                    logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
                    dayViewUrl={props.dayViewUrl}
                />
            </Section>
        }
        <Card>
            <TextBlock>
                <h2>Calendar</h2>
            </TextBlock>
            <DateRangeCoordinator intervalType="Month">
                <AsthmaControlCalendar
                    previewState={props.previewState ? previewData[props.previewState]?.controlCalendarPreviewState : undefined}
                    dayViewUrl={props.dayViewUrl}
                />
            </DateRangeCoordinator>
        </Card>
        <Card>
            <TextBlock>
                <h2>Asthma Tools</h2>
            </TextBlock>
            <AsthmaTools/>
        </Card>
    </Layout>;
}