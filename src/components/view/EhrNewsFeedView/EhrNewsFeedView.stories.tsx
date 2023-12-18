import React from "react";
import EhrNewsFeedView, { EhrNewsFeedViewProps } from "./EhrNewsFeedView";

export default { title: "View/EhrNewsFeedView", component: EhrNewsFeedView, parameters: { layout: 'fullscreen' } };
let render = (args: EhrNewsFeedViewProps) => <EhrNewsFeedView {...args} />
export const Procedures = {
    args: { previewState: "default", feed: "Procedures", presentation: "Push" },
    render: render
};
export const Immunizations = {
    args: { previewState: "default", feed: "Immunizations", presentation: "Push" },
    render: render
};
export const Reports = {
    args: { previewState: "default", feed: "Reports", presentation: "Push" },
    render: render
};
export const LabReports = {
    args: { previewState: "default", feed: "LabReports", presentation: "Push" },
    render: render
};