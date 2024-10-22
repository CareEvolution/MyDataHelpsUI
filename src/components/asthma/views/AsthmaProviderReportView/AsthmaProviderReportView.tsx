import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { AsthmaProviderReport, AsthmaProviderReportPreviewState } from '../../components';

export interface AsthmaProviderReportViewProps {
    previewState?: AsthmaProviderReportPreviewState;
    logEntrySurveyName: string;
}

export default function (props: AsthmaProviderReportViewProps) {
    return <Layout colorScheme="light">
        <NavigationBar variant="compressed" showCloseButton={true}>
            <Title order={1}>Provider Report</Title>
        </NavigationBar>
        <AsthmaProviderReport
            previewState={props.previewState}
            logEntrySurveyName={props.logEntrySurveyName}
        />
    </Layout>;
}
