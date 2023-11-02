import React from 'react';
import AsthmaControlStatusHeader, { AsthmaControlStatusHeaderProps } from './AsthmaControlStatusHeader';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaControlStatusHeader',
    component: AsthmaControlStatusHeader,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaControlStatusHeaderProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <AsthmaControlStatusHeader {...args} />
</Layout>;

export const Default = {
    args: {
        previewState: 'no data'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: [
                'no data', 'abnormal dhr', 'abnormal nhr', 'abnormal rr', 'abnormal activity', 'abnormal sleep',
                'abnormal dbol', 'abnormal nbol', 'abnormal home aqi', 'abnormal work aqi', 'abnormal multiple',
                'not determined', 'not controlled', 'controlled'
            ]
        }
    },
    render: render
};