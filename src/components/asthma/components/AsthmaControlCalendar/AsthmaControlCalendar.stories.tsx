import React from 'react';
import AsthmaControlCalendar, { AsthmaControlCalendarProps } from './AsthmaControlCalendar';
import { Card, DateRangeCoordinator, Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaControlCalendar',
    component: AsthmaControlCalendar,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaControlCalendarProps) => <Layout colorScheme="auto">
    <Card backgroundColor="#fff">
        <DateRangeCoordinator intervalType="Month">
            <AsthmaControlCalendar {...args} />
        </DateRangeCoordinator>
    </Card>
</Layout>;

export const NoLogging = {
    args: {
        previewState: 'no-logs'
    },
    render: render
};

export const SomeLogging = {
    args: {
        previewState: 'some-logs'
    },
    render: render
};
