import React from 'react';
import { Layout, NavigationBar, Title } from '../../../presentational';
import { DailyDataChart } from '../../../container';
import { DailyDataProvider, registerDailyDataProvider, simpleAvailabilityCheck } from '../../../../helpers/query-daily-data';
import { homeAirQualityDataProvider, randomDataProvider, workAirQualityDataProvider } from '../../helpers/daily-data-providers';
import { AsthmaAlertTakeoverNotice } from '../../components';
import { ColorDefinition } from '../../../../helpers/colors';

const HomeAirQualityDailyDataType = 'Asthma.HomeAirQuality';
const WorkAirQualityDailyDataType = 'Asthma.WorkAirQuality';

registerDailyDataProvider(HomeAirQualityDailyDataType, homeAirQualityDataProvider, simpleAvailabilityCheck('AirNowApi', ['HomeAirQuality']));
registerDailyDataProvider(WorkAirQualityDailyDataType, workAirQualityDataProvider, simpleAvailabilityCheck('AirNowApi', ['WorkAirQuality']));

export interface AsthmaAirQualityViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
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
            <DailyDataChart
                title="Air Quality (Home)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={HomeAirQualityDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
        }
        {(!props.alert || props.alert === 'WorkAirQuality') &&
            <DailyDataChart
                title="Air Quality (Work)"
                subtitle="Past 7 days"
                intervalType="Week"
                weekStartsOn="6DaysAgo"
                dailyDataType={WorkAirQualityDailyDataType}
                chartType="Bar"
                options={{barColor: '#BBDEFF'}}
                previewDataProvider={previewDataProvider}
            />
        }
        {props.alert === 'HomeAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your home AQI is unhealthy." logEntrySurveyName={props.logEntrySurveyName}/>
        }
        {props.alert === 'WorkAirQuality' &&
            <AsthmaAlertTakeoverNotice previewState={props.previewState} message="Your work AQI is unhealthy." logEntrySurveyName={props.logEntrySurveyName}/>
        }
    </Layout>;
}
