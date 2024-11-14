import React from 'react'
import { Layout, Card, StatusBarBackground, FitbitDevices, DeviceDataMonthCharts, GarminDevices, ConnectDevicesMenu } from "../.."

export interface DeviceDataViewProps {
	preview?: boolean;
	colorScheme?: "auto" | "light" | "dark";
}

/**
 * This out-of-the-box view displays all device data in a convenient monthly chart.
 * It includes step counts and resting heart rate from Fitbit and Garmin, as well as steps and distance traveled (in miles) from Apple Health.
 * Step data from Google Fit is also shown.
 */
export default function DeviceDataView(props: DeviceDataViewProps) {
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
				<ConnectDevicesMenu previewState={props.preview ? "Web" : undefined} />
			</Card>
		</Layout>
	)
}