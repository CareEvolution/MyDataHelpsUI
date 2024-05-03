import React from "react"
import Layout from "../../presentational/Layout"
import DateRangeTitle, { DateRangeTitleProps } from "./DateRangeTitle";
import DateRangeCoordinator from "../DateRangeCoordinator";

export default {
    title: "Presentational/DateRangeTitle",
    component: DateRangeTitle,
    parameters: {
        layout: 'fullscreen',
    }
};

let getRenderFunction = (intervalType: "Week" | "Day" | "Month") => (args: DateRangeTitleProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={intervalType}>
        <DateRangeTitle {...args} defaultMargin />
    </DateRangeCoordinator>
</Layout>;

export const Week = {
    args: {
    },
    render: getRenderFunction("Week")
};


export const Month = {
    args: {
    },
    render: getRenderFunction("Month")
};


export const Day = {
    args: {
    },
    render: getRenderFunction("Day")
};
