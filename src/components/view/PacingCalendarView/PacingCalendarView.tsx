
import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, TextBlock, BlankView, SymptomSharkVisualizationCoordinator, Section, SymptomSharkOverallExperienceChart, SymptomSharkCalendar, SymptomSharkSymptomTreatmentHistograms, DailyDataQueryResult, getDayKey, DailyDataChart } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";
import AppDownload from "../../container/AppDownload";
import { startOfDay } from 'date-fns';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faHeartbeat, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import IntradayHeartRateChart from '../../container/IntradayHeartRateChart/IntradayHeartRateChart';
import { add } from "date-fns";
import { DailyDataChartProps } from '../../container/DailyDataChart/DailyDataChart';

export interface PacingCalendarViewProps {
    colorScheme?: "light" | "dark" | "auto";
    onDaySelected(d: Date): void;
    onSymptomSelected(symptom: string, intervalStart: Date): void;
    previewState?: "default";
}


let stepsArgs: DailyDataChartProps = {
    title: "Steps",
    options: {

    },
    intervalType: "Month",
    weekStartsOn: "6DaysAgo",
    dailyDataType: DailyDataType.Steps,
    valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
    chartType: "Bar",
    previewDataProvider: (start: Date, end: Date) => {
        let data: DailyDataQueryResult = {};
        let currentDate = new Date(start);
        while (currentDate < end) {
            let dayKey = getDayKey(currentDate);
            data[dayKey] = Math.random() * 3000 + 1000;
            currentDate = add(currentDate, { days: 1 });
        }
        return Promise.resolve(data);
    },
    threshold: 3500
};

let maxHrArgs: DailyDataChartProps = {
    title: "Max Heart Rate",
    options: {

    },
    intervalType: "Month",
    weekStartsOn: "6DaysAgo",
    dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
    valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
    chartType: "Bar",
    previewDataProvider: (start: Date, end: Date) => {
        let data: DailyDataQueryResult = {};
        let currentDate = new Date(start);
        while (currentDate < end) {
            let dayKey = getDayKey(currentDate);
            data[dayKey] = Math.random() * 60 + 75;
            currentDate = add(currentDate, { days: 1 });
        }
        return Promise.resolve(data);
    },
    threshold: 120
};


let activeMinutesArgs: DailyDataChartProps = {
    title: "Active Minutes",
    options: {

    },
    intervalType: "Month",
    weekStartsOn: "6DaysAgo",
    dailyDataType: DailyDataType.FitbitActiveMinutes,
    valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
    chartType: "Bar",
    previewDataProvider: (start: Date, end: Date) => {
        let data: DailyDataQueryResult = {};
        let currentDate = new Date(start);
        while (currentDate < end) {
            let dayKey = getDayKey(currentDate);
            data[dayKey] = Math.random() * 60 + 150;
            currentDate = add(currentDate, { days: 1 });
        }
        return Promise.resolve(data);
    },
    threshold: 180
};


let sleepArgs: DailyDataChartProps = {
    title: "Sleep Time",
    options: {

    },
    intervalType: "Month",
    weekStartsOn: "6DaysAgo",
    dailyDataType: DailyDataType.FitbitSleepMinutes,  
    valueFormatter: (value: number) => {
        var hours = Math.floor(value / 60);
        var displayValue = hours > 0 ? (hours + "h ") : "";
        displayValue = displayValue + (Math.round(value - (hours * 60)) + "m");
        return displayValue;
    },
    valueConverter: (value: number) => {
        return value / 60.0;
    },
    chartType: "Bar",
    previewDataProvider: (start: Date, end: Date) => {
        let data: DailyDataQueryResult = {};
        let currentDate = new Date(start);
        while (currentDate < end) {
            let dayKey = getDayKey(currentDate);
            data[dayKey] = (8 * 60) + (60 - Math.random() * 120);
            currentDate = add(currentDate, { days: 1 });
        }
        return Promise.resolve(data);
    }
};

export default function (props: PacingCalendarViewProps) {
    return (
        <Layout colorScheme={props.colorScheme ?? "light"}>
            <DateRangeCoordinator variant='rounded' intervalType='Month' sticky>
                <SymptomSharkVisualizationCoordinator showFilters previewState={props.previewState}>
                    <Section>
                        <SymptomSharkCalendar onDaySelected={props.onDaySelected} />
                    </Section>
                    <Section>
                        <SymptomSharkSymptomTreatmentHistograms onSymptomSelected={props.onSymptomSelected} />
                    </Section>
                    <Section>
                        <DailyDataChart {...stepsArgs} />
                        <DailyDataChart {...maxHrArgs} />
                        <DailyDataChart {...activeMinutesArgs} />
                        <DailyDataChart {...sleepArgs} />
                    </Section>
                    <Section>
                        <SymptomSharkOverallExperienceChart />
                    </Section>
                </SymptomSharkVisualizationCoordinator>
            </DateRangeCoordinator>
        </Layout>
    )
}