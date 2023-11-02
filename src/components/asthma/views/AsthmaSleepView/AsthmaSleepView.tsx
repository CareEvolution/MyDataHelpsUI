import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { randomDataProvider, sleepDisturbancesDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice } from "../../components";

const SleepDisturbancesDailyDataType = 'Asthma.SleepDisturbances';

registerDailyDataProvider(SleepDisturbancesDailyDataType, sleepDisturbancesDataProvider, simpleAvailabilityCheck("Project", ["SleepDisturbances"]));

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

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <NavigationBar showCloseButton={true} backgroundColor="#fff">
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
                <AsthmaAlertTakeoverNotice message="Your sleep disturbances are above your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
            }
        </Section>
    </Layout>;
}
