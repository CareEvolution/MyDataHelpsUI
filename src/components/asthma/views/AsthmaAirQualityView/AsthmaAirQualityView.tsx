import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, DailyDataType } from '../../../../helpers/query-daily-data';
import { AsthmaAlertTakeoverNotice, AsthmaBarChart } from '../../components';
import language from '../../../../helpers/language';
import { randomDataProvider } from '../../../../helpers/daily-data-providers';

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
        <NavigationBar showCloseButton={true} backgroundColor="var(--mdhui-background-color-0)">
            <Title order={1} style={{paddingTop: '32px'}}>{language('asthma-air-quality-view-title')}</Title>
        </NavigationBar>
        {(!props.alert || props.alert === 'HomeAirQuality') &&
            <AsthmaBarChart
                title={language('asthma-air-quality-view-home-aqi-chart-title')}
                dailyDataType={DailyDataType.HomeAirQuality}
                previewDataProvider={previewDataProvider}
                highlight={rawValue => rawValue > 100}
                emptyDomain={[0, 160]}
            />
        }
        {(!props.alert || props.alert === 'WorkAirQuality') &&
            <AsthmaBarChart
                title={language('asthma-air-quality-view-work-aqi-chart-title')}
                dailyDataType={DailyDataType.WorkAirQuality}
                previewDataProvider={previewDataProvider}
                highlight={rawValue => rawValue > 100}
                emptyDomain={[0, 160]}
            />
        }
        {props.alert === 'HomeAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-air-quality-view-home-aqi-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'WorkAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message={language('asthma-air-quality-view-work-aqi-alert-message')} logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
