import React, { useState } from 'react';
import './AsthmaAirQualities.css';
import { AsthmaAirQuality } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, getAsthmaDataStatusColor, getAsthmaDataStatusText } from '../../helpers';
import { LoadingIndicator, SingleDataPoint, UnstyledButton } from '../../../presentational';
import { AsthmaAirQualitiesPreviewState, previewData } from './AsthmaAirQualities.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import language from '../../../../helpers/language';

export interface AsthmaAirQualitiesProps {
    previewState?: 'loading' | AsthmaAirQualitiesPreviewState;
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

        if (props.previewState === 'loading') {
            return;
        }
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

    const getSetupComponent = (label: string) => {
        return <UnstyledButton onClick={() => onSetup()}>
            <div className="mdhui-asthma-air-qualities-setup">
                <div className="mdhui-asthma-air-qualities-setup-button">{language('asthma-air-qualities-setup-button-text')}</div>
                <div className="mdhui-asthma-air-qualities-setup-label">{label}</div>
            </div>
        </UnstyledButton>;
    };

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
            <div className="mdhui-asthma-air-qualities-title">{language('asthma-air-qualities-title')}</div>
            {props.editZipCodesSurveyName &&
                <UnstyledButton className="mdhui-asthma-air-qualities-settings" onClick={() => onSetup()}>
                    <FontAwesomeIcon icon={faGear}/>
                </UnstyledButton>
            }
        </div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-air-qualities-data">
                {homeAirQuality!.status === 'not-configured' && getSetupComponent(language('asthma-air-qualities-home-aqi-label'))}
                {homeAirQuality!.status !== 'not-configured' &&
                    <SingleDataPoint
                        label={language('asthma-air-qualities-home-aqi-label')}
                        statusText={homeAirQuality!.description ?? getAsthmaDataStatusText(homeAirQuality!.status)}
                        statusColor={getAsthmaDataStatusColor(homeAirQuality!.status)}
                        value={homeAirQuality!.value?.toLocaleString()}
                        onClick={() => onClick(homeAirQuality!)}
                    />
                }
                {workAirQuality!.status === 'not-configured' && getSetupComponent(language('asthma-air-qualities-work-aqi-label'))}
                {workAirQuality!.status !== 'not-configured' &&
                    <SingleDataPoint
                        label={language('asthma-air-qualities-work-aqi-label')}
                        statusText={workAirQuality!.description ?? getAsthmaDataStatusText(workAirQuality!.status)}
                        statusColor={getAsthmaDataStatusColor(workAirQuality!.status)}
                        value={workAirQuality!.value?.toLocaleString()}
                        onClick={() => onClick(workAirQuality!)}
                    />
                }
            </div>
        }
    </div>;
}