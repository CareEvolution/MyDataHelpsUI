import React from "react";
import TermInformationView, { TermInformationViewProps } from "./TermInformationView";

export default { title: "View/TermInformationView", component: TermInformationView, parameters: { layout: 'fullscreen' } };
let render = (args: TermInformationViewProps) => <TermInformationView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};

export const Live = {
    args: {},
    render: render
};