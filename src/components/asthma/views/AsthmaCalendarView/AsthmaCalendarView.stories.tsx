import React from 'react';
import AsthmaCalendarView, { AsthmaCalendarViewProps } from './AsthmaCalendarView';

export default {
    title: 'Asthma/Views/AsthmaCalendarView',
    component: AsthmaCalendarView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaCalendarViewProps) => <AsthmaCalendarView {...args} />;

export const Default = {
    args: {
        previewState: 'default',
        logTodayEntrySurveyName: 'Log Symptoms - Today',
        logYesterdayEntrySurveyName: 'Log Symptoms - Yesterday'
    },
    render: render
};

