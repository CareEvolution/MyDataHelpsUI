import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { homeAirQualityDataProvider, randomDataProvider, workAirQualityDataProvider } from '../../helpers/daily-data-providers';

const HomeAirQualityDailyDataType = 'Asthma.HomeAirQuality';
const WorkAirQualityDailyDataType = 'Asthma.WorkAirQuality';

registerDailyDataProvider(HomeAirQualityDailyDataType, homeAirQualityDataProvider, simpleAvailabilityCheck("AirNowApi", ["HomeAirQuality"]));
registerDailyDataProvider(WorkAirQualityDailyDataType, workAirQualityDataProvider, simpleAvailabilityCheck("AirNowApi", ["WorkAirQuality"]));

export interface AsthmaAirQualityViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: AsthmaAirQualityViewProps) {

    let previewDataProvider: DailyDataProvider | undefined;
    if (props.previewState === 'default') {
        previewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 30, 130);
    }

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <NavigationBar showCloseButton={true} backgroundColor="#fff">
                <Title order={1} style={{paddingTop: '32px'}}>Air Quality</Title>
            </NavigationBar>
            <DailyDataChart
                title="Air Quality (Home)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={HomeAirQualityDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
            <DailyDataChart
                title="Air Quality (Work)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={WorkAirQualityDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
        </Section>
    </Layout>;
}
