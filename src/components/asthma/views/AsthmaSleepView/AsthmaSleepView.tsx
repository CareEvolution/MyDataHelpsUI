import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { randomDataProvider, sleepDisturbancesDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice, AsthmaBarChart } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, isSleepDisturbancesWithinRange } from '../../helpers';

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

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}>
            <Title order={1} style={{paddingTop: '32px'}}>Sleep</Title>
        </NavigationBar>
        <AsthmaBarChart
            title="Sleep Disturbances"
            dailyDataType={SleepDisturbancesDailyDataType}
            previewDataProvider={previewDataProvider}
            highlight={rawValue => baseline ? !isSleepDisturbancesWithinRange(baseline, rawValue) : false}
            emptyDomain={[0, 16]}
        />
        {props.alert === 'SleepDisturbances' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message="Your sleep disturbances are above your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
