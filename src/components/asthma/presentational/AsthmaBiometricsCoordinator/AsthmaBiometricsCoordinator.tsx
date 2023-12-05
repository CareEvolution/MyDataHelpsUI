import React from 'react';
import { asthmaDataService, getAsthmaBiometricTypeLabel, getAsthmaBiometricTypeUnits } from '../../helpers';
import { Data, DataCoordinator } from '../../../presentational';

export interface AsthmaBiometricsCoordinatorProps {
    previewState?: 'default';
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaBiometricsCoordinatorProps) {
    const loadData = async (): Promise<Record<string, Data>> => {
        if (props.previewState === 'default') {
            return {
                'preview': {
                    label: 'Resting HR',
                    value: 64,
                    units: 'BPM',
                    status: 'in-range'
                }
            }
        }

        let biometrics = await asthmaDataService.loadBiometrics();

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