import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, DailyDataType } from '../../../../helpers';
import { AsthmaAlertTakeoverNotice } from '../../components';
import language from '../../../../helpers/language';
import { randomDataProvider } from '../../../../helpers/daily-data-providers';
import { RecentDailyDataBarChart } from '../../../container';

export interface AsthmaAirQualityViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'default';
    alert?: 'HomeAirQuality' | 'WorkAirQuality';
    logEntrySurveyName: string;
}

export default function (props: AsthmaAirQualityViewProps) {

    let previewDataProvider: DailyDataProvider | undefined;
    if (props.previewState === 'default') {
        previewDataProvider = (start: Date, end: Date) => randomDataProvider(start, end, 30, 130);
    }

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar variant="compressed" showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)">
            <Title style={{ textAlign: 'left' }} order={1}>{language('asthma-air-quality-view-title')}</Title>
        </NavigationBar>
        {(!props.alert || props.alert === 'HomeAirQuality') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={previewDataProvider}
                title={language('asthma-air-quality-view-home-aqi-chart-title')}
                dailyDataType={DailyDataType.HomeAirQuality}
                highlight={rawValue => rawValue > 100}
                emptyDomain={[0, 160]}
            />
        }
        {(!props.alert || props.alert === 'WorkAirQuality') &&
            <RecentDailyDataBarChart
                previewState={props.previewState === 'default' ? 'loaded with data' : undefined}
                previewDataProvider={previewDataProvider}
                title={language('asthma-air-quality-view-work-aqi-chart-title')}
                dailyDataType={DailyDataType.WorkAirQuality}
                highlight={rawValue => rawValue > 100}
                emptyDomain={[0, 160]}
            />
        }
        {props.alert === 'HomeAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-air-quality-view-home-aqi-alert-message')} logEntrySurveyName={props.logEntrySurveyName} />
        }
        {props.alert === 'WorkAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-air-quality-view-work-aqi-alert-message')} logEntrySurveyName={props.logEntrySurveyName} />
        }
    </Layout>;
}
