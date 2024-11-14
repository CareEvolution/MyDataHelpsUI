import React, { useEffect, useState } from 'react'
import { Layout, Card, StatusBarBackground, ConnectGarmin, GarminDevices, GarminMonthCharts, LoadingIndicator } from "../.."
import { ConnectGarminPreviewState } from "../../container/ConnectGarmin/ConnectGarmin";
import { ConnectedDevicesPreviewState } from '../../container/ConnectedDevices/ConnectedDevices';
import { MonthChartsPreviewState } from '../../container/MonthCharts/MonthCharts';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface GarminViewProps {
	connectPreview?: ConnectGarminPreviewState,
	devicesPreview?: ConnectedDevicesPreviewState,
	chartsPreview?: MonthChartsPreviewState,
	garminProviderID?: number
}

/**
 * This out of the box view shows the Garmin connection status, a list of the participant's Garmin devices, and 2 line charts showing monthly steps and resting heart rate.
**/
export default function GarminView(props: GarminViewProps) {
	var [viewIsReady, setViewIsReady] = useState(false);
	useEffect(() => {
		MyDataHelps.connect().then(() => {
			setViewIsReady(true);
		})
	}, [])


	return (
		<Layout>
			<StatusBarBackground color="var(--main-bg-color)" />
			{viewIsReady &&
				<>
					<Card>
						<ConnectGarmin previewState={props.connectPreview} garminProviderID={props.garminProviderID} disabledBehavior="displayError" />
					</Card>
					<Card>
						<GarminDevices previewState={props.devicesPreview} />
					</Card>
					<Card allowOverflow={true}>
						<GarminMonthCharts previewState={props.chartsPreview} />
					</Card>
				</>
			}
			{!viewIsReady &&
				<LoadingIndicator />
			}
		</Layout>
	)
}