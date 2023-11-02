import React, { useState } from 'react';
import './AsthmaAirQualities.css';
import { AsthmaAirQuality } from '../../model';
import AsthmaDataSummary from '../AsthmaDataSummary';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService } from '../../helpers';
import { LoadingIndicator } from '../../../presentational';
import { AsthmaAirQualitiesPreviewState, previewData } from './AsthmaAirQualities.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaAirQualitiesProps {
    previewState?: AsthmaAirQualitiesPreviewState;
    airQualityUrl: string;
    date?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaAirQualitiesProps) {
    const [loading, setLoading] = useState<boolean>(true);
    let [homeAirQuality, setHomeAirQuality] = useState<AsthmaAirQuality>();
    let [workAirQuality, setWorkAirQuality] = useState<AsthmaAirQuality>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setHomeAirQuality(previewData[props.previewState].homeAirQuality);
            setWorkAirQuality(previewData[props.previewState].workAirQuality);
            setLoading(false);
            return;
        }

        asthmaDataService.loadAirQualitiesForDate(props.date ?? new Date()).then(airQualities => {
            setHomeAirQuality(airQualities.find(aq => aq.type === 'home'));
            setWorkAirQuality(airQualities.find(aq => aq.type === 'work'));
            setLoading(false);
        });
    });

    const onClick = (): void => {
        if (props.previewState) return;
        MyDataHelps.openApplication(props.airQualityUrl, {modal: true});
    };

    return <div className="mdhui-asthma-air-qualities" ref={props.innerRef}>
        <div className="mdhui-asthma-air-qualities-title">Air Quality</div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-air-qualities-data">
                <AsthmaDataSummary
                    label="AQI (Home)"
                    status={homeAirQuality!.status}
                    statusText={homeAirQuality!.description}
                    value={homeAirQuality!.value}
                    onClick={() => onClick()}
                />
                <AsthmaDataSummary
                    label="AQI (Work)"
                    status={workAirQuality!.status}
                    statusText={workAirQuality!.description}
                    value={workAirQuality!.value}
                    onClick={() => onClick()}
                />
            </div>
        }
    </div>;
}