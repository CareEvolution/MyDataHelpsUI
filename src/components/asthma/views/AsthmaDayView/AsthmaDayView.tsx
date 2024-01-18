import React from 'react';
import { Card, Layout, NavigationBar, Title } from '../../../presentational';
import { AsthmaAirQualities, AsthmaAirQualitiesPreviewState, AsthmaBiometrics, AsthmaBiometricsPreviewState, AsthmaLogEntryDetails, AsthmaLogEntryDetailsPreviewState } from '../../components';
import { format } from 'date-fns';

export interface AsthmaDayViewPreviewState {
    logEntryDetailsPreviewState: AsthmaLogEntryDetailsPreviewState;
    biometricsPreviewState: AsthmaBiometricsPreviewState;
    airQualitiesPreviewState: AsthmaAirQualitiesPreviewState;
}

export interface AsthmaDayViewProps {
    previewState?: AsthmaDayViewPreviewState;
    colorScheme?: 'light' | 'dark' | 'auto';
    date: Date;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    editLogEntryUrl: string;
    heartAndLungsUrl: string;
    activityUrl: string;
    sleepUrl: string;
    airQualityUrl: string;
}

export default function (props: AsthmaDayViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}>
            <Title order={2} style={{paddingTop: '32px'}}>
                {format(props.date, 'PPP')}
            </Title>
        </NavigationBar>
        <Card>
            <AsthmaLogEntryDetails
                previewState={props.previewState?.logEntryDetailsPreviewState}
                date={props.date}
                logTodayEntrySurveyName={props.logTodayEntrySurveyName}
                logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
                editLogEntryUrl={props.editLogEntryUrl}
            />
        </Card>
        <Card>
            <AsthmaBiometrics
                previewState={props.previewState?.biometricsPreviewState}
                heartAndLungsUrl={props.heartAndLungsUrl}
                activityUrl={props.activityUrl}
                sleepUrl={props.sleepUrl}
                date={props.date}
            />
        </Card>
        <Card>
            <AsthmaAirQualities
                previewState={props.previewState?.airQualitiesPreviewState}
                airQualityUrl={props.airQualityUrl}
                date={props.date}
            />
        </Card>
    </Layout>;
}