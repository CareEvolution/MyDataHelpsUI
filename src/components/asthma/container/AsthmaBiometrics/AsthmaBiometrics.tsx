import React, { useState } from 'react';
import './AsthmaBiometrics.css';
import { AsthmaBiometric } from '../../model';
import AsthmaDataSummary from '../../presentational/AsthmaDataSummary';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, getAsthmaBiometricTypeLabel, getAsthmaBiometricTypeUnits } from '../../helpers';
import LoadingIndicator from '../../../presentational/LoadingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AsthmaBiometricsPreviewState, previewData } from './AsthmaBiometrics.previewData';

export interface AsthmaBiometricsProps {
    previewState?: AsthmaBiometricsPreviewState;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaBiometricsProps) {
    const [loading, setLoading] = useState<boolean>(true);
    let [biometrics, setBiometrics] = useState<AsthmaBiometric[]>([]);

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setBiometrics(previewData[props.previewState].biometrics);
            setLoading(false);
            return;
        }

        let now = new Date();

        asthmaDataService.loadBiometrics().then(biometrics => {
            setBiometrics(biometrics);
            setLoading(false);
        });
    });

    const onClick = (): void => {
        // TODO: Implement this.
        console.log('biometrics clicked');
    };

    return <div className="mdhui-asthma-biometrics" ref={props.innerRef} onClick={() => onClick()}>
        <div className="mdhui-asthma-biometrics-header">
            <div className="mdhui-asthma-biometrics-header-title">Health & Activity</div>
            <div className="mdhui-asthma-biometrics-header-action">
                <FontAwesomeIcon icon={faChevronRight as IconProp}/>
            </div>
        </div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-biometrics-data">
                {biometrics.map((biometric: AsthmaBiometric, index: number) => {
                    return <AsthmaDataSummary
                        key={index}
                        label={getAsthmaBiometricTypeLabel(biometric.type)}
                        status={biometric.status}
                        value={biometric.value}
                        units={getAsthmaBiometricTypeUnits(biometric.type)}
                    />;
                })}
            </div>
        }
    </div>;
}