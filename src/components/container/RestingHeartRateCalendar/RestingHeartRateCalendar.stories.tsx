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
  showPreviewData: "WithData",
};

export const NoData = Template.bind({});
NoData.args = {
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

export const Live = Template.bind({});
Live.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  dataTypeSource: "Combined"
};

Live.argTypes = {
  dataTypeSource: {
    name: 'dataTypeSource',
    control: 'radio',
    options: ["Combined", "AppleHealth", "Fitbit", "Garmin"],
    defaultValue: "Combined"
  }
};
