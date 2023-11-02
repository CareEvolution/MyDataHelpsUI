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
    editZipCodesSurveyName?: string;
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

        asthmaDataService.loadParticipant().then(participant => {
            let loadAirQualities = props.date ?
                asthmaDataService.loadAirQualitiesForDate(props.date) :
                asthmaDataService.loadAirQualitiesForControlStatus(participant.getHomeAirQualityZipCode(), participant.getWorkAirQualityZipCode());

            loadAirQualities.then(airQualities => {
                setHomeAirQuality(airQualities.find(aq => aq.type === 'home'));
                setWorkAirQuality(airQualities.find(aq => aq.type === 'work'));
                setLoading(false);
            });
        });
    }, [], [props.previewState]);

    const onSetup = (): void => {
        if (props.previewState || !props.editZipCodesSurveyName) return;
        MyDataHelps.startSurvey(props.editZipCodesSurveyName);
    }

    const onClick = (airQuality: AsthmaAirQuality): void => {
        if (props.previewState) return;
        if (airQuality.status === 'not-configured' && props.editZipCodesSurveyName) {
            MyDataHelps.startSurvey(props.editZipCodesSurveyName);
        } else {
            MyDataHelps.openApplication(props.airQualityUrl, {modal: true});
        }
    };

    return <div className="mdhui-asthma-air-qualities" ref={props.innerRef}>
        <div className="mdhui-asthma-air-qualities-header">
            <div className="mdhui-asthma-air-qualities-title">Air Quality</div>
            {props.editZipCodesSurveyName &&
                <UnstyledButton onClick={() => onSetup()}>
                    <div className="mdhui-asthma-air-qualities-settings">
                        <FontAwesomeIcon icon={faGear}/>
                    </div>
                </UnstyledButton>
            }
        </div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-air-qualities-data">
                <AsthmaDataSummary
                    label="AQI (Home)"
                    status={homeAirQuality!.status}
                    statusText={homeAirQuality!.description}
                    value={homeAirQuality!.value}
                    onClick={() => onClick(homeAirQuality!)}
                />
                <AsthmaDataSummary
                    label="AQI (Work)"
                    status={workAirQuality!.status}
                    statusText={workAirQuality!.description}
                    value={workAirQuality!.value}
                    onClick={() => onClick(workAirQuality!)}
                />
            </div>
        }
    </div>;
}