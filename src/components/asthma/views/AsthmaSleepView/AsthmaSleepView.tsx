import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider } from '../../../../helpers/query-daily-data';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { useInitializeView } from '../../../../helpers/Initialization';
import { AsthmaDailyDataType, asthmaDataService, isSleepDisturbancesWithinRange } from '../../helpers';
import language from '../../../../helpers/language';
import { randomDataProvider } from '../../../../helpers/daily-data-providers';
import { RecentDailyDataBarChart } from '../../../container';

export interface AsthmaSleepViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    alert?: 'SleepDisturbances';
    logEntrySurveyName: string;
}

export default function (props: AsthmaSleepViewProps) {
    const [baseline, setBaseline] = useState<number>();

    let previewDataProvider: DailyDataProvider | undefined;
    if (props.previewState === 'default') {
        previewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 0, 15);
    }

    useInitializeView(() => {
        if (props.previewState === 'default') {
            setBaseline(5);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            setBaseline(participant.getSleepDisturbancesBaseline());
        });
    }, [], [props.previewState]);

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar variant="compressed" showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)">
            <Title style={{ textAlign: 'left' }} order={1}>{language('asthma-sleep-view-title')}</Title>
        </NavigationBar>
        <RecentDailyDataBarChart
            previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
            previewDataProvider={previewDataProvider}
            title={language('asthma-sleep-view-chart-title')}
            dailyDataType={AsthmaDailyDataType.SleepDisturbances}
            highlight={rawValue => baseline ? !isSleepDisturbancesWithinRange(baseline, rawValue) : false}
            emptyDomain={[0, 16]}
        />
        {props.alert === 'SleepDisturbances' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-sleep-view-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
