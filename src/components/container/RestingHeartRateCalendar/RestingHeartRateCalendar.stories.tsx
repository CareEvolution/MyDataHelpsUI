import React from "react"
import RestingHeartRateCalendar, { RestingHeartRateCalendarProps } from "./RestingHeartRateCalendar"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof RestingHeartRateCalendar> = {
	title: "Container/RestingHeartRateCalendar",
	component: RestingHeartRateCalendar,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof RestingHeartRateCalendar>;

const render = (args: RestingHeartRateCalendarProps) =>
	<Layout colorScheme="auto">
		<Card>
			<RestingHeartRateCalendar  {...args} />
		</Card>
	</Layout>;

const baseArgs: RestingHeartRateCalendarProps = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showPreviewData: "WithData"
};

export const Default: Story = {
  args: baseArgs,
  render: render
}

export const NoData: Story = {
  args: {...baseArgs, showPreviewData: "NoData"},
  render: render
}

export const Loading: Story = {
  args: {...baseArgs, showPreviewData: "Loading"},
  render: render
}

export const Live: Story = {
  args: {...baseArgs, showPreviewData: undefined, dataTypeSource: "Combined"},
  render: render
}

Live.argTypes = {
  dataTypeSource: {
    name: 'dataTypeSource',
    control: 'radio',
    options: ["Combined", "AppleHealth", "Fitbit", "Garmin"],
    defaultValue: "Combined"
  }
};
