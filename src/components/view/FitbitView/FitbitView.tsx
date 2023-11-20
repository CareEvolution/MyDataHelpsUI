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

export default function (props: FitbitViewProps) {
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