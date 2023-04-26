import React from 'react'
import { Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, FitbitMonthCharts } from "../.."
import { ConnectFitbitPreviewState } from "../../container/ConnectFitbit/ConnectFitbit";
import { ConnectedDevicesPreviewState } from '../../container/ConnectedDevices/ConnectedDevices';
import { MonthChartsPreviewState } from '../../container/MonthCharts/MonthCharts';

export interface FitbitViewProps {
	connectPreview?: ConnectFitbitPreviewState,
	devicesPreview?: ConnectedDevicesPreviewState,
	chartsPreview?: MonthChartsPreviewState
	colorScheme?: "auto" | "light" | "dark";
}

export default function (props: FitbitViewProps) {
	return (
		<Layout colorScheme={props.colorScheme ?? "auto"}>
			<StatusBarBackground />
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