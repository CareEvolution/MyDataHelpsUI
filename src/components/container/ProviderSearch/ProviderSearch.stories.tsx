﻿import React from "react"
import ProviderSearch, { ProviderSearchProps } from "./ProviderSearch"
import Layout from "../../presentational/Layout"
import { ExternalAccountProvider } from "@careevolution/mydatahelps-js"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"
import { Card } from "../../presentational"

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
	<Card><ProviderSearch {...args} /></Card>
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

export const onProviderConnected: Story = {
	args: {
		previewState: "Default",
		onProviderConnected: (provider: ExternalAccountProvider) => alert(`You connected to ${provider.name}`)
	},
	render: render
}

export const publicEndpoint: Story = {
	args: {
		publicProviderSearchApiUrl: "https://designer.mydatahelps.dev/api/fhirpublicproviders",
		onProviderSelected: (provider: ExternalAccountProvider) => alert(`You selected ${provider.name}`)
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
		onProviderConnected: (provider: ExternalAccountProvider) => alert(`You connected to ${provider.name}`)
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

export const FeaturedProviders: Story = {
	args: {
		previewState: "Default",
		featuredProviders: [
			{
				"id": 430,
				"name": "Medicare / CMS",
				"category": "Health Plan",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/430/logo"
			},
			{
				"id": 435,
				"name": "Denver Health",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/435/logo"
			},
			{
				"id": 567,
				"name": "Kaiser Permanente - California - Southern",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/567/logo"
			},
			{
				"id": 481,
				"name": "Scripps Health",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/481/logo"
			},
			{
				"id": 322,
				"name": "Cleveland Clinic",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/322/logo"
			},
			{
				"id": 1574,
				"name": "United Healthcare (Medicare/Medicaid plans)",
				"category": "Health Plan",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/1574/logo"
			},
			{
				"id": 214,
				"name": "Novant Health",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/214/logo"
			},
			{
				"id": 170,
				"name": "UNC Health Care",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/170/logo"
			},
			{
				"id": 9403,
				"name": "Athenahealth",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/9403/logo"
			},
			{
				"id": 167,
				"name": "Johns Hopkins Medicine",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/167/logo"
			},
			{
				"id": 1457,
				"name": "Aetna",
				"category": "Health Plan",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/1457/logo"
			},
			{
				"id": 1175,
				"name": "Atrium Health",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/1175/logo"
			},
			{
				"id": 250,
				"name": "Providence Health & Services - Washington/Montana",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/250/logo"
			},
			{
				"id": 546,
				"name": "Duke Health",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/546/logo"
			},
			{
				"id": 425,
				"name": "UW Medicine (Washington)",
				"category": "Provider",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/425/logo"
			},
			{
				"id": 1459,
				"name": "Cigna",
				"category": "Health Plan",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/1459/logo"
			},
			{
				"id": 1456,
				"name": "Humana",
				"category": "Health Plan",
				"logoUrl": "https://mydatahelps.org/api/v1/delegated/externalaccountproviders/1456/logo"
			}
		]
	},
	render: render
}