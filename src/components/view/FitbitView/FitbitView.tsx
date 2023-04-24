import React from 'react'
import { Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, FitbitMonthCharts } from "../.."
import { ConnectFitbitPreviewState } from "../../container/ConnectFitbit/ConnectFitbit";
import { FitbitMonthChartsPreviewState } from "../../container/FitbitMonthCharts/FitbitMonthCharts";
import { ConnectedDevicesPreviewState } from '../../container/ConnectedDevices/ConnectedDevices';

export interface FitbitViewProps {
	connectPreview?: ConnectFitbitPreviewState,
	devicesPreview?: ConnectedDevicesPreviewState,
	chartsPreview?: FitbitMonthChartsPreviewState
}

export default function (props: FitbitViewProps) {
	return (
		<Layout>
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