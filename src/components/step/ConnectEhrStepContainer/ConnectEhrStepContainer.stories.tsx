import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectEhrStepContainer, {
    ConnectEhrStepContainerProps,
} from "./ConnectEhrStepContainer";

export default {
    title: "SurveyStep/ConnectEhrStepContainer",
    component: ConnectEhrStepContainer,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof ConnectEhrStepContainer>;

const Template: ComponentStory<typeof ConnectEhrStepContainer> = (
    args: ConnectEhrStepContainerProps
) => <ConnectEhrStepContainer {...args} />;

export const ConnectEhrStepContainerDefault = Template.bind({});
ConnectEhrStepContainerDefault.args = {
    previewState: true,
};
