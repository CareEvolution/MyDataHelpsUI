import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import RestingHeartRateCalendar, { RestingHeartRateCalendarProps } from "./RestingHeartRateCalendar"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/RestingHeartRateCalendar",
	component: RestingHeartRateCalendar,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof RestingHeartRateCalendar>;

const Template: ComponentStory<typeof RestingHeartRateCalendar> = (args: RestingHeartRateCalendarProps) =>
	<Layout colorScheme="auto">
		<Card>
			<RestingHeartRateCalendar  {...args} />
		</Card>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "NoData",
};

export const Loading = Template.bind({});
Loading.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "Loading",
};

export const SampleData = Template.bind({});
SampleData.args = {
  year: 2022,
  month: 3,
  showPreviewData: "WithData",
};

export const Combined = Template.bind({});
Combined.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "Combined",
};

export const AppleHealth = Template.bind({});
AppleHealth.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "AppleHealth",
};

export const Fitbit = Template.bind({});
Fitbit.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "Fitbit",
};

export const Garmin = Template.bind({});
Garmin.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "Garmin",
};


