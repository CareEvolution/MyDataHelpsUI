import React from "react"
import Layout from "../../presentational/Layout"
import DateRangeTitle, { DateRangeTitleProps } from "./DateRangeTitle";
import DateRangeCoordinator from "../DateRangeCoordinator";

export default {
    title: "Container/DateRangeTitle",
    component: DateRangeTitle,
    parameters: {
        layout: 'fullscreen',
    }
};

export const Week = {
    args: {
    },
    render: (args: DateRangeTitleProps) => <Layout colorScheme="auto">
        <DateRangeCoordinator intervalType="Week">
            <DateRangeTitle {...args} defaultMargin />
        </DateRangeCoordinator>
    </Layout>
};


export const Month = {
    args: {
    },
    render: (args: DateRangeTitleProps) => <Layout colorScheme="auto">
        <DateRangeCoordinator intervalType="Month">
            <DateRangeTitle {...args} defaultMargin />
        </DateRangeCoordinator>
    </Layout>
};


export const Day = {
    args: {
    },
    render: (args: DateRangeTitleProps) => <Layout colorScheme="auto">
        <DateRangeCoordinator intervalType="Day">
            <DateRangeTitle {...args} defaultMargin />
        </DateRangeCoordinator>
    </Layout>
};
