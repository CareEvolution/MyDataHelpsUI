import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { randomDataProvider, sleepDisturbancesDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';

const SleepDisturbancesDailyDataType = 'Asthma.SleepDisturbances';

registerDailyDataProvider(SleepDisturbancesDailyDataType, sleepDisturbancesDataProvider, simpleAvailabilityCheck('Project', ['SleepDisturbances']));

export interface AsthmaSleepViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
    alert?: 'SleepDisturbances';
    logEntrySurveyName: string;
}

export default function (props: AsthmaSleepViewProps) {

    let previewDataProvider: DailyDataProvider | undefined;
    if (props.previewState === 'default') {
        previewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 0, 10);
    }

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}>
            <Title order={1} style={{paddingTop: '32px'}}>Sleep</Title>
        </NavigationBar>
        <DailyDataChart
            title="Sleep Disturbances"
            subtitle="Past 7 days"
            intervalType="Week"
            weekStartsOn="6DaysAgo"
            dailyDataType={SleepDisturbancesDailyDataType}
            chartType="Bar"
            options={{barColor: '#BBDEFF'}}
            previewDataProvider={previewDataProvider}
        />
        {props.alert === 'SleepDisturbances' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your sleep disturbances are above your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
