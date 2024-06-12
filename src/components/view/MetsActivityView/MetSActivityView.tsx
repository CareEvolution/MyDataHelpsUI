import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, GlucoseChart, Title, TextBlock, Button, ConnectEhr, DateRangeCoordinator, DateRangeTitle, Section, SingleDataPoint, ActivityMeter, Action, getColorFromAssortment, ValueSelector, WeekCalendar, SparkBarChart, RelativeActivityDataType, DailyDataType, DailyDataChart } from "../../.."
import MyDataHelps from '@careevolution/mydatahelps-js'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { IconDefinition, fa1, fa2, fa3, fa4, faBed, faBoltLightning, faBowlFood, faClose, faCookie, faDroplet, faHamburger, faShoePrints, faTrash, faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { transform } from 'lodash'
import { add, startOfDay } from 'date-fns'
import "./MetSActivityView.css"
import RelativeActivityDateRangeCoordinator from '../../container/RelativeActivityDayCoordinator/RelativeActivityDayCoordinator'

export interface MetSActivityViewProps {

}



export default function (props: MetSActivityViewProps) {

	function foodIcon(icon: IconDefinition, index: number) {
		return <div style={{ display: "flex", gap: "4px", color: "#FFF", padding: "4px", paddingLeft: "8px", paddingRight: "8px", fontSize: "15px", backgroundColor: getColorFromAssortment(index), borderRadius: "16px", alignItems: "center" }}>
			<span>{index + 1}</span>
			<FontAwesomeSvgIcon icon={icon} />
		</div>
	}


	let dailyDataTypes: RelativeActivityDataType[] = [
		{
			dailyDataType: DailyDataType.Steps,
			color: "#f5b722",
			threshold: "30DayAverage"
		},
		{
			dailyDataType: DailyDataType.SleepMinutes,
			color: "#7b88c6",
			threshold: "30DayAverage"
		},
		{
			dailyDataType: DailyDataType.GarminMaxStressLevel,
			color: "#e35c33",
			threshold: "30DayAverage"
		},
		{
			dailyDataType: DailyDataType.AppleHealthBloodGlucose,
			color: "#e35c33",
			threshold: "30DayAverage"
		}
	]

	return (
		<Layout>
			<StatusBarBackground color='#FFFFFF' />
			{/* <Card>
				<Title image={<img src="https://orgimages.careevolutionapps.com/d1ff5a48-dd5d-4171-84d6-321d085e9746/082917c8-dbcf-4504-8fe4-3ed9972e284b.png"></img>}
					defaultMargin
					order={3}
					imageAlignment="top"
					autosizeImage
				>Connect to Dexcom</Title>
				<TextBlock>To get started, connect your Dexcom account.</TextBlock>
				<Button defaultMargin onClick={() => MyDataHelps.connectExternalAccount(564)}>Connect Dexcom Account</Button>
			</Card> */}

			<DateRangeCoordinator intervalType="Month">
				<Section noTopMargin>
					<DailyDataChart
						title='Avg. Blood Glucose'
						previewState='default'
						dailyDataType={DailyDataType.AppleHealthBloodGlucose}
						chartType='Bar'
						options={{ barColor: "#e35c33" }}
					/>
					<DailyDataChart
						title='Steps'
						previewState='default'
						dailyDataType={DailyDataType.Steps}
						chartType='Bar'
						options={{ barColor: "#f5b722" }}
					/>
					<DailyDataChart
						title='Sleep'
						previewState='default'
						dailyDataType={DailyDataType.SleepMinutes}
						chartType='Bar'
						options={{ barColor: "#7b88c6" }}
					/>
					<DailyDataChart
						title='Stress'
						previewState='default'
						dailyDataType={DailyDataType.GarminMaxStressLevel}
						chartType='Bar'
						options={{ barColor: "#e35c33" }}
					/>
				</Section>
			</DateRangeCoordinator>
		</Layout>   
	);
}