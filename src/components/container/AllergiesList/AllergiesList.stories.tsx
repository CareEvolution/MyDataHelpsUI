import React from "react";
import { Card, Layout } from "../../presentational";
import AllergiesList, { AllergiesListProps } from "./AllergiesList";
import { TermInformationReference } from "../TermInformation/TermInformation";
import { Description } from "@storybook/blocks"
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AllergiesList> = {
	title: "Container/AllergiesList",
	component: AllergiesList,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

let render = (args: AllergiesListProps) => <Layout colorScheme="auto"><Card><AllergiesList {...args} /></Card></Layout>

export const Default: Story = {
    args: {
        previewState: "default",
        onViewTermInfo: (termInfo: TermInformationReference) => {
            console.log(termInfo);
        }
    },
    render: render
};

export const Live : Story = {
    args: {
        onViewTermInfo: (termInfo: TermInformationReference) => {
            console.log(termInfo);
        }
    },
    render: render
};