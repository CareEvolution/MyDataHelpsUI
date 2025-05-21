import React from 'react'
import PdfPreview from './PdfPreview';
import { Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type PdfPreviewStoryArgs = React.ComponentProps<typeof PdfPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<PdfPreviewStoryArgs> = {
    title: 'Container/PdfPreview',
    component: PdfPreview,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px' }}>
                <PdfPreview {...args} />
            </div>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<PdfPreviewStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        url: 'https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.pdf',
        maxHeight: 400,
        maxWidth: 400
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        ...argTypesToHide(['style', 'onLoad', 'innerRef'])
    }
};

