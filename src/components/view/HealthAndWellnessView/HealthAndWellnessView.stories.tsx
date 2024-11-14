import React from "react"
import HealthAndWellnessView, { HealthAndWellnessViewProps } from "./HealthAndWellnessView"
import { Card, Layout } from "../../presentational"
import { Meta, StoryObj } from "@storybook/react/*"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof HealthAndWellnessView> = {
    title: "View/HealthAndWellnessView",
    component: HealthAndWellnessView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof HealthAndWellnessView;

const render = (args: HealthAndWellnessViewProps) => <Layout colorScheme='auto'>
    <Card>
        <HealthAndWellnessView {...args} />
    </Card>
</Layout>;

export const Default : Story = {
    args: {
        previewState: "default"
    },
    render: render
};

export const CardBased : Story = {
    args: {
        previewState: "default",
		variant: "cardBased"
    },
    render: render
};

export const Live : Story = {
    args: {},
    render: render
};