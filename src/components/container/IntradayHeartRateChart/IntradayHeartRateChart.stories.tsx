import React from "react";
import { DailyDataQueryResult, DailyDataType } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import IntradayHeartRateChart, { IntradayHeartRateChartProps } from "./IntradayHeartRateChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";

export default { title: "Container/IntradayHeartRateChart", component: IntradayHeartRateChart, parameters: { layout: 'fullscreen' } };
let render = (args: IntradayHeartRateChartProps) => <Layout colorScheme="auto"><Card><IntradayHeartRateChart {...args} /></Card></Layout>

export const Default = {
    render: render
};