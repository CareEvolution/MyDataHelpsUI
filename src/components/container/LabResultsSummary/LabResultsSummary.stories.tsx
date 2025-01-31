import React from "react"
import LabResultsSummary, { LabResultsSummaryProps } from "./LabResultsSummary"
import Layout from "../../presentational/Layout"
import { Meta, StoryObj } from "@storybook/react"
import { within, userEvent } from "@storybook/testing-library"
import { language } from "../../../helpers"
import { Description } from "@storybook/blocks"
import { action } from "@storybook/addon-actions"
import { expect, jest } from "@storybook/jest"
import { importantLabs } from "./LabResultsSummary.previewdata"
import { LabResultValue } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline"

const meta: Meta<typeof LabResultsSummary> = {
    title: "Container/LabResultsSummary",
    component: LabResultsSummary,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof LabResultsSummary>;

const render = (args: LabResultsSummaryProps) => <Layout colorScheme="auto">
    <LabResultsSummary {...args} />
</Layout>;

async function interaction(canvasElement: HTMLElement, args: LabResultsSummaryProps) {
    const canvas = within(canvasElement);
    const labResultsAction = await canvas.findByText(language(`lab-results-title`));

    expect(labResultsAction).toBeInTheDocument();
    await userEvent.click(labResultsAction);
    expect(args.onClick).toHaveBeenCalled();

    let expectedIndicatorValue = 0;
    if (args.previewState === "ImportantLabs") {
        expectedIndicatorValue = importantLabs.RecentLabs.TotalLabReports;
        const expectedTermInfoButtons = importantLabs.ImportantLabs.flat().filter(lab => lab.TermInformation);
        const onTermInfoButtons = canvasElement.getElementsByClassName(`mdhui-lab-result-with-sparkline-term-info`);
        expect(onTermInfoButtons.length).toBe(expectedTermInfoButtons.length);

        const onTermInfoButton = onTermInfoButtons[0];
        await userEvent.click(onTermInfoButton);
        expect(args.onViewTermInfo).toHaveBeenCalled();
    } else {
        expectedIndicatorValue = importantLabs.RecentLabs.TotalLabReports;
    }

    const indicatorValue = canvasElement.getElementsByClassName(`mdhui-action-indicator-value`);
    expect(indicatorValue.length).toBeGreaterThan(0);

    if (indicatorValue.length > 0) {
        const expectedStartsWith = indicatorValue[0]?.textContent?.startsWith(`${expectedIndicatorValue}`);
        expect(expectedStartsWith).toBeTruthy();
    }
}

export const ImportantLabs: Story = {
    args: {
        previewState: "ImportantLabs",
        onClick: jest.fn((...args) => action("Parent On Click")(...args)),
        onViewTermInfo: jest.fn((termInfo) => action(`Click term info ${termInfo}`)(termInfo))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const RecentLabs: Story = {
    args: {
        previewState: "RecentLabs",
        onClick: jest.fn((...args) => action("Parent On Click")(...args))
    },
    play: async ({ canvasElement, args }) => {
        await interaction(canvasElement, args);
    },
    render: render
};

export const NoData: Story = {
    args: {
        previewState: "NoData",
    },
    play: async ({ canvasElement, args }) => {
        const component = canvasElement.getElementsByClassName(`mdhui-lab-results-summary`);
        expect(component.length).toBe(0);
    },
    render: render
};

export const Live: Story = {
    args: {},
    render: render
};