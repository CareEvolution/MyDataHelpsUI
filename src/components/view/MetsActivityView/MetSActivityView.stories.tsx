import React from "react";
import { Button, Card, TextBlock } from "../../presentational";
import MetSActivityView, { MetSActivityViewProps } from "./MetSActivityView";

export default { title: "View/MetSActivity", component: MetSActivityView, parameters: { layout: 'fullscreen' } };
let render = (args: MetSActivityViewProps) => <MetSActivityView {...args} />
export const titleOnly = {
    args: {},
    render: render
};