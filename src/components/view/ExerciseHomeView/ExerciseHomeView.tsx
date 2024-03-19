

import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, WeekCalendar, getDayKey, SparkBarChartBar, SegmentedControl, Section } from "../../.."
import MyDataHelps, { NotificationType } from "@careevolution/mydatahelps-js"
import language from "../../../helpers/language"
import ConnectEhr from "../../container/ConnectEhr";
import { ConnectEhrApplicationUrl } from "../../container/ConnectEhr/ConnectEhr";
import AppDownload from "../../container/AppDownload";
import { add, isToday, startOfDay, startOfWeek } from 'date-fns';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faCircleExclamation, faCirclePlus, faHeartbeat, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import IntradayHeartRateChart from '../../container/IntradayHeartRateChart/IntradayHeartRateChart';
import "../recover.css"
import DeviceActivityCalendarDay from '../../presentational/DeviceActivityCalendarDay/DeviceActivityCalendarDay';
import { demoLogEntries, demoSymptoms, demoTreatments } from '../../symptom-shark/helpers/demo-data';
import PacingHomeView from '../PacingHomeView/PacingHomeView';
import PacingCalendarView from '../PacingCalendarView/PacingCalendarView';
import PacingNotificationsView from '../PacingNotificationsView/PacingNotificationsView';
import StatBlock from '../../presentational/StatBlock/StatBlock';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

export interface ExerciseHomeViewProps {

}

export default function (props: ExerciseHomeViewProps) {
    return (
        <Layout className='recover' colorScheme={"auto"}>
            <Card>
                <Action title="Add Exercise Session" subtitle="Record your recent exercise session" icon={<FontAwesomeSvgIcon icon={faCirclePlus} color='#226198' />}></Action>
            </Card>
            <Card>
                <Action title="Feeling worse?" subtitle="Let us know if you have any new or worsening symptoms." icon={<FontAwesomeSvgIcon icon={faCircleExclamation} color='var(--mdhui-color-warning)' />}></Action>
            </Card>
            <Title defaultMargin style={{ marginTop: "24px" }} order={3}>Exercise Sessions</Title>
            <Card>
                <Action title="Running on Treadmill" subtitle='04/17/24 1:20pm • 30 minutes' indicator={<></>} icon={<FontAwesomeSvgIcon icon={faCircleCheck} color='var(--mdhui-color-success)' />}>
                    <StatBlock alternating labelWidth='200px' style={{ fontSize: ".88em", color: "#555", marginTop: "8px" }} size='lg' stats={[
                        { label: "Max Heart Rate", value: "142 bpm" },
                        { label: "Exertion", value: "5 / 10" },
                        { label: "Breathlessness", value: "6 / 10" },
                    ]}></StatBlock>
                </Action>
            </Card>
            <Card>
                <Action title="Running on Treadmill" subtitle='04/14/24 12:15pm • 22 minutes' indicator={<></>} icon={<FontAwesomeSvgIcon icon={faCircleExclamation} color='var(--mdhui-color-warning)' />}>
                    <StatBlock alternating labelWidth='200px' style={{ fontSize: ".88em", color: "#555", marginTop: "8px" }} size='lg' stats={[
                        { label: "Max Heart Rate", value: "158 bpm" },
                        { label: "Exertion", value: <>7 / 10 <FontAwesomeSvgIcon icon={faCircleExclamation} color='var(--mdhui-color-warning)' /></> },
                        { label: "Breathlessness", value: <>8 / 10 <FontAwesomeSvgIcon icon={faCircleExclamation} color='var(--mdhui-color-warning)' /></> },
                    ]}></StatBlock>
                </Action>
            </Card>
        </Layout>
    )
}