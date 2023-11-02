import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { daytimeBloodOxygenLevelDataProvider, daytimeRestingHeartRateDataProvider, nighttimeBloodOxygenLevelDataProvider, nighttimeRestingHeartRateDataProvider, randomDataProvider, respiratoryRateDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice, AsthmaBarChart } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';
import { useInitializeView } from "../../../../helpers/Initialization";
import { asthmaDataService, isBloodOxygenLevelWithinRange, isDaytimeRestingHeartRateWithinRange, isNighttimeRestingHeartRateWithinRange, isRespiratoryRateWithinRange } from "../../helpers";

const DaytimeRestingHeartRateDailyDataType = 'Asthma.DaytimeRestingHeartRate';
const NighttimeRestingHeartRateDailyDataType = 'Asthma.NighttimeRestingHeartRate';
const RespiratoryRateDailyDataType = 'Asthma.RespiratoryRate';
const DaytimeBloodOxygenLevelDailyDataType = 'Asthma.DaytimeBloodOxygenLevel';
const NighttimeBloodOxygenLevelDailyDataType = 'Asthma.NighttimeBloodOxygenLevel';

registerDailyDataProvider(DaytimeRestingHeartRateDailyDataType, daytimeRestingHeartRateDataProvider, simpleAvailabilityCheck('Project', ['DaytimeRestingHeartRate']));
registerDailyDataProvider(NighttimeRestingHeartRateDailyDataType, nighttimeRestingHeartRateDataProvider, simpleAvailabilityCheck('Project', ['NighttimeRestingHeartRate']));
registerDailyDataProvider(RespiratoryRateDailyDataType, respiratoryRateDataProvider, simpleAvailabilityCheck('Project', ['RespiratoryRate']));
registerDailyDataProvider(DaytimeBloodOxygenLevelDailyDataType, daytimeBloodOxygenLevelDataProvider, simpleAvailabilityCheck('Project', ['DaytimeBloodOxygenLevel']));
registerDailyDataProvider(NighttimeBloodOxygenLevelDailyDataType, nighttimeBloodOxygenLevelDataProvider, simpleAvailabilityCheck('Project', ['NighttimeBloodOxygenLevel']));

export interface AsthmaHeartAndLungsViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
    alert?: 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
    logEntrySurveyName: string;
}

export default function (props: AsthmaHeartAndLungsViewProps) {
    const [dhrBaseline, setDhrBaseline] = useState<number>();
    const [nhrBaseline, setNhrBaseline] = useState<number>();
    const [rrBaseline, setRrBaseline] = useState<number>();
    const [dbolBaseline, setDbolBaseline] = useState<number>();
    const [nbolBaseline, setNbolBaseline] = useState<number>();

    let hrPreviewDataProvider: DailyDataProvider | undefined;
    let rrPreviewDataProvider: DailyDataProvider | undefined;
    let spo2PreviewDataProvider: DailyDataProvider | undefined;

    if (props.previewState === 'default') {
        hrPreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 30, 150);
        rrPreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 10, 50);
        spo2PreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 0.85, 1, false);
    }

    useInitializeView(() => {
        if (props.previewState === 'default') {
            setDhrBaseline(90);
            setNhrBaseline(90);
            setRrBaseline(30);
            setDbolBaseline(0.97);
            setNbolBaseline(0.96);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            setDhrBaseline(participant.getDaytimeRestingHeartRateBaseline());
            setNhrBaseline(participant.getNighttimeRestingHeartRateBaseline());
            setRrBaseline(participant.getRespiratoryRateBaseline());
            setDbolBaseline(participant.getDaytimeBloodOxygenLevelBaseline());
            setNbolBaseline(participant.getNighttimeBloodOxygenLevelBaseline());
        });
    });

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}>
            <Title order={1} style={{paddingTop: '32px'}}>Heart & Lungs</Title>
        </NavigationBar>
        {(!props.alert || props.alert === 'DaytimeRestingHeartRate') &&
            <AsthmaBarChart
                title="Resting Heart Rate (Day)"
                dailyDataType={DaytimeRestingHeartRateDailyDataType}
                previewDataProvider={hrPreviewDataProvider}
                highlight={rawValue => dhrBaseline ? !isDaytimeRestingHeartRateWithinRange(dhrBaseline, rawValue) : false}
                emptyDomain={[0, 120]}
            />
        }
        {(!props.alert || props.alert === 'NighttimeRestingHeartRate') &&
            <AsthmaBarChart
                title="Resting Heart Rate (Night)"
                dailyDataType={NighttimeRestingHeartRateDailyDataType}
                previewDataProvider={hrPreviewDataProvider}
                highlight={rawValue => nhrBaseline ? !isNighttimeRestingHeartRateWithinRange(nhrBaseline, rawValue) : false}
                emptyDomain={[0, 120]}
            />
        }
        {(!props.alert || props.alert === 'RespiratoryRate') &&
            <AsthmaBarChart
                title="Respiratory Rate"
                dailyDataType={RespiratoryRateDailyDataType}
                previewDataProvider={rrPreviewDataProvider}
                highlight={rawValue => rrBaseline ? !isRespiratoryRateWithinRange(rrBaseline, rawValue) : false}
                emptyDomain={[0, 40]}
            />
        }
        {(!props.alert || props.alert === 'DaytimeBloodOxygenLevel') &&
            <AsthmaBarChart
                title="Blood Oxygen (Day)"
                dailyDataType={DaytimeBloodOxygenLevelDailyDataType}
                previewDataProvider={spo2PreviewDataProvider}
                valueConverter={rawValue => rawValue * 100.0}
                valueFormatter={value => Number(value).toFixed(1)}
                highlight={rawValue => dbolBaseline ? !isBloodOxygenLevelWithinRange(dbolBaseline, rawValue) : false}
                domain={[80, 100]}
                emptyDomain={[80, 100]}
            />
        }
        {(!props.alert || props.alert === 'NighttimeBloodOxygenLevel') &&
            <AsthmaBarChart
                title="Blood Oxygen (Night)"
                dailyDataType={NighttimeBloodOxygenLevelDailyDataType}
                previewDataProvider={spo2PreviewDataProvider}
                valueConverter={rawValue => rawValue * 100.0}
                valueFormatter={value => Number(value).toFixed(1)}
                highlight={rawValue => nbolBaseline ? !isBloodOxygenLevelWithinRange(nbolBaseline, rawValue) : false}
                domain={[80, 100]}
                emptyDomain={[80, 100]}
            />
        }
        {props.alert === 'DaytimeRestingHeartRate' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your daytime resting heart rate is above your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'NighttimeRestingHeartRate' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your nighttime resting heart rate is above your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'RespiratoryRate' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your respiratory rate is above your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'DaytimeBloodOxygenLevel' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your daytime blood oxygen is below your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'NighttimeBloodOxygenLevel' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your nighttime blood oxygen is below your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
