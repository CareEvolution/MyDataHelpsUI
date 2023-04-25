import React from 'react'
import { Layout, Card, StatusBarBackground, ConnectGarmin, GarminDevices, GarminMonthCharts } from "../.."
import { ConnectGarminPreviewState } from "../../container/ConnectGarmin/ConnectGarmin";
import { ConnectedDevicesPreviewState } from '../../container/ConnectedDevices/ConnectedDevices';
import { MonthChartsPreviewState } from '../../container/MonthCharts/MonthCharts';

export interface GarminViewProps {
	connectPreview?: ConnectGarminPreviewState,
	devicesPreview?: ConnectedDevicesPreviewState,
	chartsPreview?: MonthChartsPreviewState,
	garminProviderID?: number
}

export default function (props: GarminViewProps) {
	return (
		<Layout>
			<StatusBarBackground color="var(--main-bg-color)" />
			<Card>
				<ConnectGarmin previewState={props.connectPreview} garminProviderID={props.garminProviderID} disabledBehavior="displayError" />
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