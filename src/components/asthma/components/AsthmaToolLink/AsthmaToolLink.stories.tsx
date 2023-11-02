import React from 'react';
import AsthmaToolLink, { AsthmaToolLinkProps } from './AsthmaToolLink';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaToolLink',
    component: AsthmaToolLink,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaToolLinkProps) => <Layout colorScheme="auto">
    <AsthmaToolLink {...args} />
</Layout>;

export const Default = {
    args: {
        text: 'Add an action plan',
        onClick: () => {
            console.log('link clicked.');
        }
    },
    render: render
};
