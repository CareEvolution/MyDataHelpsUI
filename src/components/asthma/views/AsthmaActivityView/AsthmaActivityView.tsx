import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { stepsDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, isStepsWithinRange } from '../../helpers';
import language from '../../../../helpers/language';
import { randomDataProvider } from '../../../../helpers/daily-data-providers';
import { RecentDailyDataBarChart } from '../../../container';

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

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)">
            <Title order={1} style={{paddingTop: '32px'}}>{language('asthma-activity-view-title')}</Title>
        </NavigationBar>
        <RecentDailyDataBarChart
            previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
            previewDataProvider={previewDataProvider}
            title={language('asthma-activity-view-chart-title')}
            dailyDataType={StepsDailyDataType}
            highlight={rawValue => baseline ? !isStepsWithinRange(baseline, rawValue) : false}
            emptyDomain={[0, 10000]}
        />
        {props.alert === 'Steps' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-activity-view-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
