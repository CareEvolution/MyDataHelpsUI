import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { daytimeBloodOxygenLevelDataProvider, daytimeRestingHeartRateDataProvider, nighttimeBloodOxygenLevelDataProvider, nighttimeRestingHeartRateDataProvider, randomDataProvider, respiratoryRateDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';

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

    let hrPreviewDataProvider: DailyDataProvider | undefined;
    let rrPreviewDataProvider: DailyDataProvider | undefined;
    let spo2PreviewDataProvider: DailyDataProvider | undefined;

    if (props.previewState === 'default') {
        hrPreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 30, 180);
        rrPreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 10, 50);
        spo2PreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 85, 100);
    }

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}>
            <Title order={1} style={{paddingTop: '32px'}}>Heart & Lungs</Title>
        </NavigationBar>
        {(!props.alert || props.alert === 'DaytimeRestingHeartRate') &&
            <DailyDataChart
                title="Resting Heart Rate (Day)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={DaytimeRestingHeartRateDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={hrPreviewDataProvider}
            />
        }
        {(!props.alert || props.alert === 'NighttimeRestingHeartRate') &&
            <DailyDataChart
                title="Resting Heart Rate (Night)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={NighttimeRestingHeartRateDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={hrPreviewDataProvider}
            />
        }
        {(!props.alert || props.alert === 'RespiratoryRate') &&
            <DailyDataChart
                title="Respiratory Rate"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={RespiratoryRateDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={rrPreviewDataProvider}
            />
        }
        {(!props.alert || props.alert === 'DaytimeBloodOxygenLevel') &&
            <DailyDataChart
                title="Blood Oxygen (Day)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={DaytimeBloodOxygenLevelDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={spo2PreviewDataProvider}
            />
        }
        {(!props.alert || props.alert === 'NighttimeBloodOxygenLevel') &&
            <DailyDataChart
                title="Blood Oxygen (Night)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={NighttimeBloodOxygenLevelDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={spo2PreviewDataProvider}
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
