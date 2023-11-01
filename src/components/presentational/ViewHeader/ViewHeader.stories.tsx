import React from 'react';
import ViewHeader, { ViewHeaderProps } from './ViewHeader';
import Layout from '../../presentational/Layout';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default {title: 'Presentational/ViewHeader', component: ViewHeader, parameters: {layout: 'fullscreen'}};

let render = (args: ViewHeaderProps) => <Layout colorScheme="auto"><ViewHeader {...args} /></Layout>

const action = {
    icon: faUserCircle,
    onClick: () => {
        console.log('Action clicked.');
    }
};

export const TitleAndSubtitle = {
    args: {title: 'Surveys', subtitle: 'You\'ve completed 12 tasks today.  Take a rest if you need to.'},
    render: render
};

export const TitleAndSubtitleWithAction = {
    args: {title: 'Surveys', subtitle: 'You\'ve completed 12 tasks today.  Take a rest if you need to.', action: action},
    render: render
};

export const TitleAndSubtitleWithActionColor = {
    args: {title: 'Surveys', subtitle: 'You\'ve completed 12 tasks today.  Take a rest if you need to.', action: {...action, color: 'blue'}},
    render: render
};

export const TitleOnly = {
    args: {title: 'Surveys'},
    render: render
};

export const TitleOnlyWithAction = {
    args: {title: 'Surveys', action: action},
    render: render
};

export const TitleOnlyWithActionColor = {
    args: {title: 'Surveys', action: {...action, color: 'blue'}},
    render: render
};

export const SubtitleOnly = {
    args: {subtitle: 'You\'ve completed 12 tasks today.  Take a rest if you need to.'},
    render: render
};

export const SubtitleOnlyWithAction = {
    args: {subtitle: 'You\'ve completed 12 tasks today.  Take a rest if you need to.', action: action},
    render: render
};

export const SubtitleOnlyWithActionColor = {
    args: {subtitle: 'You\'ve completed 12 tasks today.  Take a rest if you need to.', action: {...action, color: 'blue'}},
    render: render
};