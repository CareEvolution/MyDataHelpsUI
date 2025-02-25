import React from "react"
import ProviderSearch, { ProviderSearchProps } from "./ProviderSearch"
import Layout from "../../presentational/Layout"
import { ExternalAccountProvider } from "@careevolution/mydatahelps-js"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof ProviderSearch> = {
	title: "Container/ProviderSearch",
	component: ProviderSearch,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	}
};

export default meta;
type Story = StoryObj<typeof ProviderSearch>;

const render = (args: ProviderSearchProps) => <Layout colorScheme="auto">
	<ProviderSearch {...args} />
</Layout>;

export const Default: Story = {
	args: {
		previewState: "Default"
	},
	render: render
}

export const ProvidersOnly: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Provider"]
	},
	render: render
}

export const HealthPlansOnly: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Health Plan"]
	},
	render: render
}

export const DeviceManufacturersOnly: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Device Manufacturer"]
	},
	render: render
}

export const ProvidersAndHealthPlans: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Provider", "Health Plan"]
	},
	render: render
}

export const ProvidersAndDeviceManufacturers: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Provider", "Device Manufacturer"]
	},
	render: render
}

export const HealthPlansAndDeviceManufacturers: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Health Plan", "Device Manufacturer"]
	},
	render: render
}

export const ProvidersAndHealthPlansAndDeviceManufacturers: Story = {
	args: {
		previewState: "Default",
		providerCategories: ["Provider", "Health Plan", "Device Manufacturer"]
	},
	render: render
}

export const HideAddNewAction: Story = {
	args: {
		previewState: "Default",
		hideRequestProviderButton: true
	},
	render: render
}

export const Searching: Story = {
	args: {
		previewState: "Searching"
	},
	render: render
}

export const Live: Story = {
	args: {
		previewState: "Default",
		onProviderConnected: (provider: ExternalAccountProvider) => alert(`You selected ${provider.name}`)
	},
	render: render
}

export const LiveStandalone: Story = {
	args: {
		connectExternalAccountOptions: {
			openNewWindow: false,
			standaloneModeFinalRedirectPath: "https://mydatahelps.org"// replace with actual redirect url for this to work
		}
	},
	render: render
}

export const LiveOnProviderConnected: Story = {
	args: {
		onProviderConnected: (provider: ExternalAccountProvider) => alert(`Provider ${provider.name} connected.`)
	},
	render: render
}