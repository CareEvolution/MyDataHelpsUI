import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Layout from '../../presentational/Layout'
import AppDownload, { AppDownloadProps } from './AppDownload';
import { Card } from '../../presentational';

export default {
	title: 'Container/AppDownload',
	component: AppDownload,
	parameters: {
		layout: 'fullscreen',
	}
} as Meta<typeof AppDownload>;

const Template: StoryFn<typeof AppDownload> = (args: AppDownloadProps) =>
	<Layout colorScheme="auto">
		<Card><AppDownload {...args} /></Card>
	</Layout>;

export const DesktopBoth = Template.bind({});
DesktopBoth.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: ''};

export const DesktopAndroidOnly = Template.bind({});
DesktopAndroidOnly.args = {previewProjectPlatforms: ['Web', 'Android'], previewDevicePlatform: 'Web', previewOperatingSystem: ''};

export const DesktopIOSOnly = Template.bind({});
DesktopIOSOnly.args = {previewProjectPlatforms: ['Web', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: ''};

export const MobileAndroid = Template.bind({});
MobileAndroid.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: 'Android'};

export const MobileIOS = Template.bind({});
MobileIOS.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: 'iOS'};

export const NativeApp = Template.bind({});
NativeApp.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'iOS', previewOperatingSystem: 'iOS'};