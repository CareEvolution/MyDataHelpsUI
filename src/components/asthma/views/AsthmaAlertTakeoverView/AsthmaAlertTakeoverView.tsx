import React from 'react';
import { Layout, NavigationBar } from '../../../presentational';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';

export interface AsthmaActivityViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    logEntrySurveyName: string;
}

export default function (props: AsthmaActivityViewProps) {

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}/>
        <div style={{background: '#ccc', height: 160, width: 160, borderRadius: '50%', margin: '32px auto'}}/>
        <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message="Multiple data points are outside your normal levels." logEntrySurveyName={props.logEntrySurveyName}/>
    </Layout>;
}
