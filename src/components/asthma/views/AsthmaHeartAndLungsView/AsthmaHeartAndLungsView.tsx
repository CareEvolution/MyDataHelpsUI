import React, { useState } from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider } from '../../../../helpers/query-daily-data';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { useInitializeView } from '../../../../helpers/Initialization';
import { AsthmaDailyDataType, asthmaDataService, isBloodOxygenLevelWithinRange, isDaytimeRestingHeartRateWithinRange, isNighttimeRestingHeartRateWithinRange, isRespiratoryRateWithinRange } from '../../helpers';
import language from '../../../../helpers/language';
import { randomDataProvider } from '../../../../helpers/daily-data-providers';
import { RecentDailyDataBarChart } from '../../../container';
import { formatNumberForLocale } from "../../../../helpers/locale";

export interface AsthmaHeartAndLungsViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    alert?: 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
    logEntrySurveyName: string;
}

export default function (props: AsthmaHeartAndLungsViewProps) {
    const [dhrBaseline, setDhrBaseline] = useState<number>();
    const [nhrBaseline, setNhrBaseline] = useState<number>();
    const [rrBaseline, setRrBaseline] = useState<number>();
    const [dbolBaseline, setDbolBaseline] = useState<number>();
    const [nbolBaseline, setNbolBaseline] = useState<number>();

    let hrPreviewDataProvider: DailyDataProvider | undefined;
    let rrPreviewDataProvider: DailyDataProvider | undefined;
    let spo2PreviewDataProvider: DailyDataProvider | undefined;

    if (props.previewState === 'default') {
        hrPreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 30, 150, false);
        rrPreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 10, 50);
        spo2PreviewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 0.85, 1, false);
    }

    useInitializeView(() => {
        if (props.previewState === 'default') {
            setDhrBaseline(90);
            setNhrBaseline(90);
            setRrBaseline(30);
            setDbolBaseline(0.97);
            setNbolBaseline(0.96);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            setDhrBaseline(participant.getDaytimeRestingHeartRateBaseline());
            setNhrBaseline(participant.getNighttimeRestingHeartRateBaseline());
            setRrBaseline(participant.getRespiratoryRateBaseline());
            setDbolBaseline(participant.getDaytimeBloodOxygenLevelBaseline());
            setNbolBaseline(participant.getNighttimeBloodOxygenLevelBaseline());
        });
    }, [], [props.previewState]);

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar variant="compressed" showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)">
            <Title style={{ textAlign: 'left' }} order={1}>{language('asthma-heart-and-lungs-view-title')}</Title>
        </NavigationBar>
        {(!props.alert || props.alert === 'DaytimeRestingHeartRate') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={hrPreviewDataProvider}
                title={language('asthma-heart-and-lungs-view-dhr-chart-title')}
                dailyDataType={AsthmaDailyDataType.DaytimeRestingHeartRate}
                valueFormatter={value => formatNumberForLocale(value)}
                highlight={rawValue => dhrBaseline ? !isDaytimeRestingHeartRateWithinRange(dhrBaseline, rawValue) : false}
                emptyDomain={[0, 120]}
            />
        }
        {(!props.alert || props.alert === 'NighttimeRestingHeartRate') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={hrPreviewDataProvider}
                title={language('asthma-heart-and-lungs-view-nhr-chart-title')}
                dailyDataType={AsthmaDailyDataType.NighttimeRestingHeartRate}
                valueFormatter={value => formatNumberForLocale(value)}
                highlight={rawValue => nhrBaseline ? !isNighttimeRestingHeartRateWithinRange(nhrBaseline, rawValue) : false}
                emptyDomain={[0, 120]}
            />
        }
        {(!props.alert || props.alert === 'RespiratoryRate') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={rrPreviewDataProvider}
                title={language('asthma-heart-and-lungs-view-rr-chart-title')}
                dailyDataType={AsthmaDailyDataType.RespiratoryRate}
                highlight={rawValue => rrBaseline ? !isRespiratoryRateWithinRange(rrBaseline, rawValue) : false}
                emptyDomain={[0, 40]}
            />
        }
        {(!props.alert || props.alert === 'DaytimeBloodOxygenLevel') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={spo2PreviewDataProvider}
                title={language('asthma-heart-and-lungs-view-dbol-chart-title')}
                dailyDataType={AsthmaDailyDataType.DaytimeBloodOxygenLevel}
                valueConverter={rawValue => rawValue * 100.0}
                valueFormatter={value => formatNumberForLocale(value)}
                highlight={rawValue => dbolBaseline ? !isBloodOxygenLevelWithinRange(dbolBaseline, rawValue) : false}
                domain={[80, 100]}
                emptyDomain={[80, 100]}
            />
        }
        {(!props.alert || props.alert === 'NighttimeBloodOxygenLevel') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={spo2PreviewDataProvider}
                title={language('asthma-heart-and-lungs-view-nbol-chart-title')}
                dailyDataType={AsthmaDailyDataType.NighttimeBloodOxygenLevel}
                valueConverter={rawValue => rawValue * 100.0}
                valueFormatter={value => formatNumberForLocale(value)}
                highlight={rawValue => nbolBaseline ? !isBloodOxygenLevelWithinRange(nbolBaseline, rawValue) : false}
                domain={[80, 100]}
                emptyDomain={[80, 100]}
            />
        }
        {props.alert === 'DaytimeRestingHeartRate' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-heart-and-lungs-view-dhr-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'NighttimeRestingHeartRate' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-heart-and-lungs-view-nhr-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'RespiratoryRate' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-heart-and-lungs-view-rr-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'DaytimeBloodOxygenLevel' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-heart-and-lungs-view-dbol-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'NighttimeBloodOxygenLevel' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-heart-and-lungs-view-nbol-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
