import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, GlucoseChart, Title, TextBlock, Button, ConnectEhr, DateRangeCoordinator, DateRangeTitle, Section, SingleDataPoint, ActivityMeter, Action, getColorFromAssortment, ValueSelector, WeekCalendar, SparkBarChart, RelativeActivityDataType, DailyDataType } from "../../.."
import MyDataHelps from '@careevolution/mydatahelps-js'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { IconDefinition, fa1, fa2, fa3, fa4, faBed, faBoltLightning, faBowlFood, faClose, faCookie, faDroplet, faFileEdit, faHamburger, faShoePrints, faTrash, faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { transform } from 'lodash'
import { add, startOfDay } from 'date-fns'
import "./MetSHomeView.css"
import RelativeActivityDateRangeCoordinator from '../../container/RelativeActivityDayCoordinator/RelativeActivityDayCoordinator'

export interface MetSHomeViewProps {

}


export default function (props: MetSHomeViewProps) {

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
			<RelativeActivityDateRangeCoordinator dataTypes={dailyDataTypes} previewState='default' keyType={dailyDataTypes[3]} keyTypeIcon={<FontAwesomeSvgIcon icon={faDroplet} color={"#e35c33"} />}>
				<DateRangeTitle defaultMargin />
				<Card>
					<GlucoseChart previewState='with data and meals' />
					<div style={{ display: "flex", gap: "16px", margin: "16px" }}>
						<div style={{ width: "50%" }}>
							<ActivityMeter label='Blood Glucose Range' value='127 - 190 mg/dL' icon={<FontAwesomeSvgIcon icon={faDroplet} />} color="#e35c33" />
						</div>
						<div style={{ width: "50%" }}>
							<ActivityMeter label='Avg Blood Glucose' value='160 mg/dL' icon={<FontAwesomeSvgIcon icon={faDroplet} />} color="#e35c33" />
						</div>
					</div>
					<div style={{ display: "flex", gap: "16px", margin: "16px" }}>
						<div style={{ width: "50%" }}>
							<ActivityMeter label='Steps' value='6,253' icon={<FontAwesomeSvgIcon icon={faShoePrints} />} color="#f5b722" />
						</div>
						<div style={{ width: "50%" }}>
							<ActivityMeter label='Sleep' value='7h 25m' icon={<FontAwesomeSvgIcon icon={faBed} />} color="#7b88c6" />
						</div>
					</div>
					<div style={{ margin: "16px" }}>
						<div style={{ fontSize: ".7em", textTransform: "uppercase", color: "var(--mdhui-text-color-2)" }}>
							Overall Stress
						</div>
						<input style={{ width: "100%", marginTop: "8px" }} type="range" id="stress" name="stress" min="0" max="6" step="1" value={undefined} list="markers" />
						<datalist id="markers">
							<option value="0"></option>
							<option value="1"></option>
							<option value="2"></option>
							<option value="3"></option>
							<option value="4"></option>
							<option value="5"></option>
							<option value="6"></option>
						</datalist>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ fontSize: ".7em", color: "var(--mdhui-text-color-2)" }}>
								No Stress
							</div>
							<div style={{ fontSize: ".7em", color: "var(--mdhui-text-color-2)" }}>
								Extremely Stressed
							</div>
						</div>
					</div>
					<div style={{ display: "flex", gap: "16px", margin: "16px" }}>
						<Button variant="light" onClick={() => { }} fullWidth={false}><FontAwesomeSvgIcon icon={faHamburger} /> Meal</Button>
						<Button variant="light" onClick={() => { }} fullWidth={false}><FontAwesomeSvgIcon icon={faWineBottle} /> Drink</Button>
						<Button variant="light" onClick={() => { }} fullWidth={false}><FontAwesomeSvgIcon icon={faCookie} /> Snack</Button>
					</div>
				</Card>
				<Card>
					<Title defaultMargin order={3} style={{ marginBottom: "-16px" }}>Meal Log</Title>
					{/* <TextBlock>No food logged. Tap the buttons below to log a meal, drink, or snack.</TextBlock> */}
					<Action bottomBorder icon={foodIcon(faHamburger, 0)} title={"Meal"} subtitle="11:45 AM" />
					<Action bottomBorder icon={foodIcon(faCookie, 1)} title={"Snack"} subtitle="2:32 PM" />
					<Action bottomBorder icon={foodIcon(faHamburger, 2)} title={"Meal"} subtitle="5:35 PM" />
					<Action bottomBorder icon={foodIcon(faWineBottle, 3)} title={"Drink"} subtitle="8:31 PM" />
				</Card>
				<Card>
					<ConnectEhr previewState='enabled' variant="medium" hideWhenConnected />
				</Card>
				<Card>
					<ConnectDevicesMenu previewState='iOS' headerVariant='medium' />
				</Card>
			</RelativeActivityDateRangeCoordinator>
		</Layout>
	)
}