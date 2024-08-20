import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import Layout from '../../presentational/Layout'
import AppDownload, { AppDownloadProps } from './AppDownload';
import { Card } from '../../presentational';
import { Description } from "@storybook/blocks";

const meta: Meta<typeof AppDownload> = {
	title: "Container/AppDownload",
	component: AppDownload,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof AppDownload> = (args: AppDownloadProps) =>
	<Layout colorScheme="auto">
		<Card><AppDownload {...args} /></Card>
	</Layout>;

export const WebBoth : Story = Template.bind({});
WebBoth.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web'};

export const WebAndroid : Story = Template.bind({});
WebAndroid.args = {previewProjectPlatforms: ['Web', 'Android'], previewDevicePlatform: 'Web'};

export const WebIOS : Story = Template.bind({});
WebIOS.args = {previewProjectPlatforms: ['Web', 'iOS'], previewDevicePlatform: 'Web'};

export const Android : Story = Template.bind({});
Android.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Android'};

export const IOS : Story = Template.bind({});
IOS.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'iOS'};