import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { homeAirQualityDataProvider, randomDataProvider, workAirQualityDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice, AsthmaBarChart } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';

const HomeAirQualityDailyDataType = 'Asthma.HomeAirQuality';
const WorkAirQualityDailyDataType = 'Asthma.WorkAirQuality';

registerDailyDataProvider(HomeAirQualityDailyDataType, homeAirQualityDataProvider, simpleAvailabilityCheck('AirNowApi', ['HomeAirQuality']));
registerDailyDataProvider(WorkAirQualityDailyDataType, workAirQualityDataProvider, simpleAvailabilityCheck('AirNowApi', ['WorkAirQuality']));

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

    const backgroundColor: ColorDefinition = {darkMode: '#000', lightMode: '#fff'};

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor={backgroundColor}>
        <NavigationBar showCloseButton={true} backgroundColor={backgroundColor}>
            <Title order={1} style={{paddingTop: '32px'}}>Air Quality</Title>
        </NavigationBar>
        {(!props.alert || props.alert === 'HomeAirQuality') &&
            <AsthmaBarChart
                title="Air Quality (Home)"
                dailyDataType={HomeAirQualityDailyDataType}
                previewDataProvider={previewDataProvider}
                highlight={rawValue => rawValue > 100}
                emptyDomain={[0, 160]}
            />
        }
        {(!props.alert || props.alert === 'WorkAirQuality') &&
            <AsthmaBarChart
                title="Air Quality (Work)"
                dailyDataType={WorkAirQualityDailyDataType}
                previewDataProvider={previewDataProvider}
                highlight={rawValue => rawValue > 100}
                emptyDomain={[0, 160]}
            />
        }
        {props.alert === 'HomeAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message="Your home AQI is unhealthy." logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'WorkAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState ? 'loaded' : undefined} message="Your work AQI is unhealthy." logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
