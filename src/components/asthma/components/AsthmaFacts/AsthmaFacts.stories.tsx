import React from 'react';
import AsthmaFacts from './AsthmaFacts';
import { Card, Layout, Section } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaFacts',
    component: AsthmaFacts,
    parameters: {layout: 'fullscreen'}
};

const render = () => {
    return <Layout colorScheme="auto">
        <Section noTopMargin={true}>
            <Card backgroundColor="#f2f2f7">
                <AsthmaFacts/>
            </Card>
        </Section>
    </Layout>;
};

export const Default = {
    render: render
};
