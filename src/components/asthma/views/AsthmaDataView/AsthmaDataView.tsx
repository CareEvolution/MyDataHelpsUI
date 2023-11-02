import React from 'react';
import { Card, Layout, Title } from '../../../presentational';
import { AsthmaAirQualities, AsthmaBiometrics } from '../../container';
import { AsthmaDataViewPreviewState, previewData } from './AsthmaDataView.previewData';
import { AsthmaViewTitle } from "../../presentational";

export interface AsthmaDataViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: AsthmaDataViewPreviewState;
}

export default function (props: AsthmaDataViewProps) {

    const onBiometricsClicked = (): void => {
        console.log('biometrics clicked');
    };

    const onAirQualitiesClicked = (): void => {
        console.log('biometrics clicked');
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <AsthmaViewTitle title="Data"/>
        <Card>
            <AsthmaBiometrics
                previewState={props.previewState ? previewData[props.previewState].biometricsPreviewState : undefined}
                onClick={() => onBiometricsClicked()}
            />
        </Card>
        <Card>
            <AsthmaAirQualities
                previewState={props.previewState ? previewData[props.previewState].airQualitiesPreviewState : undefined}
                onClick={() => onAirQualitiesClicked()}
            />
        </Card>
    </Layout>;
}
