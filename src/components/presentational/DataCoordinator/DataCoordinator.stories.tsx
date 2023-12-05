import React from "react";
import { Layout } from "../../presentational";
import DataCoordinator, { DataCoordinatorProps } from "./DataCoordinator";
import DataItem from "../DataItem/DataItem";

export default {
    title: "Presentational/DataCoordinator",
    component: DataCoordinator,
    parameters: {layout: 'fullscreen'}
};

let render = (args: DataCoordinatorProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <DataCoordinator {...args}>
        <DataItem dataKey="preview"/>
    </DataCoordinator>
</Layout>;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};
