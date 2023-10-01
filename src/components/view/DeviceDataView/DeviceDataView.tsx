import React from 'react'
import MyDataHelps from "@careevolution/mydatahelps-js"
import { PlatformSpecificContent, Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, DeviceDataMonthCharts, Action, ConnectGarmin, GarminDevices, ConnectDevicesMenu } from "../.."
import language from '../../../helpers/language'

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
				<ConnectDevicesMenu previewState={props.preview ? "Web" : undefined} />
			</Card>
		</Layout>
	)
}