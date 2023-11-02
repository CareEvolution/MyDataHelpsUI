import React from 'react';
import AsthmaControlCalendar, { AsthmaControlCalendarProps } from './AsthmaControlCalendar';
import { Card, DateRangeCoordinator, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaControlCalendar',
    component: AsthmaControlCalendar,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaControlCalendarStoryArgs extends AsthmaControlCalendarProps {
    colorScheme: 'auto' | 'light' | 'dark';
    onCard: boolean;
}

const render = (args: AsthmaControlCalendarStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        {args.onCard &&
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <AsthmaControlCalendar {...args} />
                </DateRangeCoordinator>
            </Card>
        }

        {!args.onCard &&
            <DateRangeCoordinator intervalType="Month">
                <AsthmaControlCalendar {...args} />
            </DateRangeCoordinator>
        }
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'no logs',
        variant: 'compact',
        onCard: false
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
            options: ['no logs', 'some logs']
        },
        variant: {
            control: 'radio',
            options: ['compact', 'verbose']
        },
        onCard: {
            name: 'on card',
            if: {arg: 'variant', 'eq': 'compact'}
        }
    },
    render: render
};
