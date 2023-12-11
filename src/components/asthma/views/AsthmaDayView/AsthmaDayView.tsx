import React from 'react';
import MyDataHelps from '@careevolution/mydatahelps-js';
import formatISO from 'date-fns/formatISO';
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
    editLogEntryUrl?: string;
}

export default function (props: AsthmaDayViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'light'}>
        <NavigationBar showCloseButton={true} variant="compressed"/>
        <Title order={1} style={{padding: '0 16px'}}>
            {format(props.date, 'PPP')}
        </Title>
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
            <AsthmaBiometrics previewState={props.previewState?.biometricsPreviewState}/>
        </Card>
        <Card>
            <AsthmaAirQualities previewState={props.previewState?.airQualitiesPreviewState}/>
        </Card>
    </Layout>;
};

export function showAsthmaDay(date: Date, url?: string): void {
    let applicationUrl = (url ?? 'https://viewlibrary.careevolutionapps.com/asthma/day') + '?date=' + formatISO(date, {representation: 'date'});
    MyDataHelps.openApplication(applicationUrl, {modal: true});
}