import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { sleepDisturbancesDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice, AsthmaBarChart } from '../../components';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, isSleepDisturbancesWithinRange } from '../../helpers';
import language from '../../../../helpers/language';
import { randomDataProvider } from '../../../../helpers/daily-data-providers';

const SleepDisturbancesDailyDataType = 'Asthma.SleepDisturbances';

registerDailyDataProvider(SleepDisturbancesDailyDataType, sleepDisturbancesDataProvider, simpleAvailabilityCheck('Project', ['SleepDisturbances']));

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
    });

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)">
            <Title order={1} style={{paddingTop: '32px'}}>{language('asthma-sleep-view-title')}</Title>
        </NavigationBar>
        <AsthmaBarChart
            title={language('asthma-sleep-view-chart-title')}
            dailyDataType={SleepDisturbancesDailyDataType}
            previewDataProvider={previewDataProvider}
            highlight={rawValue => baseline ? !isSleepDisturbancesWithinRange(baseline, rawValue) : false}
            emptyDomain={[0, 16]}
        />
        {props.alert === 'SleepDisturbances' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-sleep-view-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
