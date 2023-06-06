import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Layout from '../../presentational/Layout'
import AppDownload, { AppDownloadProps } from './AppDownload';

export default {
	title: 'Container/AppDownload',
	component: AppDownload,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof AppDownload>;

const Template: ComponentStory<typeof AppDownload> = (args: AppDownloadProps) =>
	<Layout colorScheme="auto">
		<AppDownload {...args} />
	</Layout>;

export const WebBoth = Template.bind({});
WebBoth.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web'};

export const WebAndroid = Template.bind({});
WebAndroid.args = {previewProjectPlatforms: ['Web', 'Android'], previewDevicePlatform: 'Web'};

export const WebIOS = Template.bind({});
WebIOS.args = {previewProjectPlatforms: ['Web', 'iOS'], previewDevicePlatform: 'Web'};

export const Android = Template.bind({});
Android.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Android'};

export const IOS = Template.bind({});
IOS.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'iOS'};