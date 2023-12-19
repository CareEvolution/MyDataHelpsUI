import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { add } from 'date-fns';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, DailyDataQueryResult, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import getDayKey from '../../../../helpers/get-day-key';
import { homeAirQualityDataProvider, workAirQualityDataProvider } from '../../helpers/daily-data-providers';

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
        previewDataProvider = (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.floor(Math.random() * 100 + 30);
                currentDate = add(currentDate, {days: 1});
            }
            return Promise.resolve(data);
        };
    }

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <NavigationBar showCloseButton={true} backgroundColor="#fff">
                <Title order={2} style={{paddingTop: '32px'}}>Air Quality</Title>
            </NavigationBar>
            <DailyDataChart
                title="Air Quality (Home)"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={HomeAirQualityDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
            <DailyDataChart
                title="Air Quality (Work)"
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
