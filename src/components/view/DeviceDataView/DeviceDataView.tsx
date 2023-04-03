import React from 'react'
import MyDataHelps from "@careevolution/mydatahelps-js"
import { PlatformSpecificContent, Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, DeviceDataMonthCharts, Action } from "../.."
import language from '../../../helpers/language'

export interface DeviceDataViewProps {
	preview?: boolean;
}

export default function (props: DeviceDataViewProps) {
	return (
		<Layout  colorScheme="auto">
			<StatusBarBackground />
			<PlatformSpecificContent platforms={["Android"]}>
				<Card>
					<Action title="Google Fit" subtitle={language["google-fit-share"]} onClick={() => MyDataHelps.showGoogleFitSettings()} />
				</Card>
			</PlatformSpecificContent>
			<Card>
				<ConnectFitbit previewState={props.preview ? "notConnected" : undefined} />
			</Card>
			<Card>
				<FitbitDevices previewState={props.preview ? "connected" : undefined} />
			</Card>
			<Card allowOverflow={true}>
				<DeviceDataMonthCharts previewState={props.preview ? "Default" : undefined} />
			</Card>
		</Layout>
	)
}