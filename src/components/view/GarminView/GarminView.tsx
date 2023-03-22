import React from 'react'
import { Layout, Card, StatusBarBackground, ConnectGarmin, GarminDevices, GarminMonthCharts } from "../.."
import { ConnectGarminPreviewState } from "../../container/ConnectGarmin/ConnectGarmin";
import { GarminDevicesPreviewState } from "../../container/GarminDevices/GarminDevices";
import { GarminMonthChartsPreviewState } from "../../container/GarminMonthCharts/GarminMonthCharts";

export interface GarminViewProps {
	connectPreview?: ConnectGarminPreviewState,
	devicesPreview?: GarminDevicesPreviewState,
	chartsPreview?: GarminMonthChartsPreviewState
}

export default function (props: GarminViewProps) {
	return (
		<Layout>
			<StatusBarBackground color="var(--main-bg-color)" />
			<Card>
				<ConnectGarmin previewState={props.connectPreview} disabledBehavior="displayError" />
			</Card>
			<Card>
				<GarminDevices previewState={props.devicesPreview} />
			</Card>
			<Card allowOverflow={true}>
				<GarminMonthCharts previewState={props.chartsPreview} />
			</Card>
		</Layout>
	)
}