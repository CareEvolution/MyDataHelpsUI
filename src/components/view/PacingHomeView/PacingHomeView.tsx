import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, WeekCalendar, getDayKey, SparkBarChartBar } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";
import AppDownload from "../../container/AppDownload";
import { add, isToday, startOfDay, startOfWeek } from 'date-fns';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faHeartbeat, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import IntradayHeartRateChart from '../../container/IntradayHeartRateChart/IntradayHeartRateChart';
import "../recover.css"
import DeviceActivityCalendarDay from '../../presentational/DeviceActivityCalendarDay/DeviceActivityCalendarDay';
import { demoLogEntries, demoSymptoms, demoTreatments } from '../../symptom-shark/helpers/demo-data';

export interface PacingHomeViewProps {

}


let dataTypes = [{
    dailyDataType: DailyDataType.Steps,
    label: "Steps",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toLocaleString()
    },
    threshold: 2500
}, {
    dailyDataType: DailyDataType.FitbitActiveMinutes,
    label: "Active Minutes",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " minutes";
    },
    threshold: 80
},
{
    dailyDataType: DailyDataType.AppleHealthSleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)",
    formatter: function (number: number) {
        var hours = Math.floor(number / 60);
        var displayValue = hours + "h " + Math.round(number - (hours * 60)) + "m";
        if (Math.round(number - (hours * 60)) == 0) {
            displayValue = hours + "h";
        }
        return displayValue;
    },
    threshold: 60 * 8
},
{
    dailyDataType: DailyDataType.FitbitSleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)",
    formatter: function (number: number) {
        var hours = Math.floor(number / 60);
        var displayValue = hours + "h " + Math.round(number - (hours * 60)) + "m";
        if (Math.round(number - (hours * 60)) == 0) {
            displayValue = hours + " hours";
        }
        return displayValue;
    },
    threshold: 60 * 8
},
{
    dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
    label: "Max Heart Rate",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    color: "rgba(239, 132, 129, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " bpm";
    },
    threshold: 115
}];


export default function (props: PacingHomeViewProps) {
    var config = { symptoms: demoSymptoms, treatments: demoTreatments, participantID: "1" };

    function getDay(year: number, month: number, day: number, selectedWeek: boolean) {
        var date = new Date(year, month, day);
        var dayKey = getDayKey(date);
        let bars: SparkBarChartBar[] = [];
        if(isToday(date)){
            bars = [
                {
                    color: dataTypes[0].color,
                    barFillPercent: 0.7
                },
                {
                    color: dataTypes[1].color,
                    barFillPercent: 0.8
                },
                {
                    color: dataTypes[2].color,
                    barFillPercent: 0.55
                },
                {
                    color: dataTypes[4].color,
                    barFillPercent: 0.42
                },
            ];
        }
        else{
            bars = [
                {
                    color: dataTypes[0].color,
                    barFillPercent: Math.random()
                },
                {
                    color: dataTypes[1].color,
                    barFillPercent: Math.random()
                },
                {
                    color: dataTypes[2].color,
                    barFillPercent: Math.random() * 0.2 + 0.4
                },
                {
                    color: dataTypes[4].color,
                    barFillPercent: Math.random()
                },
            ];
        }
        return <DeviceActivityCalendarDay
            key={getDayKey(date)}
            selected={false}
            bars={bars}
            date={date}
            logEntry={demoLogEntries[getDayKey(date)]}
            participantInfo={config}
            averageFillPercent={0.5}
            highlightOutOfRange={false}
            loading={false} />
    }

    return (
        <Layout className='recover' colorScheme={"auto"}>
            <StatusBarBackground color='#FFFFFF' />
            <WeekCalendar dayRenderer={getDay}
                selectedDate={startOfDay(new Date())}
                loading={false}
                startDate={ add(startOfDay(new Date()), {days:-6}) }
                onDateSelected={(d) => { }}
                onStartDateChange={(d) => { }} />
            <Title defaultMargin order={3}>Today, March 17, 2024</Title>
            <SymptomSharkLogToday previewState={"withLog"} onClick={(d) => { }} />
            <Card>
                <ActivityThresholdsToday dataTypes={dataTypes} previewState='Default' />
            </Card>
            <Card>
                <Title defaultMargin order={4}>Heart Rate</Title>
                <IntradayHeartRateChart />
            </Card>
            <Title defaultMargin style={{ marginTop: "24px" }} order={3}>Pacing Notifications</Title>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faHeartbeat} color="var(--mdhui-color-danger)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>120 bpm</Title>
                    <div style={{ fontSize: ".75em", color: "var(--mdhui-text-color-2)" }}>8:30pm  • Heart Rate</div>
                </Action>
            </Card>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faPersonRunning} color="rgba(255, 166, 102, 1)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>3,141 / 3,000 steps (over 100%)</Title>
                    <div style={{ fontSize: ".75em", color: "var(--mdhui-text-color-2)" }}>2:45pm  • Steps</div>
                </Action>
            </Card>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faPersonRunning} color="rgba(255, 166, 102, 1)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>2,279 / 3,000 steps (over 75%)</Title>
                    <div style={{ fontSize: ".75em", color: "var(--mdhui-text-color-2)" }}>11:30am  • Steps</div>
                </Action>
            </Card>
        </Layout>
    )
}