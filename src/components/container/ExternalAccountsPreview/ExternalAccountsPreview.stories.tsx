import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import ExternalAccountsPreview, { ExternalAccountsPreviewProps } from "./ExternalAccountsPreview"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/ExternalAccountsPreview",
	component: ExternalAccountsPreview,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof ExternalAccountsPreview>;

const Template: ComponentStory<typeof ExternalAccountsPreview> = (args: ExternalAccountsPreviewProps) =>
	<Layout>
		<ExternalAccountsPreview {...args} />
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	previewState: "Default", applicationUrl: "preview"
};