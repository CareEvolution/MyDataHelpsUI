
import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, TextBlock, BlankView } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";
import AppDownload from "../../container/AppDownload";
import { startOfDay } from 'date-fns';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faHeartbeat, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import IntradayHeartRateChart from '../../container/IntradayHeartRateChart/IntradayHeartRateChart';
import "./PacingNotificationsView.css"
import "../recover.css"

export interface PacingNotificationsViewProps {

}

export default function (props: PacingNotificationsViewProps) {
    return (
        <BlankView className="recover" title='Pacing Notifications' colorScheme={"auto"}>
            <Title defaultMargin order={3}>Today</Title>
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
            <Title defaultMargin order={3} style={{marginTop:"24px"}}>Yesterday</Title>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faPersonRunning} color="rgba(255, 166, 102, 1)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>120 / 150 Active Minutes (Over 75%)</Title>
                    <div style={{fontSize:".75em", color:"var(--mdhui-text-color-2)"}}>2:45pm  • Active Minutes</div>
                </Action>
            </Card>
            <Card>
                <Action icon={<FontAwesomeSvgIcon icon={faHeartbeat} color="var(--mdhui-color-danger)" />} onClick={() => { }} indicator={<></>}>
                    <Title order={4}>127 bpm</Title>
                    <div style={{fontSize:".75em", color:"var(--mdhui-text-color-2)"}}>5:22pm  • Heart Rate</div>
                </Action>
            </Card>
        </BlankView>
    )
}