import React from 'react';
import AsthmaControlCalendar, { AsthmaControlCalendarProps } from './AsthmaControlCalendar';
import { Card, DateRangeCoordinator, Layout } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaControlCalendar',
    component: AsthmaControlCalendar,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaControlCalendarStoryArgs extends AsthmaControlCalendarProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
    onCard: boolean;
}

const render = (args: AsthmaControlCalendarStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
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
        language: 'English',
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
        language: {
            name: 'language',
            control: 'radio',
            options: ['English', 'Spanish']
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
            if: {arg: 'variant', eq: 'compact'}
        }
    },
    render: render
};
