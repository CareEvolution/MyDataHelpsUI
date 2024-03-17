import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";
import AppDownload from "../../container/AppDownload";
import { startOfDay } from 'date-fns';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faHeartbeat, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import IntradayHeartRateChart from '../../container/IntradayHeartRateChart/IntradayHeartRateChart';

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
    return (
        <Layout colorScheme={"auto"}>
            <StatusBarBackground color='#FFFFFF' />
            <DateRangeNavigator variant='rounded' intervalStart={startOfDay(new Date())} onIntervalChange={() => { }} intervalType='Day' />
            <SymptomSharkLogToday previewState={"withLog"} onClick={(d) => { }} />
            <Card>
                <ActivityThresholdsToday dataTypes={dataTypes} previewState='Default' />
            </Card>
            <Card>
                <Title defaultMargin order={4}>Heart Rate</Title>
                <IntradayHeartRateChart />
            </Card>
            <Title defaultMargin style={{marginTop:"24px"}} order={3}>Notifications</Title>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faHeartbeat} color="var(--mdhui-color-danger)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>120 bpm</Title>
                    <div style={{fontSize:".75em", color:"var(--mdhui-text-color-2)"}}>8:30pm  • Heart Rate</div>
                </Action>
            </Card>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faPersonRunning} color="rgba(255, 166, 102, 1)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>3,141 / 3,000 steps (over 100%)</Title>
                    <div style={{fontSize:".75em", color:"var(--mdhui-text-color-2)"}}>2:45pm  • Steps</div>
                </Action>
            </Card>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faPersonRunning} color="rgba(255, 166, 102, 1)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>2,279 / 3,000 steps (over 75%)</Title>
                    <div style={{fontSize:".75em", color:"var(--mdhui-text-color-2)"}}>11:30am  • Steps</div>
                </Action>
            </Card>
        </Layout>
    )
}