import { StoryObj, Meta } from "@storybook/react";
import HtmlStepContainer from "./HtmlStepContainer";

const meta: Meta<typeof HtmlStepContainer> = {
    title: "SurveyStep/HtmlStepContainer",
    component: HtmlStepContainer,
    parameters: {
        layout: 'fullscreen',
    }
};
export default meta;

export const HtmlStepContainerDefault: StoryObj<typeof HtmlStepContainer> = {
    args: {}
}