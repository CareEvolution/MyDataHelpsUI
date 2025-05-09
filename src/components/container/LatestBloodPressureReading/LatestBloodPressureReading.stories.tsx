import React from 'react'
import LatestBloodPressureReading from './LatestBloodPressureReading';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { faTelevision } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

type LatestBloodPressureReadingPropsStoryArgs = React.ComponentProps<typeof LatestBloodPressureReading> & {
    colorScheme: 'auto' | 'light' | 'dark';
    dateMillis: number;
    indicatorType: 'default' | 'custom';
};

const meta: Meta<LatestBloodPressureReadingPropsStoryArgs> = {
    title: 'Container/LatestBloodPressureReading',
    component: LatestBloodPressureReading,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <LatestBloodPressureReading
                    {...args}
                    indicator={args.indicatorType === 'custom' ? <FontAwesomeSvgIcon icon={faTelevision} /> : undefined}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<LatestBloodPressureReadingPropsStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'elevated',
        indicatorType: 'default'
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
            options: ['low', 'normal', 'elevated', 'hypertension-stage-1', 'hypertension-stage-2', 'hypertensive-crisis']
        },
        indicatorType: {
            name: 'indicator',
            control: 'radio',
            options: ['default', 'custom']
        },
        ...argTypesToHide(['onClick', 'indicator', 'innerRef'])
    }
};
