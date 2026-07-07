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

// On a desktop web browser both store links are shown, limited only by which
// platforms the project itself supports.
export const DesktopProjectSupportsAllPlatforms = Template.bind({});
DesktopProjectSupportsAllPlatforms.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: ''};

export const DesktopProjectSupportsAndroidOnly = Template.bind({});
DesktopProjectSupportsAndroidOnly.args = {previewProjectPlatforms: ['Web', 'Android'], previewDevicePlatform: 'Web', previewOperatingSystem: ''};

export const DesktopProjectSupportsIOSOnly = Template.bind({});
DesktopProjectSupportsIOSOnly.args = {previewProjectPlatforms: ['Web', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: ''};

// On a mobile web browser only the store link matching the device's OS is shown,
// even when the project supports all platforms.
export const MobileAndroidBrowser = Template.bind({});
MobileAndroidBrowser.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: 'Android'};

export const MobileIPhoneBrowser = Template.bind({});
MobileIPhoneBrowser.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'Web', previewOperatingSystem: 'iOS'};

// In the native app the widget is hidden entirely (device platform is not Web).
export const NativeAppHidden = Template.bind({});
NativeAppHidden.args = {previewProjectPlatforms: ['Web', 'Android', 'iOS'], previewDevicePlatform: 'iOS', previewOperatingSystem: 'iOS'};