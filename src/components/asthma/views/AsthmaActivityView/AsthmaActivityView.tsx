import React from 'react';
import { Layout, NavigationBar, Section, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { randomDataProvider, stepsDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice } from "../../components";

const StepsDailyDataType = 'Asthma.Steps';

registerDailyDataProvider(StepsDailyDataType, stepsDataProvider, simpleAvailabilityCheck("Project", ["Steps"]));

export interface AsthmaActivityViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
    alert?: string;
}

export default function (props: AsthmaActivityViewProps) {

    let previewDataProvider: DailyDataProvider | undefined;
    if (props.previewState === 'default') {
        previewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 2000, 20000);
    }

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <NavigationBar showCloseButton={true} backgroundColor="#fff">
                <Title order={1} style={{paddingTop: '32px'}}>Activity</Title>
            </NavigationBar>
            <DailyDataChart
                title="Steps"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={StepsDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
            {props.alert === 'Steps' &&
                <AsthmaAlertTakeoverNotice message="Your activity is below your normal level."/>
            }
        </Section>
    </Layout>;
}
