import React from 'react';
import { Card, Layout, TextBlock } from '../../../presentational';
import { AsthmaDataViewPreviewState, previewData } from './AsthmaDataView.previewData';
import { AsthmaAirQualities, AsthmaBiometrics } from '../../components';

export interface AsthmaDataViewProps {
    previewState?: AsthmaDataViewPreviewState;
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: AsthmaDataViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <TextBlock style={{marginTop: 32, marginBottom: 16}}>
            <h1>Data</h1>
        </TextBlock>
        <Card>
            <AsthmaBiometrics previewState={props.previewState ? previewData[props.previewState]?.biometricsPreviewState : undefined}/>
        </Card>
        <Card>
            <AsthmaAirQualities previewState={props.previewState ? previewData[props.previewState]?.airQualitiesPreviewState : undefined}/>
        </Card>
    </Layout>;
}