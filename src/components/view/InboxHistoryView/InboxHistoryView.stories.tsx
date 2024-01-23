import React from 'react';
import InboxHistoryView from './InboxHistoryView';

export default {
    title: 'View/InboxHistoryView',
    component: InboxHistoryView,
    parameters: {layout: 'fullscreen'}
};

const render = () => {
    return <InboxHistoryView previewState="default" messageViewerUrl="some url"/>;
}

export const Default = {
    render: render
};