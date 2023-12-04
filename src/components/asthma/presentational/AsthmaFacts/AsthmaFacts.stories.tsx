import React from 'react';
import AsthmaFacts, { AsthmaFactsProps } from './AsthmaFacts';
import { Card, Layout, Section } from '../../../presentational';

export default {
    title: 'Asthma/Presentational/AsthmaFacts',
    component: AsthmaFacts,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaFactsProps) => <Layout colorScheme="auto">
    <Section>
        <Card backgroundColor="#f2f2f7">
            <AsthmaFacts/>
        </Card>
    </Section>
</Layout>;

export const Default = {
    args: {
        label: 'Resting HR (Day)',
        value: 64,
        units: 'BPM',
        status: 'establishing'
    },
    render: render
};
