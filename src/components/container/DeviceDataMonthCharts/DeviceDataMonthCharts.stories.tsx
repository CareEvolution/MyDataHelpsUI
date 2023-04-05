import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeviceDataMonthCharts, { DeviceDataMonthChartsProps } from "./DeviceDataMonthCharts"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/DeviceDataMonthCharts",
	component: DeviceDataMonthCharts,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DeviceDataMonthCharts>;

const Template: ComponentStory<typeof DeviceDataMonthCharts> = (args: DeviceDataMonthChartsProps) =>
	<Layout colorScheme="auto">
		<Card allowOverflow={true}>
			<DeviceDataMonthCharts {...args} />
		</Card>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	previewState: "Default"
};

export const NoData = Template.bind({});
NoData.args = {
	previewState: "NoData"
};