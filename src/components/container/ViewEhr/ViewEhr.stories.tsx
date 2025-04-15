import React from 'react'
import Card from '../../presentational/Card'
import Layout from '../../presentational/Layout'
import ViewEhr from './ViewEhr';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { ButtonVariant } from '../../presentational/Button/Button';

type ViewEhrStoryArgs = React.ComponentProps<typeof ViewEhr> & {
    colorScheme: 'auto' | 'light' | 'dark';
    buttonVariantArg: ButtonVariant | 'not set';
};

const meta: Meta<ViewEhrStoryArgs> = {
    title: 'Container/ViewEhr',
    component: ViewEhr,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <ViewEhr
                    {...args}
                    buttonVariant={args.buttonVariantArg !== 'not set' ? args.buttonVariantArg : undefined}
                    onClick={() => console.log('view ehr')}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<ViewEhrStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'some ehr connections',
        title: '',
        buttonColor: undefined,
        buttonVariantArg: 'not set'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['no ehr connections', 'some ehr connections', 'fetching data']
        },
        title: {
            name: 'title'
        },
        buttonColor: {
            name: 'button color',
            control: 'color'
        },
        buttonVariantArg: {
            name: 'button variant',
            control: 'radio',
            options: ['not set', 'default', 'subtle', 'light']
        },
        ...argTypesToHide(['buttonVariant', 'onClick', 'innerRef'])
    }
};