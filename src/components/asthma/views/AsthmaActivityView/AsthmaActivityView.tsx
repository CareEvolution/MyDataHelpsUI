import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { randomDataProvider, stepsDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice, AsthmaBarChart } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, isStepsWithinRange } from '../../helpers';

const StepsDailyDataType = 'Asthma.Steps';

registerDailyDataProvider(StepsDailyDataType, stepsDataProvider, simpleAvailabilityCheck('Project', ['Steps']));

export interface AsthmaActivityViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    alert?: 'Steps';
    logEntrySurveyName: string;
}

export default function (props: AsthmaActivityViewProps) {
    const [baseline, setBaseline] = useState<number>();

    let previewDataProvider: DailyDataProvider | undefined;
    if (props.previewState === 'default') {
        previewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 2000, 20000);
    }

    useInitializeView(() => {
        if (props.previewState === 'default') {
            setBaseline(10000);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            setBaseline(participant.getStepsBaseline());
        });
    });

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}>
            <Title order={1} style={{paddingTop: '32px'}}>Activity</Title>
        </NavigationBar>
        <AsthmaBarChart
            title="Steps"
            dailyDataType={StepsDailyDataType}
            previewDataProvider={previewDataProvider}
            highlight={rawValue => baseline ? !isStepsWithinRange(baseline, rawValue) : false}
            emptyDomain={[0, 10000]}
        />
        {props.alert === 'Steps' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message="Your activity is below your normal level." logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
