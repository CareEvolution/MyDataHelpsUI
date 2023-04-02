import React from 'react'
import { Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, FitbitMonthCharts } from "../.."
import { ConnectFitbitPreviewState } from "../../container/ConnectFitbit/ConnectFitbit";
import { FitbitDevicesPreviewState } from "../../container/FitbitDevices/FitbitDevices";
import { FitbitMonthChartsPreviewState } from "../../container/FitbitMonthCharts/FitbitMonthCharts";

export interface FitbitViewProps {
	connectPreview?: ConnectFitbitPreviewState,
	devicesPreview?: FitbitDevicesPreviewState,
	chartsPreview?: FitbitMonthChartsPreviewState
}

export default function (props: FitbitViewProps) {
	return (
		<Layout autoDarkMode>
			<StatusBarBackground color="var(--main-bg-color)" />
			<Card>
				<ConnectFitbit previewState={props.connectPreview} disabledBehavior="displayError" />
			</Card>
			<Card>
				<FitbitDevices previewState={props.devicesPreview} />
			</Card>
			<Card allowOverflow={true}>
				<FitbitMonthCharts previewState={props.chartsPreview} />
			</Card>
		</Layout>
	)
}