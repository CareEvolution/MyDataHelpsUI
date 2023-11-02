import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { add } from 'date-fns';
import { DailyDataChart } from "../../../container";
import { DailyDataProvider, DailyDataQueryResult, DailyDataType } from '../../../../helpers/query-daily-data';
import getDayKey from '../../../../helpers/get-day-key';

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
            <NavigationBar showCloseButton={true} variant="compressed" backgroundColor="transparent"/>
            <Title order={2} style={{padding: '0 16px'}}>Air Quality</Title>
            <DailyDataChart
                title="Air Quality (Home)"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={DailyDataType.AirQualityAtHome}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
            <DailyDataChart
                title="Air Quality (Work)"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={DailyDataType.AirQualityAtWork}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
        </Section>
    </Layout>;
}
