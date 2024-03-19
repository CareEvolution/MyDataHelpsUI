

import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, SymptomSharkLogToday, Title, DateRangeCoordinator, DateRangeNavigator, ActivityThresholdsToday, DailyDataType, Action, WeekCalendar, getDayKey, SparkBarChartBar, SegmentedControl, Section } from "../../.."
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
import ExerciseActivityView from '../ExerciseActivityView/ExerciseActivityView';

export interface ExerciseCoordinatorViewProps {

}

export default function (props: ExerciseCoordinatorViewProps) {
    let [selectedView, setSelectedView] = React.useState<"Exercise" | "Activity">("Exercise");

    return (
        <Layout className='recover' colorScheme={"auto"}>
            <Section noTopMargin style={{ background: "none", padding: "16px", marginBottom: "0" }}>
                <Title order={3} style={{}}>John Doe</Title>
                <div style={{ color: "#555", fontSize: ".75em", marginBottom: "16px" }}>Activity Review</div>
                <SegmentedControl variant='default'
                    segments={[{ key: 'Exercise', title: 'Exercise' }, { key: 'Activity', title: 'Fitbit Activity' }]}
                    selectedSegment={selectedView}
                    onSegmentSelected={(s) => setSelectedView(s as "Exercise" | "Activity")} />
            </Section>
            {selectedView === "Exercise" && <>
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
                <Card>
                    <Action title="Cycling" subtitle='04/12/24 12:20pm • 25 minutes' indicator={<></>} icon={<FontAwesomeSvgIcon icon={faCircleCheck} color='var(--mdhui-color-success)' />}>
                        <StatBlock alternating labelWidth='200px' style={{ fontSize: ".88em", color: "#555", marginTop: "8px" }} size='lg' stats={[
                            { label: "Max Heart Rate", value: "152 bpm" },
                            { label: "Exertion", value: "6 / 10" },
                            { label: "Breathlessness", value: "6 / 10" },
                        ]}></StatBlock>
                    </Action>
                </Card>
            </>
            }
            {selectedView === "Activity" && <ExerciseActivityView />}
        </Layout>
    )
}