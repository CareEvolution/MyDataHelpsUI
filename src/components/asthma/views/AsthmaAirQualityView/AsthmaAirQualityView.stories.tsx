import React from 'react';
import AsthmaAirQualityView, { AsthmaAirQualityViewProps } from './AsthmaAirQualityView';

export default {
    title: 'Asthma/Views/AsthmaAirQualityView',
    component: AsthmaAirQualityView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaAirQualityViewProps) => <AsthmaAirQualityView {...args} />;

export const Default = {
    args: {
        previewState: 'default'
    },
    render: render
};

