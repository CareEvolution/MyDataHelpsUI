import React from 'react'
import MyDataHelps from "@careevolution/mydatahelps-js"
import { PlatformSpecificContent, Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, DeviceDataMonthCharts, Action, ConnectGarmin, GarminDevices } from "../.."
import language from '../../../helpers/language'

export interface DeviceDataViewProps {
	preview?: boolean;
}

export default function (props: DeviceDataViewProps) {
	return (
		<Layout>
			<StatusBarBackground color="var(--main-bg-color)" />
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
			<Card>
				<ConnectGarmin previewState={props.preview ? "notConnected" : undefined} />
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