import React from 'react';
import AsthmaDashboardViewHeader, { AsthmaDashboardViewHeaderProps } from './AsthmaDashboardViewHeader';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Container/AsthmaDashboardViewHeader',
    component: AsthmaDashboardViewHeader,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaDashboardViewHeaderProps) => <Layout colorScheme="auto">
    <AsthmaDashboardViewHeader {...args} />
</Layout>;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};