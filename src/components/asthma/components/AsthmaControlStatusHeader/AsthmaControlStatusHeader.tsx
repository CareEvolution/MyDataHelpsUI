import React, { useState } from 'react';
import './AsthmaControlStatusHeader.css';
import { asthmaDataService, caregiverVariableLanguage, computeAsthmaControlState, getAsthmaAirQualityDescriptionText } from '../../helpers';
import { AsthmaAirQuality, AsthmaBiometric, AsthmaControlState, AsthmaParticipant } from '../../model';
import { language, useInitializeView } from '../../../../helpers';
import { highlightInnerText } from "../../helpers/asthma-formatters";
import { add } from 'date-fns';
import { AsthmaControlStatusHeaderPreviewState, previewData } from './AsthmaControlStatusHeader.previewData';

export interface AsthmaControlStatusHeaderProps {
    previewState?: 'loading' | AsthmaControlStatusHeaderPreviewState;
    participant: AsthmaParticipant;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaControlStatusHeaderProps) {
    let [loading, setLoading] = useState<boolean>(true);
    let [controlState, setControlState] = useState<AsthmaControlState>();
    let [biometrics, setBiometrics] = useState<AsthmaBiometric[]>();
    let [airQualities, setAirQualities] = useState<AsthmaAirQuality[]>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            setControlState(undefined);
            return;
        }
        if (props.previewState) {
            setControlState(previewData[props.previewState].controlState);
            setBiometrics(previewData[props.previewState].biometrics);
            setAirQualities(previewData[props.previewState].airQualities);
            setLoading(false);
            return;
        }

        let now = new Date();

        asthmaDataService.loadLogEntries(add(new Date(now), { days: -10 })).then(logEntries => {
            if (props.participant.hasPairedDevice() && props.participant.hasEstablishedBaseline()) {
                let biometricsLoader = asthmaDataService.loadBiometricsForControlStatus();
                let airQualityLoaders = asthmaDataService.loadAirQualitiesForControlStatus(props.participant.getHomeAirQualityZipCode(), props.participant.getWorkAirQualityZipCode());
                Promise.all([biometricsLoader, airQualityLoaders]).then(values => {
                    setControlState(computeAsthmaControlState(logEntries, now));
                    setBiometrics(values[0]);
                    setAirQualities(values[1]);
                    setLoading(false);
                });
            } else {
                setControlState(computeAsthmaControlState(logEntries, now));
                setLoading(false);
            }
        });
    }, [], [props.previewState]);

    if (loading && !controlState) {
        return null;
    }

    const getAbnormalRangeAlertDisplay = (alertText: string): React.JSX.Element => {
        const formattedText = highlightInnerText(alertText, 'mdhui-asthma-control-status-header-data-out-of-range');

        return <div className="mdhui-asthma-control-status-header-text">
            <p>{formattedText} {language('asthma-control-status-header-complete-daily-entry')}</p>
        </div>;
    }

    const getNoDataDisplay = (): React.JSX.Element | null => {
        if (props.participant.hasPairedDevice() && props.participant.hasEstablishedBaseline()) {
            if ((biometrics!.filter(b => b.status === 'out-of-range').length + airQualities!.filter(q => q.status === 'out-of-range').length) > 1) {
                return getAbnormalRangeAlertDisplay(language('asthma-control-status-header-multiple-out-of-range'));
            }

            if (biometrics!.find(b => b.type === 'daytime-resting-heart-rate' || b.type === 'nighttime-resting-heart-rate')?.status === 'out-of-range') {
                return getAbnormalRangeAlertDisplay(language('asthma-control-status-header-abnormal-heart-rate'));
            }

            if (biometrics!.find(b => b.type === 'respiratory-rate')?.status === 'out-of-range') {
                return getAbnormalRangeAlertDisplay(language('asthma-control-status-header-abnormal-respiratory-rate'));
            }
            
            if (biometrics!.find(b => b.type === 'steps')?.status === 'out-of-range') {
                return getAbnormalRangeAlertDisplay(language('asthma-control-status-header-abnormal-steps'));
            }

            if (biometrics!.find(b => b.type === 'sleep-disturbances')?.status === 'out-of-range') {
                return getAbnormalRangeAlertDisplay(language('asthma-control-status-header-abnormal-sleep'));
            }

            if (biometrics!.find(b => b.type === 'daytime-blood-oxygen-level' || b.type === 'nighttime-blood-oxygen-level')?.status === 'out-of-range') {
                return getAbnormalRangeAlertDisplay(language('asthma-control-status-header-abnormal-blood-oxygen'));
            }

            if (airQualities!.find(q => q.type === 'home')?.status === 'out-of-range') {
                const prompt = language('asthma-control-status-header-abnormal-home-aqi', undefined, { "aqi" : getAsthmaAirQualityDescriptionText(airQualities!.find(q => q.type === 'home')?.description) || "" });
                return getAbnormalRangeAlertDisplay(prompt);
            }

            if (airQualities!.find(q => q.type === 'work')?.status === 'out-of-range') {
                const prompt = language('asthma-control-status-header-abnormal-work-aqi', undefined, { "aqi" : getAsthmaAirQualityDescriptionText(airQualities!.find(q => q.type === 'work')?.description) || "" });
                return getAbnormalRangeAlertDisplay(prompt);
            }
        }

        return <div className="mdhui-asthma-control-status-header-text">
            <p>{caregiverVariableLanguage(props.participant, 'asthma-control-status-header-no-data')}</p>
        </div>;
    };

    const getStatDisplay = (label: string, value?: number) => {
        if (!value) return null;

        return <div className="mdhui-asthma-control-status-header-not-controlled-stat">
            <div className="mdhui-asthma-control-status-header-not-controlled-stat-value">{value}x</div>
            <div className="mdhui-asthma-control-status-header-not-controlled-stat-label">{label}</div>
        </div>;
    };

    return <div className="mdhui-asthma-control-status-header" ref={props.innerRef}>
        {controlState!.status === 'no-data' && getNoDataDisplay()}
        {controlState!.status === 'not-determined' &&
            <div className="mdhui-asthma-control-status-header-text">
                <p>{caregiverVariableLanguage(props.participant, 'asthma-control-status-header-not-determined')}</p>
            </div>
        }
        {controlState!.status === 'controlled' &&
            <div className="mdhui-asthma-control-status-header-text">
                <p>{highlightInnerText(caregiverVariableLanguage(props.participant, 'asthma-control-status-header-controlled'), 'mdhui-asthma-control-status-header-controlled')}</p>
            </div>
        }
        {controlState!.status === 'not-controlled' &&
            <div>
                <div className="mdhui-asthma-control-status-header-text">
                    <p>{highlightInnerText(caregiverVariableLanguage(props.participant, 'asthma-control-status-header-not-controlled'), 'mdhui-asthma-control-status-header-not-controlled')}</p>
                </div>
                <div className="mdhui-asthma-control-status-header-not-controlled-stats">
                    {getStatDisplay(language('asthma-control-status-header-not-controlled-stat-symptom-days'), controlState!.symptomDaysPast7)}
                    {getStatDisplay(language('asthma-control-status-header-not-controlled-stat-rescue-inhaler'), controlState!.inhalerUseDaysPast7)}
                    {getStatDisplay(language('asthma-control-status-header-not-controlled-stat-limited-activity'), controlState!.limitedActivityDaysPast7)}
                    {getStatDisplay(language('asthma-control-status-header-not-controlled-stat-awakenings'), controlState!.nighttimeAwakeningDaysPast7)}
                </div>
            </div>
        }
    </div>;
}