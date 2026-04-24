import React from 'react';
import UploadedFileAction from './UploadedFileAction';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFish } from '@fortawesome/free-solid-svg-icons';

type UploadedFileActionStoryArgs = React.ComponentProps<typeof UploadedFileAction> & {
    colorScheme: 'auto' | 'light' | 'dark';
    withCustomIcon: boolean;
};

const meta: Meta<UploadedFileActionStoryArgs> = {
    title: 'Container/UploadedFileAction',
    component: UploadedFileAction,
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        title: {
            name: 'title',
            control: 'text'
        },
        subtitle: {
            name: 'subtitle',
            control: 'text'
        },
        withCustomIcon: {
            name: 'with custom icon',
            control: 'boolean'
        },
        ...argTypesToHide(['preview', 'icon', 'category', 'fileNamePattern', 'trackUsage', 'embedded', 'innerRef'])
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <UploadedFileAction {...args} icon={args.withCustomIcon ? <FontAwesomeSvgIcon icon={faFish} /> : undefined} />
            </Card>
        </Layout>;
    }
};
export default meta;

export const Default: StoryObj<UploadedFileActionStoryArgs> = {
    args: {
        preview: true,
        colorScheme: 'auto',
        title: 'Some File Title',
        subtitle: 'Some subtitle for this file',
        withCustomIcon: false
    }
};