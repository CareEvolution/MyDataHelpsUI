import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import ProviderSearch, { ProviderSearchProps } from "./ProviderSearch"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
	title: "Container/ProviderSearch",
	component: ProviderSearch,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof ProviderSearch>;

const Template: ComponentStory<typeof ProviderSearch> = (args: ProviderSearchProps) =>
	<Layout colorScheme="auto">
		<Card>
			<ProviderSearch {...args} />
		</Card>
	</Layout>;

export const Default = Template.bind({});
Default.args = {
	previewState: "Default"
}
Default.parameters = {
	externalAccounts: []
}

export const onProviderSelected = Template.bind({});
onProviderSelected.args = {
	previewState: "Default",
	onProviderSelected: (provider) => alert(`You selected ${provider.name}`)
}
onProviderSelected.parameters = {
	externalAccounts: []
}