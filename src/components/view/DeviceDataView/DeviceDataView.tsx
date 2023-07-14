import React from 'react'
import MyDataHelps from "@careevolution/mydatahelps-js"
import { PlatformSpecificContent, Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, DeviceDataMonthCharts, Action, ConnectGarmin, GarminDevices } from "../.."
import language from '../../../helpers/language'
import ConnectDevices from '../../container/ConnectDevices/ConnectDevices';

export interface DeviceDataViewProps {
	preview?: boolean;
	colorScheme?: "auto" | "light" | "dark";
}

export default function (props: DeviceDataViewProps) {
	return (
		<Layout colorScheme={props.colorScheme ?? "auto"}>
			<StatusBarBackground />
			<ConnectDevices />
			<Card>
				<FitbitDevices previewState={props.preview ? "connected" : undefined} />
			</Card>
			<Card>
				<GarminDevices previewState={props.preview ? "connected" : undefined} />
			</Card>
			<Card allowOverflow={true}>
				<DeviceDataMonthCharts previewState={props.preview ? "Default" : undefined} />
			</Card>
		</Layout>
	)
}