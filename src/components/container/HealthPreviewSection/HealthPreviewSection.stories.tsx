import React from "react"
import HealthPreviewSection, { HealthPreviewSectionProps } from "./HealthPreviewSection"
import Layout from "../../presentational/Layout"
import { userEvent, within, expect, fn } from '@storybook/test'
import { Description } from "@storybook/blocks"
import { Meta, StoryObj } from "@storybook/react"
import { language } from "../../../helpers"
import { action } from "@storybook/addon-actions"
import getHealthPreviewSectionData from "./HealthPreviewSection.previewdata"

const meta: Meta<typeof HealthPreviewSection> = {
    title: "Container/HealthPreviewSection",
    component: HealthPreviewSection,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof HealthPreviewSection>;

const render = (args: HealthPreviewSectionProps) => <Layout colorScheme="auto">
    <HealthPreviewSection {...args} />
</Layout>;

async function interaction(canvasElement: HTMLElement, args: HealthPreviewSectionProps) {
    const canvas = within(canvasElement);
    const buttonTitle = language(`${args.concept.toLowerCase()}-title`);
    const targetDivButton = await canvas.findByText(buttonTitle);

    expect(targetDivButton).toBeInTheDocument();
    await userEvent.click(targetDivButton);
    expect(args.onClick).toHaveBeenCalled();

    const previewData = getHealthPreviewSectionData(args.concept)
    const elements = canvasElement.getElementsByClassName('mdhui-health-preview-item');
    expect(elements.length).toEqual(previewData.PreviewValues.length);

    const rightIndicator = canvasElement.getElementsByClassName('mdhui-indicator-topRight');
    const defaultIndicator = canvasElement.getElementsByClassName('mdhui-indicator-default');
    if (args.indicatorPosition){
        if (args.indicatorPosition === "topRight"){
            expect(rightIndicator.length).toBe(1);
            expect(defaultIndicator.length).toBe(0);
        } else {
            expect(defaultIndicator.length).toBe(1);
            expect(rightIndicator.length).toBe(0);
        }
    } else {
        expect(defaultIndicator.length).toBe(0);
        expect(rightIndicator.length).toBe(0);
    }
}

export const Medications: Story = {
    args: {
        concept: "Medications",
        previewState: "Default",
        onClick: fn((...args) => action("Medications clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const Immunizations: Story = {
    args: {
        concept: "Immunizations",
        previewState: "Default",
        onClick: fn((...args) => action("Immunizations clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const Reports: Story = {
    args: {
        concept: "Reports",
        previewState: "Default",
        onClick: fn((...args) => action("Reports clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const Allergies: Story = {
    args: {
        concept: "Allergies",
        previewState: "Default",
        onClick: fn((...args) => action("Allergies clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const Conditions: Story = {
    args: {
        concept: "Conditions",
        previewState: "Default",
        onClick: fn((...args) => action("Conditions clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const Procedures: Story = {
    args: {
        concept: "Procedures",
        previewState: "Default",
        onClick: fn((...args) => action("Procedures clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const IndicatorWithTopRightPosition: Story = {
    args: {
        concept: "Procedures",
        previewState: "Default",
        indicatorPosition: "topRight",
        onClick: fn((...args) => action("Procedures clicked")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const NoData: Story = {
    args: {
        concept: "Medications",
        previewState: "NoData"
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const buttonTitle = language(`${args.concept.toLowerCase()}-title`);
        expect(canvas.queryByText(buttonTitle)).not.toBeInTheDocument();

        const testDataDivs = canvasElement.getElementsByClassName('mdhui-health-preview-item');
        expect(testDataDivs.length).toBe(0);
        
    },
    render: render
};

export const Live: Story = {
    args: {
        concept: "Medications"
    },
    argTypes: {
        concept: {
            name: "Health Concept",
            control: 'radio',
            options: ["Medications", "Immunizations", "Reports", "Allergies", "Conditions", "Procedures"]
        }
    }
};