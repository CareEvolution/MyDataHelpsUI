import React from 'react';
import { Card, Layout, NavigationBar, Title } from '../../../presentational';
import { AsthmaAirQualities, AsthmaBiometrics, AsthmaLogEntryDetails } from '../../components';
import { format } from 'date-fns';

export interface AsthmaDayViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    date: Date;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    editLogEntryUrl: string;
    logEntryInfoUrl: string;
    heartAndLungsUrl: string;
    activityUrl: string;
    sleepUrl: string;
    airQualityUrl: string;
}

export default function (props: AsthmaDayViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar variant="compressed" showCloseButton={true}>
            <Title order={2}>
                {format(props.date, 'PPP')}
            </Title>
        </NavigationBar>
        <Card>
            <AsthmaLogEntryDetails
                previewState={props.previewState ? 'logged with mild symptoms' : undefined}
                date={props.date}
                logTodayEntrySurveyName={props.logTodayEntrySurveyName}
                logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
                editLogEntryUrl={props.editLogEntryUrl}
                infoUrl={props.logEntryInfoUrl}
            />
        </Card>
        <Card>
            <AsthmaBiometrics
                previewState={props.previewState ? 'all data' : undefined}
                heartAndLungsUrl={props.heartAndLungsUrl}
                activityUrl={props.activityUrl}
                sleepUrl={props.sleepUrl}
                date={props.date}
            />
        </Card>
        <Card>
            <AsthmaAirQualities
                previewState={props.previewState ? 'all data' : undefined}
                airQualityUrl={props.airQualityUrl}
                date={props.date}
            />
        </Card>
    </Layout>;
}