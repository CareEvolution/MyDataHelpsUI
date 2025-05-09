import React from 'react'
import BloodPressureReading from './BloodPressureReading';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { faTelevision } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

type BloodPressureReadingPropsStoryArgs = React.ComponentProps<typeof BloodPressureReading> & {
    colorScheme: 'auto' | 'light' | 'dark';
    dateMillis: number;
    indicatorType: 'default' | 'custom';
};

const meta: Meta<BloodPressureReadingPropsStoryArgs> = {
    title: 'Presentational/BloodPressureReading',
    component: BloodPressureReading,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <BloodPressureReading
                    {...args}
                    date={new Date(args.dateMillis)}
                    indicator={args.indicatorType === 'custom' ? <FontAwesomeSvgIcon icon={faTelevision} /> : undefined}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<BloodPressureReadingPropsStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        systolic: 124,
        diastolic: 77,
        dateMillis: new Date('2025-03-30T12:20:00').getTime(),
        indicatorType: 'default'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        dateMillis: {
            name: 'date',
            control: 'date'
        },
        indicatorType: {
            name: 'indicator',
            control: 'radio',
            options: ['default', 'custom']
        },
        ...argTypesToHide(['date', 'onClick', 'indicator', 'innerRef'])
    }
};
