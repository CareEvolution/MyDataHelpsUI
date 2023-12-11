import React, { useState } from 'react';
import './AsthmaAirQualities.css';
import { AsthmaAirQuality } from '../../model';
import AsthmaDataSummary from '../AsthmaDataSummary';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, getAsthmaAirQualityTypeLabel } from '../../helpers';
import { LoadingIndicator } from '../../../presentational';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AsthmaAirQualitiesPreviewState, previewData } from './AsthmaAirQualities.previewData';

export interface AsthmaAirQualitiesProps {
    previewState?: AsthmaAirQualitiesPreviewState;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaAirQualitiesProps) {
    const [loading, setLoading] = useState<boolean>(true);
    let [airQualities, setAirQualities] = useState<AsthmaAirQuality[]>([]);

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setAirQualities(previewData[props.previewState].airQualities);
            setLoading(false);
            return;
        }

        asthmaDataService.loadAirQualities().then(airQualities => {
            setAirQualities(airQualities);
            setLoading(false);
        });
    });

    const onClick = (): void => {
        if (props.previewState) return;

        // TODO: Implement this.
        console.log('air qualities clicked');
    };

    return <div className="mdhui-asthma-air-qualities" ref={props.innerRef} onClick={() => onClick()}>
        <div className="mdhui-asthma-air-qualities-header">
            <div className="mdhui-asthma-air-qualities-header-title">Air Quality</div>
            <div className="mdhui-asthma-air-qualities-header-action">
                <FontAwesomeIcon icon={faChevronRight as IconProp}/>
            </div>
        </div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-air-qualities-data">
                {airQualities.map((airQuality: AsthmaAirQuality, index: number) => {
                    return <AsthmaDataSummary
                        key={index}
                        label={getAsthmaAirQualityTypeLabel(airQuality.type)}
                        status={airQuality.status}
                        statusText={airQuality.description}
                        value={airQuality.value}
                    />;
                })}
            </div>
        }
    </div>;
}