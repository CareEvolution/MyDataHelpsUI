import React from 'react';
import Divider from './Divider';
import Layout from '../Layout';
import TextBlock from '../TextBlock';
import Card from '../Card';

export default {
    title: 'Presentational/Divider',
    component: Divider,
    parameters: { layout: 'fullscreen' }
};

const render = () => {
    return <Layout colorScheme="auto">
        <Card>
            <TextBlock>Content before divider</TextBlock>
            <Divider />
            <TextBlock>Content after divider</TextBlock>
        </Card>
    </Layout>;
};

export const Default = {
    render: render
};
