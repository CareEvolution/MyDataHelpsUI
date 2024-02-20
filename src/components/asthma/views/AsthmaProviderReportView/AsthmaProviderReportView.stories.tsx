import React from 'react';
import AsthmaProviderReportView from './AsthmaProviderReportView';

export default {
    title: 'Asthma/Views/AsthmaProviderReportView',
    component: AsthmaProviderReportView,
    parameters: {layout: 'fullscreen'}
};

const render = () => {
    return <AsthmaProviderReportView previewState="default" logEntrySurveyName="Log Symptoms - Today"/>;
};

export const Default = {
    render: render
};

