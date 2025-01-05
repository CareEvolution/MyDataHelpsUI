import React from "react";
import ConnectDevicesView, { ConnectDevicesViewProps } from "./ConnectDevicesView";

export default { title: "View/ConnectDevicesView", component: ConnectDevicesView, parameters: { layout: 'fullscreen' } };
let render = (args: ConnectDevicesViewProps) => <ConnectDevicesView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};