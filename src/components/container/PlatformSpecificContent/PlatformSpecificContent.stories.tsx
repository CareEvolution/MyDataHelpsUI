import React from 'react'
import Layout from '../../presentational/Layout'
import PlatformSpecificContent, {PlatformSpecificContentProps} from './PlatformSpecificContent'
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof PlatformSpecificContent> = {
	title: "Container/PlatformSpecificContent",
	component: PlatformSpecificContent,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof PlatformSpecificContent>;

const render = (args: PlatformSpecificContentProps) =>
	<Layout colorScheme="auto">
        <PlatformSpecificContent {...args} />
    </Layout>;

export const WebVisible: Story = {
    args: {
        platforms: ['Web'],
        children: 'Web Content',
        previewDevicePlatform: 'Web'
    },
    render: render
}

export const WebNotVisible: Story = {
    args: {
        platforms: [],
        children: 'Web Content',
        previewDevicePlatform: 'Web'
    },
    render: render
}

export const AndroidVisible: Story = {
    args: {
        platforms: ['Android'],
        children: 'Android Content',
        previewDevicePlatform: 'Android'
    },
    render: render
}

export const AndroidNotVisible: Story = {
    args: {
        platforms: [],
        children: 'Android Content',
        previewDevicePlatform: 'Android'
    },
    render: render
}

export const IOSVisible: Story = {
    args: {
        platforms: ['iOS'],
        children: 'iOS Content',
        previewDevicePlatform: 'iOS'
    },
    render: render
}

export const IOSNotVisible: Story = {
    args: {
        platforms: [],
        children: 'iOS Content',
        previewDevicePlatform: 'iOS'
    },
    render: render
}