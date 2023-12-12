import React from 'react';
import AsthmaLibraryView, { AsthmaLibraryViewProps } from './AsthmaLibraryView';

export default {
    title: 'Asthma/Views/AsthmaLibraryView',
    component: AsthmaLibraryView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLibraryViewProps) => <AsthmaLibraryView {...args} />;

export const Default = {
    args: {},
    render: render
};

