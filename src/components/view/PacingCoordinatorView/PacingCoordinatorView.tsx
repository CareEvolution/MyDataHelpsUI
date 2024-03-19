

import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, WeekCalendar, getDayKey, SparkBarChartBar, SegmentedControl, Section } from "../../.."
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
import PacingHomeView from '../PacingHomeView/PacingHomeView';
import PacingCalendarView from '../PacingCalendarView/PacingCalendarView';
import PacingNotificationsView from '../PacingNotificationsView/PacingNotificationsView';

export interface PacingCoordinatorViewProps {

}

export default function (props: PacingCoordinatorViewProps) {
    let [selectedView, setSelectedView] = React.useState<"Daily" | "Monthly" | "Notifications">("Daily");

    return (
        <Layout className='recover' colorScheme={"auto"}>
            <Section noTopMargin style={{ background: "none", padding:"16px", marginBottom:"0" }}>
                <Title order={3} style={{}}>John Doe</Title>
                <div style={{color:"#555", fontSize:".75em", marginBottom:"16px"}}>Pacing Review</div>
                <SegmentedControl variant='default'
                    segments={[{ key: 'Daily', title: 'Daily' }, { key: 'Monthly', title: 'Monthly' }, { key: 'Notifications', title: 'Notifications' }]}
                    selectedSegment={selectedView}
                    onSegmentSelected={(s) => setSelectedView(s as "Daily" | "Monthly" | "Notifications")} />
            </Section>
            {selectedView === "Daily" && <PacingHomeView />}
            {selectedView === "Monthly" && <PacingCalendarView previewState='default' onDaySelected={() => { }} onSymptomSelected={() => { }} />}
            {selectedView === "Notifications" && <PacingNotificationsView />}
        </Layout>
    )
}