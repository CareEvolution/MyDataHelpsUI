import React, { useState } from 'react';
import './AsthmaAirQualities.css';
import { AsthmaAirQuality } from '../../model';
import AsthmaDataSummary from '../AsthmaDataSummary';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService } from '../../helpers';
import { LoadingIndicator, UnstyledButton } from '../../../presentational';
import { AsthmaAirQualitiesPreviewState, previewData } from './AsthmaAirQualities.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export interface AsthmaAirQualitiesProps {
    previewState?: AsthmaAirQualitiesPreviewState;
    editZipCodesSurveyName: string;
    airQualityUrl: string;
    date?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaAirQualitiesProps) {
    const [loading, setLoading] = useState<boolean>(true);
    let [homeAirQualityZipCode, setHomeAirQualityZipCode] = useState<string>();
    let [homeAirQuality, setHomeAirQuality] = useState<AsthmaAirQuality>();
    let [workAirQualityZipCode, setWorkAirQualityZipCode] = useState<string>();
    let [workAirQuality, setWorkAirQuality] = useState<AsthmaAirQuality>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setHomeAirQualityZipCode(previewData[props.previewState].homeAirQualityZipCode);
            setHomeAirQuality(previewData[props.previewState].homeAirQuality);
            setWorkAirQualityZipCode(previewData[props.previewState].workAirQualityZipCode);
            setWorkAirQuality(previewData[props.previewState].workAirQuality);
            setLoading(false);
            return;
        }

        let loadParticipant = asthmaDataService.loadParticipant();
        let loadAirQualities = props.date ? asthmaDataService.loadAirQualitiesForDate(props.date) : asthmaDataService.loadAirQualitiesForControlStatus();

        Promise.all([loadParticipant, loadAirQualities]).then(([participant, airQualities]) => {
            setHomeAirQualityZipCode(participant.getHomeAirQualityZipCode());
            setHomeAirQuality(airQualities.find(aq => aq.type === 'home'));
            setWorkAirQualityZipCode(participant.getWorkAirQualityZipCode());
            setWorkAirQuality(airQualities.find(aq => aq.type === 'work'));
            setLoading(false);
        });
    }, [], [props.previewState]);

    const onSetup = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.editZipCodesSurveyName);
    }

    const onClick = (): void => {
        if (props.previewState) return;
        MyDataHelps.openApplication(props.airQualityUrl, {modal: true});
    };

    return <div className="mdhui-asthma-air-qualities" ref={props.innerRef}>
        <div className="mdhui-asthma-air-qualities-header">
            <div className="mdhui-asthma-air-qualities-title">Air Quality</div>
            <UnstyledButton onClick={() => onSetup()}>
                <div className="mdhui-asthma-air-qualities-settings">
                    <FontAwesomeIcon icon={faGear}/>
                </div>
            </UnstyledButton>
        </div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-air-qualities-data">
                <AsthmaDataSummary
                    label="AQI (Home)"
                    requiresSetup={!homeAirQualityZipCode}
                    status={homeAirQuality!.status}
                    statusText={homeAirQuality!.description}
                    value={homeAirQuality!.value}
                    onClick={homeAirQualityZipCode ? () => onClick() : () => onSetup()}
                />
                <AsthmaDataSummary
                    label="AQI (Work)"
                    requiresSetup={!workAirQualityZipCode}
                    status={workAirQuality!.status}
                    statusText={workAirQuality!.description}
                    value={workAirQuality!.value}
                    onClick={workAirQualityZipCode ? () => onClick() : () => onSetup()}
                />
            </div>
        }
    </div>;
}