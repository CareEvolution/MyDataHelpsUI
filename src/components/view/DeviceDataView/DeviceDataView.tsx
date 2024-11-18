import React from 'react'
import { Layout, Card, StatusBarBackground, FitbitDevices, DeviceDataMonthCharts, GarminDevices, ConnectDevicesMenu } from "../.."

export interface DeviceDataViewProps {
	preview?: boolean;
	colorScheme?: "auto" | "light" | "dark";
}

/**
 * This view charts a few commonly requested device data types.
 * It includes steps and resting heart rate from Fitbit and Garmin, steps and distance traveled from Apple Health, and steps from Google Fit.
 * It also allows you to manage your device data connections.
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