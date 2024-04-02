import React from "react";
import StandaloneHealthAndWellnessView, { StandaloneHealthAndWellnessViewProps } from "./StandaloneHealthAndWellnessView";

export default { title: "View/StandaloneHealthAndWellnessView", component: StandaloneHealthAndWellnessView, parameters: { layout: 'fullscreen' } };
let render = (args: StandaloneHealthAndWellnessViewProps) => <StandaloneHealthAndWellnessView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};

export const Live = {
    args: {
        connectExternalAccountOptions: { openNewWindow: false, standaloneModeFinalRedirectPath: "https://mydatahelps.org" },
        render: render
    }
};