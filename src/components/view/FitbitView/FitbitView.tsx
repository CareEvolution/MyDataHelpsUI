import React, { useEffect, useState } from 'react'
import { Layout, Card, StatusBarBackground, ConnectFitbit, FitbitDevices, FitbitMonthCharts, LoadingIndicator } from "../.."
import { ConnectFitbitPreviewState } from "../../container/ConnectFitbit/ConnectFitbit";
import { ConnectedDevicesPreviewState } from '../../container/ConnectedDevices/ConnectedDevices';
import { MonthChartsPreviewState } from '../../container/MonthCharts/MonthCharts';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface FitbitViewProps {
	connectPreview?: ConnectFitbitPreviewState,
	devicesPreview?: ConnectedDevicesPreviewState,
	chartsPreview?: MonthChartsPreviewState
	colorScheme?: "auto" | "light" | "dark";
}

/**
 * This view shows Fitbit connection status, a list of the participant's Fitbit devices, and 2 line charts showing monthly steps and resting heart rate.
*/
export default function FitbitView (props: FitbitViewProps) {
	var [viewIsReady, setViewIsReady] = useState(false);
	useEffect(() => {
		MyDataHelps.connect().then(() => {
			setViewIsReady(true);
		})
	}, [])

	return (
		<Layout colorScheme={props.colorScheme ?? "auto"}>
			<StatusBarBackground />
			{viewIsReady &&
				<>
					<Card>
						<ConnectFitbit previewState={props.connectPreview} disabledBehavior="displayError" />
					</Card>
					<Card>
						<FitbitDevices previewState={props.devicesPreview} />
					</Card>
					<Card allowOverflow={true}>
						<FitbitMonthCharts previewState={props.chartsPreview} />
					</Card>
				</>
			}
			{!viewIsReady &&
				<LoadingIndicator />
			}
		</Layout>
	)
}