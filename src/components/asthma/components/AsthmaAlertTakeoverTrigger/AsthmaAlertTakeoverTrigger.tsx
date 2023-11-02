import React from 'react';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add } from 'date-fns';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaAlertTakeoverTriggerProps {
    previewState?: boolean;
    heartAndLungsUrl: string;
    activityUrl: string;
    sleepUrl: string;
    airQualityUrl: string;
    alertTakeoverUrl: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaAlertTakeoverTriggerProps) {
    const showAlertTakeover = (alertTakeover: string): void => {
        if (alertTakeover === 'DaytimeRestingHeartRate' || alertTakeover === 'NighttimeRestingHeartRate' || alertTakeover === 'RespiratoryRate' || alertTakeover === 'DaytimeBloodOxygenLevel' || alertTakeover === 'NighttimeBloodOxygenLevel') {
            MyDataHelps.openApplication(props.heartAndLungsUrl + '?alert=' + alertTakeover, {modal: true});
        } else if (alertTakeover === 'Steps') {
            MyDataHelps.openApplication(props.activityUrl + '?alert=' + alertTakeover, {modal: true});
        } else if (alertTakeover === 'SleepDisturbances') {
            MyDataHelps.openApplication(props.sleepUrl + '?alert=' + alertTakeover, {modal: true});
        } else if (alertTakeover === 'HomeAirQuality' || alertTakeover === 'WorkAirQuality') {
            MyDataHelps.openApplication(props.airQualityUrl + '?alert=' + alertTakeover, {modal: true});
        } else if (alertTakeover.includes(',')) {
            MyDataHelps.openApplication(props.alertTakeoverUrl, {modal: true});
        }
    };

    useInitializeView(() => {
        if (props.previewState) return;

        asthmaDataService.loadAndClearAlertTakeover().then(alertTakeover => {
            if (alertTakeover) {
                asthmaDataService.loadLogEntries(add(new Date(), {days: -2})).then(entries => {
                    if (!entries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(new Date()))) {
                        showAlertTakeover(alertTakeover);
                    }
                });
            }
        });
    });

    return null;
}