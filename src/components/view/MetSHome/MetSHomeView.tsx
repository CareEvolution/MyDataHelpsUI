import React from 'react'
import { Layout, StatusBarBackground, Card, MostRecentNotification, SurveyTaskList, ConnectFitbit, ConnectGarmin, ProjectSupport, ConnectDevicesMenu, GlucoseChart } from "../../.."

export interface MetSHomeViewProps {

}

export default function (props: MetSHomeViewProps) {

	return (
		<Layout>
			<StatusBarBackground color='#FFFFFF' />
			<Card>
				<GlucoseChart previewState='with data and meals' />

			</Card>
		</Layout>
	)
}