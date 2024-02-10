import React from 'react';
import { Layout, NavigationBar } from '../../../presentational';
import { AsthmaAlertTakeoverNotice } from '../../components';
import language from '../../../../helpers/language';

export interface AsthmaAlertTakeoverViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    logEntrySurveyName: string;
}

export default function (props: AsthmaAlertTakeoverViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)"/>
        <div style={{background: '#ccc', height: 160, width: 160, borderRadius: '50%', margin: '32px auto'}}/>
        <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-alert-takeover-message')} logEntrySurveyName={props.logEntrySurveyName}/>
    </Layout>;
}
