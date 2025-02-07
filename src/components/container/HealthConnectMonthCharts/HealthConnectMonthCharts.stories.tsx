import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HealthConnectMonthCharts, {
  HealthConnectMonthChartsProps,
} from "./HealthConnectMonthCharts";
import Card from "../../presentational/Card";
import Layout from "../../presentational/Layout";

export default {
  title: "Container/HealthConnectMonthCharts",
  component: HealthConnectMonthCharts,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HealthConnectMonthCharts>;

const Template: ComponentStory<typeof HealthConnectMonthCharts> = (
  args: HealthConnectMonthChartsProps
) => (
  <Layout>
    <Card>
      <HealthConnectMonthCharts {...args} />
    </Card>
  </Layout>
);

export const NotEnabled = Template.bind({});
NotEnabled.args = {
  previewState: "notEnabled",
};

export const NotConnected = Template.bind({});
NotConnected.args = {
  previewState: "notConnected",
};

export const Connected = Template.bind({});
Connected.args = {
  previewState: "connected",
};

export const Live = Template.bind({});
Live.args = {};
