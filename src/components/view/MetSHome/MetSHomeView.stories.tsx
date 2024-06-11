import React from "react";
import { Button, Card, TextBlock } from "../../presentational";
import MetSHomeView, { MetSHomeViewProps } from "./MetSHomeView";

export default { title: "View/MetSHome", component: MetSHomeView, parameters: { layout: 'fullscreen' } };
let render = (args: MetSHomeViewProps) => <MetSHomeView {...args} />
export const titleOnly = {
    args: {},
    render: render
};