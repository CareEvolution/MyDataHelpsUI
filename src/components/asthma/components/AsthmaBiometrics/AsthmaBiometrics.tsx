import React, { useState } from 'react';
import './AsthmaBiometrics.css';
import { AsthmaBiometric, AsthmaBiometricType } from '../../model';
import AsthmaDataSummary from '../AsthmaDataSummary';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService } from '../../helpers';
import { LoadingIndicator } from '../../../presentational';
import { AsthmaBiometricsPreviewState, previewData } from './AsthmaBiometrics.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaBiometricsProps {
    previewState?: AsthmaBiometricsPreviewState;
    heartAndLungsUrl: string;
    stepsUrl: string;
    sleepUrl: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaBiometricsProps) {
    const [loading, setLoading] = useState<boolean>(true);
    let [daytimeRestingHeartRate, setDaytimeRestingHeartRate] = useState<AsthmaBiometric>();
    let [nighttimeRestingHeartRate, setNighttimeRestingHeartRate] = useState<AsthmaBiometric>();
    let [respiratoryRate, setRespiratoryRate] = useState<AsthmaBiometric>();
    let [activity, setActivity] = useState<AsthmaBiometric>();
    let [sleep, setSleep] = useState<AsthmaBiometric>();
    let [daytimeBloodOxygenLevel, setDaytimeBloodOxygenLevel] = useState<AsthmaBiometric>();
    let [nighttimeBloodOxygenLevel, setNighttimeBloodOxygenLevel] = useState<AsthmaBiometric>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setDaytimeRestingHeartRate(previewData[props.previewState].daytimeRestingHeartRate);
            setNighttimeRestingHeartRate(previewData[props.previewState].nighttimeRestingHeartRate);
            setRespiratoryRate(previewData[props.previewState].respiratoryRate);
            setActivity(previewData[props.previewState].activity);
            setSleep(previewData[props.previewState].sleep);
            setDaytimeBloodOxygenLevel(previewData[props.previewState].daytimeBloodOxygenLevel);
            setNighttimeBloodOxygenLevel(previewData[props.previewState].nighttimeBloodOxygenLevel);
            setLoading(false);
            return;
        }

        asthmaDataService.loadBiometrics().then(biometrics => {
            setDaytimeRestingHeartRate(biometrics.find(b => b.type === 'daytime-resting-heart-rate'));
            setNighttimeRestingHeartRate(biometrics.find(b => b.type === 'nighttime-resting-heart-rate'));
            setRespiratoryRate(biometrics.find(b => b.type === 'respiratory-rate'));
            setActivity(biometrics.find(b => b.type === 'activity'));
            setSleep(biometrics.find(b => b.type === 'sleep'));
            setDaytimeBloodOxygenLevel(biometrics.find(b => b.type === 'daytime-blood-oxygen-level'));
            setNighttimeBloodOxygenLevel(biometrics.find(b => b.type === 'nighttime-blood-oxygen-level'));
            setLoading(false);
        });
    });

    const onClick = (type: AsthmaBiometricType): void => {
        if (props.previewState) return;
        if (type === 'daytime-resting-heart-rate' || type === 'nighttime-resting-heart-rate' || type === 'respiratory-rate' || type === 'daytime-blood-oxygen-level' || type === 'nighttime-blood-oxygen-level') {
            MyDataHelps.openApplication(props.heartAndLungsUrl, {modal: true});
        } else if (type === 'activity') {
            MyDataHelps.openApplication(props.stepsUrl, {modal: true});
        } else if (type === 'sleep') {
            MyDataHelps.openApplication(props.sleepUrl, {modal: true});
        }
    };

    return <div className="mdhui-asthma-biometrics" ref={props.innerRef}>
        <div className="mdhui-asthma-biometrics-title">Health & Activity</div>
        {loading && <LoadingIndicator/>}
        {!loading &&
            <div className="mdhui-asthma-biometrics-data">
                <AsthmaDataSummary
                    label="Resting HR (Day)"
                    status={daytimeRestingHeartRate!.status}
                    value={daytimeRestingHeartRate!.value}
                    units="BPM"
                    onClick={() => onClick('daytime-resting-heart-rate')}
                />
                <AsthmaDataSummary
                    label="Resting HR (Night)"
                    status={nighttimeRestingHeartRate!.status}
                    value={nighttimeRestingHeartRate!.value}
                    units="BPM"
                    onClick={() => onClick('nighttime-resting-heart-rate')}
                />
                <AsthmaDataSummary
                    label="Respiratory Rate"
                    status={respiratoryRate!.status}
                    value={respiratoryRate!.value}
                    units="BPM"
                    onClick={() => onClick('respiratory-rate')}
                />
                <AsthmaDataSummary
                    label="Steps"
                    status={activity!.status}
                    value={activity!.value}
                    onClick={() => onClick('activity')}
                />
                <AsthmaDataSummary
                    label="Sleep Disturbances"
                    status={sleep!.status}
                    value={sleep!.value}
                    onClick={() => onClick('sleep')}
                />
                <AsthmaDataSummary
                    label="Oxygen Saturation (Day)"
                    status={daytimeBloodOxygenLevel!.status}
                    value={daytimeBloodOxygenLevel!.value}
                    onClick={() => onClick('daytime-blood-oxygen-level')}
                    units="%"
                />
                <AsthmaDataSummary
                    label="Oxygen Saturation (Night)"
                    status={nighttimeBloodOxygenLevel!.status}
                    value={nighttimeBloodOxygenLevel!.value}
                    onClick={() => onClick('nighttime-blood-oxygen-level')}
                    units="%"
                />
            </div>
        }
    </div>;
}