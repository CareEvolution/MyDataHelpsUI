import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import Layout from '../../presentational/Layout'
import PlatformSpecificContent, {PlatformSpecificContentProps} from './PlatformSpecificContent';

export default {
    title: 'Container/PlatformSpecificContent',
    component: PlatformSpecificContent,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof PlatformSpecificContent>;

const Template: ComponentStory<typeof PlatformSpecificContent> = (args: PlatformSpecificContentProps) =>
    <Layout colorScheme="auto">
        <PlatformSpecificContent {...args} />
    </Layout>;

export const WebVisible = Template.bind({});
WebVisible.args = {platforms: ['Web'], children: 'Web Content', previewDevicePlatform: 'Web'};

export const WebNotVisible = Template.bind({});
WebNotVisible.args = {platforms: [], children: 'Web Content', previewDevicePlatform: 'Web'};

export const AndroidVisible = Template.bind({});
AndroidVisible.args = {platforms: ['Android'], children: 'Android Content', previewDevicePlatform: 'Android'};

export const AndroidNotVisible = Template.bind({});
AndroidNotVisible.args = {platforms: [], children: 'Android Content', previewDevicePlatform: 'Android'};

export const IOSVisible = Template.bind({});
IOSVisible.args = {platforms: ['iOS'], children: 'iOS Content', previewDevicePlatform: 'iOS'};

export const IOSNotVisible = Template.bind({});
IOSNotVisible.args = {platforms: [], children: 'iOS Content', previewDevicePlatform: 'iOS'};