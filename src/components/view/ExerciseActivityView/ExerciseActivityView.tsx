

import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, WeekCalendar, getDayKey, SparkBarChartBar, SegmentedControl, Section, DailyDataQueryResult } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";
import AppDownload from "../../container/AppDownload";
import { add, isToday, startOfDay, startOfWeek } from 'date-fns';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faCircleCheck, faCircleExclamation, faHeartbeat, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import IntradayHeartRateChart from '../../container/IntradayHeartRateChart/IntradayHeartRateChart';
import "../recover.css"
import DeviceActivityCalendarDay from '../../presentational/DeviceActivityCalendarDay/DeviceActivityCalendarDay';
import { demoLogEntries, demoSymptoms, demoTreatments } from '../../symptom-shark/helpers/demo-data';
import PacingHomeView from '../PacingHomeView/PacingHomeView';
import PacingCalendarView from '../PacingCalendarView/PacingCalendarView';
import PacingNotificationsView from '../PacingNotificationsView/PacingNotificationsView';
import ExerciseHomeView from '../ExerciseHomeView/ExerciseHomeView';
import StatBlock from '../../presentational/StatBlock/StatBlock';
import DailyDataChart, { DailyDataChartProps } from '../../container/DailyDataChart/DailyDataChart';

let maxHrArgs: DailyDataChartProps = {
    title: "Max Heart Rate",
    options: {
        barColor: "#bbb"
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
            data[dayKey] = Math.random() * 90 + 100;
            currentDate = add(currentDate, { days: 1 });
        }
        return Promise.resolve(data);
    },
    threshold: 170
};

let stepsArgs: DailyDataChartProps = {
    title: "Steps",
    options: {
        barColor: "#346094"
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
    }
};


let activeMinutesArgs: DailyDataChartProps = {
    title: "Active Minutes",
    options: {
        barColor: "#346094"
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
    }
};


let sleepArgs: DailyDataChartProps = {
    title: "Sleep Time",
    options: {
        barColor: "#346094"
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

export interface ExerciseActivityViewProps {

}

export default function (props: ExerciseActivityViewProps) {
    return (
        <Layout className='recover' colorScheme={"auto"}>
            <DateRangeCoordinator variant='rounded' intervalType='Month' sticky>
                <Section>
                    <DailyDataChart {...maxHrArgs} />
                    <DailyDataChart {...stepsArgs} />
                    <DailyDataChart {...activeMinutesArgs} />
                    <DailyDataChart {...sleepArgs} />
                </Section>
            </DateRangeCoordinator>
        </Layout>
    )
}