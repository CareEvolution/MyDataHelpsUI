import React from 'react';
import AsthmaCalendarViewHeader, { AsthmaCalendarViewHeaderProps } from './AsthmaCalendarViewHeader';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Container/AsthmaCalendarViewHeader',
    component: AsthmaCalendarViewHeader,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaCalendarViewHeaderProps) => <Layout colorScheme="auto">
    <AsthmaCalendarViewHeader {...args} />
</Layout>;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};