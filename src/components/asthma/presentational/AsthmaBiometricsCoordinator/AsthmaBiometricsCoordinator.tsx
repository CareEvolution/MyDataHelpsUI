import React from 'react';
import { asthmaDataService, getAsthmaBiometricTypeLabel, getAsthmaBiometricTypeUnits } from '../../helpers';
import { Data, DataCoordinator } from '../../../presentational';
import { AsthmaBiometric } from '../../model';
import { AsthmaBiometricsPreviewState, previewData } from './AsthmaBiometricsCoordinator.previewData';

export interface AsthmaBiometricsCoordinatorProps {
    previewState?: AsthmaBiometricsPreviewState;
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaBiometricsCoordinatorProps) {
    const loadData = async (): Promise<Record<string, Data>> => {

        let biometrics: AsthmaBiometric[];
        if (props.previewState) {
            biometrics = previewData[props.previewState].biometrics;
        } else {
            biometrics = await asthmaDataService.loadBiometrics();
        }

        let data: Record<string, Data> = {};
        biometrics.forEach(biometric => {
            data[biometric.type] = {
                label: getAsthmaBiometricTypeLabel(biometric.type),
                status: biometric.status,
                value: biometric.value,
                units: getAsthmaBiometricTypeUnits(biometric.type)
            }
        })

        return data;
    };

    return <DataCoordinator loadData={loadData} children={props.children} innerRef={props.innerRef}/>;
}