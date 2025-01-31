import React from "react";
import DeviceActivityView, { DeviceActivityViewProps } from "./DeviceActivityView";

export default { title: "View/DeviceActivityView", component: DeviceActivityView, parameters: { layout: 'fullscreen' } };
let render = (args: DeviceActivityViewProps) => <DeviceActivityView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};

export const Push = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};

export const Modal = {
    args: { presentation: "Modal", previewState: "default" },
    render: render
};

export const Live = {
    args: { previewState: "live" },
    render: render
};