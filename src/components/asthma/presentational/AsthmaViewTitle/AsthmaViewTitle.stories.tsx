import React from 'react';
import AsthmaViewTitle, { AsthmaViewTitleProps } from './AsthmaViewTitle';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Presentational/AsthmaViewTitle',
    component: AsthmaViewTitle,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaViewTitleProps) => <Layout colorScheme="auto">
    <AsthmaViewTitle {...args}/>
</Layout>;

export const Default = {
    args: {
        title: 'Some Title'
    },
    render: render
};
