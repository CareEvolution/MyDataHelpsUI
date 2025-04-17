import BloodPressureReading, { BloodPressureReadingProps } from "./BloodPressureReading";
import { Card, Layout } from "../../presentational";
import React from "react";

export default {
    title: "Presentational/BloodPressureReading",
    component: BloodPressureReading,
    parameters: {
        layout: 'fullscreen',
    }
};
let render = (args: BloodPressureReadingProps) => <Layout colorScheme="auto">
    <Card><BloodPressureReading {...args} /></Card>
</Layout>;


export const Elevated = {
    args: {
        systolic: 124,
        diastolic: 77,
        date: "March 30, 2023 8:52 AM"
    },
    render: render
};