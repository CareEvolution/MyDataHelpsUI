import React, { useState } from 'react';
import './AsthmaBiometrics.css';
import { AsthmaBiometric, AsthmaBiometricType } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, getAsthmaDataStatusColor, getAsthmaDataStatusText } from '../../helpers';
import { LoadingIndicator, SingleDataPoint } from '../../../presentational';
import { AsthmaBiometricsPreviewState, previewData } from './AsthmaBiometrics.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaBiometricsProps {
    previewState?: AsthmaBiometricsPreviewState;
    heartAndLungsUrl: string;
    activityUrl: string;
    sleepUrl: string;
    date?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaBiometricsProps) {
    const [loading, setLoading] = useState<boolean>(true);
    let [daytimeRestingHeartRate, setDaytimeRestingHeartRate] = useState<AsthmaBiometric>();
    let [nighttimeRestingHeartRate, setNighttimeRestingHeartRate] = useState<AsthmaBiometric>();
    let [respiratoryRate, setRespiratoryRate] = useState<AsthmaBiometric>();
    let [steps, setSteps] = useState<AsthmaBiometric>();
    let [sleepDisturbances, setSleepDisturbances] = useState<AsthmaBiometric>();
    let [daytimeBloodOxygenLevel, setDaytimeBloodOxygenLevel] = useState<AsthmaBiometric>();
    let [nighttimeBloodOxygenLevel, setNighttimeBloodOxygenLevel] = useState<AsthmaBiometric>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setDaytimeRestingHeartRate(previewData[props.previewState].daytimeRestingHeartRate);
            setNighttimeRestingHeartRate(previewData[props.previewState].nighttimeRestingHeartRate);
            setRespiratoryRate(previewData[props.previewState].respiratoryRate);
            setSteps(previewData[props.previewState].steps);
            setSleepDisturbances(previewData[props.previewState].sleepDisturbances);
            setDaytimeBloodOxygenLevel(previewData[props.previewState].daytimeBloodOxygenLevel);
            setNighttimeBloodOxygenLevel(previewData[props.previewState].nighttimeBloodOxygenLevel);
            setLoading(false);
            return;
        }

        let biometricsQuery = props.date ? asthmaDataService.loadBiometricsForDate(props.date) : asthmaDataService.loadBiometricsForControlStatus();

        biometricsQuery.then(biometrics => {
            setDaytimeRestingHeartRate(biometrics.find(b => b.type === 'daytime-resting-heart-rate'));
            setNighttimeRestingHeartRate(biometrics.find(b => b.type === 'nighttime-resting-heart-rate'));
            setRespiratoryRate(biometrics.find(b => b.type === 'respiratory-rate'));
            setSteps(biometrics.find(b => b.type === 'steps'));
            setSleepDisturbances(biometrics.find(b => b.type === 'sleep-disturbances'));
            setDaytimeBloodOxygenLevel(biometrics.find(b => b.type === 'daytime-blood-oxygen-level'));
            setNighttimeBloodOxygenLevel(biometrics.find(b => b.type === 'nighttime-blood-oxygen-level'));
            setLoading(false);
        });
    }, [], [props.previewState]);

    const onClick = (type: AsthmaBiometricType): void => {
        if (props.previewState) return;
        if (type === 'daytime-resting-heart-rate' || type === 'nighttime-resting-heart-rate' || type === 'respiratory-rate' || type === 'daytime-blood-oxygen-level' || type === 'nighttime-blood-oxygen-level') {
            MyDataHelps.openApplication(props.heartAndLungsUrl, {modal: true});
        } else if (type === 'steps') {
            MyDataHelps.openApplication(props.activityUrl, {modal: true});
        } else if (type === 'sleep-disturbances') {
            MyDataHelps.openApplication(props.sleepUrl, {modal: true});
        }
    };

    return <div className="mdhui-asthma-biometrics" ref={props.innerRef}>
        <div className="mdhui-asthma-biometrics-title">Health & Activity</div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-biometrics-data">
                <SingleDataPoint
                    label="Resting HR (Day)"
                    statusText={getAsthmaDataStatusText(daytimeRestingHeartRate!.status)}
                    statusColor={getAsthmaDataStatusColor(daytimeRestingHeartRate!.status)}
                    value={daytimeRestingHeartRate!.value}
                    units="BPM"
                    onClick={() => onClick('daytime-resting-heart-rate')}
                />
                <SingleDataPoint
                    label="Resting HR (Night)"
                    statusText={getAsthmaDataStatusText(nighttimeRestingHeartRate!.status)}
                    statusColor={getAsthmaDataStatusColor(nighttimeRestingHeartRate!.status)}
                    value={nighttimeRestingHeartRate!.value}
                    units="BPM"
                    onClick={() => onClick('nighttime-resting-heart-rate')}
                />
                <SingleDataPoint
                    label="Respiratory Rate"
                    statusText={getAsthmaDataStatusText(respiratoryRate!.status)}
                    statusColor={getAsthmaDataStatusColor(respiratoryRate!.status)}
                    value={respiratoryRate!.value}
                    units="BPM"
                    onClick={() => onClick('respiratory-rate')}
                />
                <SingleDataPoint
                    label="Steps"
                    statusText={getAsthmaDataStatusText(steps!.status)}
                    statusColor={getAsthmaDataStatusColor(steps!.status)}
                    value={steps!.value}
                    onClick={() => onClick('steps')}
                />
                <SingleDataPoint
                    label="Oxygen Saturation (Day)"
                    statusText={getAsthmaDataStatusText(daytimeBloodOxygenLevel!.status)}
                    statusColor={getAsthmaDataStatusColor(daytimeBloodOxygenLevel!.status)}
                    value={daytimeBloodOxygenLevel!.value ? daytimeBloodOxygenLevel!.value! * 100.0 : undefined}
                    onClick={() => onClick('daytime-blood-oxygen-level')}
                    units="%"
                />
                <SingleDataPoint
                    label="Oxygen Saturation (Night)"
                    statusText={getAsthmaDataStatusText(nighttimeBloodOxygenLevel!.status)}
                    statusColor={getAsthmaDataStatusColor(nighttimeBloodOxygenLevel!.status)}
                    value={nighttimeBloodOxygenLevel!.value ? nighttimeBloodOxygenLevel!.value * 100.0 : undefined}
                    onClick={() => onClick('nighttime-blood-oxygen-level')}
                    units="%"
                />
                <SingleDataPoint
                    label="Sleep Disturbances"
                    statusText={getAsthmaDataStatusText(sleepDisturbances!.status)}
                    statusColor={getAsthmaDataStatusColor(sleepDisturbances!.status)}
                    value={sleepDisturbances!.value}
                    onClick={() => onClick('sleep-disturbances')}
                />
            </div>
        }
    </div>;
}