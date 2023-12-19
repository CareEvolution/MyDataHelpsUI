import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { daytimeBloodOxygenLevelDataProvider, daytimeRestingHeartRateDataProvider, nighttimeBloodOxygenLevelDataProvider, nighttimeRestingHeartRateDataProvider, randomDataProvider, respiratoryRateDataProvider } from '../../helpers/daily-data-providers';

const DaytimeRestingHeartRateDailyDataType = 'Asthma.DaytimeRestingHeartRate';
const NighttimeRestingHeartRateDailyDataType = 'Asthma.NighttimeRestingHeartRate';
const RespiratoryRateDailyDataType = 'Asthma.RespiratoryRate';
const DaytimeBloodOxygenLevelDailyDataType = 'Asthma.DaytimeBloodOxygenLevel';
const NighttimeBloodOxygenLevelDailyDataType = 'Asthma.NighttimeBloodOxygenLevel';

registerDailyDataProvider(DaytimeRestingHeartRateDailyDataType, daytimeRestingHeartRateDataProvider, simpleAvailabilityCheck("Project", ["DaytimeRestingHeartRate"]));
registerDailyDataProvider(NighttimeRestingHeartRateDailyDataType, nighttimeRestingHeartRateDataProvider, simpleAvailabilityCheck("Project", ["NighttimeRestingHeartRate"]));
registerDailyDataProvider(RespiratoryRateDailyDataType, respiratoryRateDataProvider, simpleAvailabilityCheck("Project", ["RespiratoryRate"]));
registerDailyDataProvider(DaytimeBloodOxygenLevelDailyDataType, daytimeBloodOxygenLevelDataProvider, simpleAvailabilityCheck("Project", ["DaytimeBloodOxygenLevel"]));
registerDailyDataProvider(NighttimeBloodOxygenLevelDailyDataType, nighttimeBloodOxygenLevelDataProvider, simpleAvailabilityCheck("Project", ["NighttimeBloodOxygenLevel"]));

export interface AsthmaHeartAndLungsViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
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

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <NavigationBar showCloseButton={true} backgroundColor="#fff">
                <Title order={1} style={{paddingTop: '32px'}}>Heart & Lungs</Title>
            </NavigationBar>
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
        </Section>
    </Layout>;
}
