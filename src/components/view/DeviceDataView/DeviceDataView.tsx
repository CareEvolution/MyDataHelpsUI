import React from 'react'
import { Layout, Card, StatusBarBackground, FitbitDevices, DeviceDataMonthCharts, GarminDevices, ConnectDevicesMenu } from "../.."
import ConnectDevicesCTA from '../../container/ConnectDevicesCTA/ConnectDevicesCTA';

export interface DeviceDataViewProps {
	preview?: boolean;
	colorScheme?: "auto" | "light" | "dark";
}

export default function (props: DeviceDataViewProps) {
	return (
		<Layout  colorScheme={props.colorScheme ?? "auto"}>
			<StatusBarBackground />
			<Card allowOverflow={true}>
				<DeviceDataMonthCharts previewState={props.preview ? "Default" : undefined} />
			</Card>
			<Card>
				<FitbitDevices previewState={props.preview ? "connected" : undefined} />
			</Card>
			<Card>
				<GarminDevices previewState={props.preview ? "connected" : undefined} />
			</Card>
			<Card>
				<ConnectDevicesCTA previewState={props.preview ? "Web" : undefined} />
			</Card>
		</Layout>
	)
}