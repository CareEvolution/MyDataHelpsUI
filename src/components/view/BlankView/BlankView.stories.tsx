import React from "react";
import { Button, Card, TextBlock } from "../../presentational";
import BlankView, { BlankViewProps } from "./BlankView";

export default { title: "View/BlankView", component: BlankView, parameters: { layout: 'fullscreen' } };
let render = (args: BlankViewProps) => <BlankView {...args} />
export const titleOnly = {
    args: { title: "Surveys" },
    render: render
};
export const withNavigationButtons = {
    args: { title: "Surveys", subtitle: "12 surveys complete", showBackButton: true, showCloseButton: true },
    render: render
};
export const darkColorScheme = {
    args: { title: "Surveys", subtitle: "12 surveys complete", showBackButton: true, showCloseButton: true, colorScheme: "dark" },
    render: render
};

export const customPrimaryColor = {
    args: { title: "Surveys", subtitle: "12 surveys complete", showBackButton: true, showCloseButton: true, primaryColor: "red", children: <Card><TextBlock><Button onClick={() => { }}>Click Me</Button></TextBlock></Card> },
    render: render
};