import React from 'react';
import AsthmaAlertTakeoverNotice from './AsthmaAlertTakeoverNotice';
import { Layout, Section } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaAlertTakeoverNotice',
    component: AsthmaAlertTakeoverNotice,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaAlertTakeoverNoticeStoryProps {
    message: string;
}

const render = (args: AsthmaAlertTakeoverNoticeStoryProps) => <Layout colorScheme="auto">
    <Section noTopMargin={true}>
        <AsthmaAlertTakeoverNotice previewState="default" message={args.message}/>
    </Section>
</Layout>;

export const Default = {
    args: {
        message: 'Your home AQI is unhealthy'
    },
    render: render
};

