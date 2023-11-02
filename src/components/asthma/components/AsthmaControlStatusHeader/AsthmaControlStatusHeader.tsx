import React, { useState } from 'react';
import './AsthmaControlStatusHeader.css';
import { asthmaDataService, computeAsthmaControlState } from '../../helpers';
import { AsthmaAirQuality, AsthmaBiometric, AsthmaControlState, AsthmaParticipant } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { add } from 'date-fns';
import { AsthmaControlStatusHeaderPreviewState, previewData } from './AsthmaControlStatusHeader.previewData';

export interface AsthmaControlStatusHeaderProps {
    previewState?: AsthmaControlStatusHeaderPreviewState;
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

        if (props.previewState) {
            setControlState(previewData[props.previewState].controlState);
            setBiometrics(previewData[props.previewState].biometrics);
            setAirQualities(previewData[props.previewState].airQualities);
            setLoading(false);
            return;
        }

        let now = new Date();

        asthmaDataService.loadLogEntries(add(new Date(now), {days: -10})).then(logEntries => {
            setControlState(computeAsthmaControlState(logEntries, now));
            if (props.participant.hasPairedDevice() && props.participant.hasEstablishedBaseline()) {
                let biometricsLoader = asthmaDataService.loadBiometricsForControlStatus();
                let airQualityLoaders = asthmaDataService.loadAirQualitiesForControlStatus(props.participant.getHomeAirQualityZipCode(), props.participant.getWorkAirQualityZipCode());

                Promise.all([biometricsLoader, airQualityLoaders]).then(values => {
                    setBiometrics(values[0]);
                    setAirQualities(values[1]);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    }, [], [props.previewState]);

    if (loading && !controlState) {
        return null;
    }

    const getNoDataDisplay = (): React.JSX.Element | null => {
        if ((biometrics!.filter(b => b.status === 'out-of-range').length + airQualities!.filter(q => q.status === 'out-of-range').length) > 1) {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Multiple data points are <span className="mdhui-asthma-control-status-header-data-out-of-range">outside your normal levels</span>. Complete your daily entry.</p>
            </div>;
        }

        if (biometrics!.find(b => b.type === 'daytime-resting-heart-rate' || b.type === 'nighttime-resting-heart-rate')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your resting heart rate is <span className="mdhui-asthma-control-status-header-data-out-of-range">above your normal level</span>. Complete your daily entry.</p>
            </div>;
        }

        if (biometrics!.find(b => b.type === 'respiratory-rate')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your respiratory rate is <span className="mdhui-asthma-control-status-header-data-out-of-range">above your normal level</span>. Complete your daily entry.</p>
            </div>;
        }

        if (biometrics!.find(b => b.type === 'steps')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your activity is <span className="mdhui-asthma-control-status-header-data-out-of-range">below your normal levels</span>. Complete your daily entry.</p>
            </div>;
        }

        if (biometrics!.find(b => b.type === 'sleep-disturbances')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your sleep disturbances are <span className="mdhui-asthma-control-status-header-data-out-of-range">above your normal level</span>. Complete your daily entry.</p>
            </div>;
        }

        if (biometrics!.find(b => b.type === 'daytime-blood-oxygen-level' || b.type === 'nighttime-blood-oxygen-level')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your blood oxygen level is <span className="mdhui-asthma-control-status-header-data-out-of-range">below your normal level</span>. Complete your daily entry.</p>
            </div>;
        }

        if (airQualities!.find(q => q.type === 'home')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your home Air Quality Index is <span className="mdhui-asthma-control-status-header-data-out-of-range">{airQualities!.find(q => q.type === 'home')?.description}</span>. Complete your daily entry.</p>
            </div>;
        }

        if (airQualities!.find(q => q.type === 'work')?.status === 'out-of-range') {
            return <div className="mdhui-asthma-control-status-header-text">
                <p>Your work Air Quality Index is <span className="mdhui-asthma-control-status-header-data-out-of-range">{airQualities!.find(q => q.type === 'work')?.description}</span>. Complete your daily entry.</p>
            </div>;
        }

        return <div className="mdhui-asthma-control-status-header-text">
            <p>Add a daily entry to assess your asthma control.</p>
        </div>;
    };

    const getStatDisplay = (label: string, value?: number): React.JSX.Element | null => {
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
                <p>More daily entries needed to assess your asthma control.</p>
            </div>
        }
        {controlState!.status === 'controlled' &&
            <div className="mdhui-asthma-control-status-header-text">
                <p>Based on your entries, your asthma is <span className="mdhui-asthma-control-status-header-controlled">under control.</span></p>
            </div>
        }
        {controlState!.status === 'not-controlled' &&
            <div>
                <div className="mdhui-asthma-control-status-header-text">
                    <p>Based on your entries, your asthma is <span className="mdhui-asthma-control-status-header-not-controlled">not under control.</span></p>
                </div>
                <div className="mdhui-asthma-control-status-header-not-controlled-stats">
                    {getStatDisplay('Symptom days', controlState!.symptomDaysPast7)}
                    {getStatDisplay('Rescue inhaler', controlState!.inhalerUseDaysPast7)}
                    {getStatDisplay('Limited activity', controlState!.limitedActivityDaysPast7)}
                    {getStatDisplay('Awakenings', controlState!.nighttimeAwakeningDaysPast7)}
                </div>
            </div>
        }
    </div>;
}