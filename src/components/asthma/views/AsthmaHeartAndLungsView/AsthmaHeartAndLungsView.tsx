import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { add } from 'date-fns';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, DailyDataQueryResult, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import getDayKey from '../../../../helpers/get-day-key';
import { daytimeBloodOxygenLevelDataProvider, daytimeRestingHeartRateDataProvider, nighttimeBloodOxygenLevelDataProvider, nighttimeRestingHeartRateDataProvider, respiratoryRateDataProvider } from '../../helpers/daily-data-providers';

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

    const randomDataProvider = (start: Date, end: Date, min: number, max: number): Promise<DailyDataQueryResult> => {
        let data: DailyDataQueryResult = {};
        let currentDate = new Date(start);
        while (currentDate < end) {
            let dayKey = getDayKey(currentDate);
            data[dayKey] = Math.floor(Math.random() * (max - min) + min);
            currentDate = add(currentDate, {days: 1});
        }
        return Promise.resolve(data);
    }

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
                <Title order={2} style={{paddingTop: '32px'}}>Heart & Lungs</Title>
            </NavigationBar>
            <DailyDataChart
                title="Resting Heart Rate (Day)"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={DaytimeRestingHeartRateDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={hrPreviewDataProvider}
            />
            <DailyDataChart
                title="Resting Heart Rate (Night)"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={NighttimeRestingHeartRateDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={hrPreviewDataProvider}
            />
            <DailyDataChart
                title="Respiratory Rate"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={RespiratoryRateDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={rrPreviewDataProvider}
            />
            <DailyDataChart
                title="Blood Oxygen (Day)"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={DaytimeBloodOxygenLevelDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={spo2PreviewDataProvider}
            />
            <DailyDataChart
                title="Blood Oxygen (Night)"
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
