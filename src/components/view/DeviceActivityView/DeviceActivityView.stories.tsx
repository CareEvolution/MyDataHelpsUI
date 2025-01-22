import React from "react";
import DeviceActivityView, { DeviceActivityViewProps } from "./DeviceActivityView";

export default { title: "View/DeviceActivityView", component: DeviceActivityView, parameters: { layout: 'fullscreen' } };
let render = (args: DeviceActivityViewProps) => <DeviceActivityView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};