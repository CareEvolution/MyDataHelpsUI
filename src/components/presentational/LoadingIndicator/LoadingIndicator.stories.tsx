import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import Layout from "../Layout"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof LoadingIndicator> = {
	title: "Presentational/LoadingIndicator",
	component: LoadingIndicator,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
	render: () => <Layout colorScheme="auto"> <LoadingIndicator/> </Layout>
};
