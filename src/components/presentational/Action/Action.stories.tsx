import React from 'react';
import Action, { ActionProps } from './Action';
import Layout from '../Layout';
import './Action.stories.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faArrowRight, faFile, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type ActionStoryArgs = React.ComponentProps<typeof Action> & {
    colorScheme: 'auto' | 'light' | 'dark';
    withClass: boolean;
    withIcon: boolean;
    withTitleIcon: boolean;
    withIndicator: boolean;
    withIndicatorIcon: boolean;
    withIndicatorValue: boolean;
    withClickHandler: boolean;
    parentCursor: 'not set' | 'pointer' | 'crosshair';
};

const meta: Meta<ActionStoryArgs> = {
    title: 'Presentational/Action',
    component: Action,
    parameters: {
        layout: 'fullscreen'
    },
    render: (storyArgs: ActionStoryArgs) => {
        const componentArgs: ActionProps = {
            ...storyArgs,
            ...(storyArgs.withClass && { className: 'action-story-primary', renderAs: 'div' }),
            ...(storyArgs.withIcon && { icon: <FontAwesomeSvgIcon icon={faFile} color="#2e6e9e" /> }),
            ...(storyArgs.withTitleIcon && { titleIcon: <FontAwesomeSvgIcon icon={faHeart} color="#df4747" style={{ marginRight: '4px' }} /> }),
            ...(storyArgs.withIndicator && { indicator: <FontAwesomeSvgIcon icon={faArrowRight} color="#2e6e9e" /> }),
            ...(storyArgs.withIndicatorIcon && { indicatorIcon: faArrowRight }),
            ...(storyArgs.withIndicatorValue && { indicatorValue: '3' }),
            ...(storyArgs.withClickHandler && { onClick: () => alert('Clicked') })
        };

        return <Layout colorScheme={storyArgs.colorScheme}>
            <div style={{ cursor: storyArgs.parentCursor }}>
                <Action {...componentArgs} />
                {componentArgs.bottomBorder && <div style={{ padding: '16px', fontSize: '0.75em', color: '#888' }}>
                    Note: Adding this here because the bottom border seen above only renders when the action is not the last child of its parent.
                </div>}
            </div>
        </Layout>;
    }
};
export default meta;

export const Default: StoryObj<ActionStoryArgs> = {
    args: {
        colorScheme: 'auto',
        title: 'Baseline Survey',
        subtitle: 'Tap here to start your baseline survey',
        withClass: false,
        withIcon: false,
        withTitleIcon: false,
        withIndicator: false,
        withIndicatorIcon: false,
        withIndicatorValue: false,
        indicatorPosition: 'default',
        bottomBorder: false,
        withClickHandler: false,
        titleColor: '',
        subtitleColor: '',
        parentCursor: 'not set',
        renderAs: 'default' as any
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        title: {
            name: 'title',
            control: 'text'
        },
        subtitle: {
            name: 'subtitle',
            control: 'text'
        },
        withClass: {
            name: 'with class',
            control: 'boolean'
        },
        withIcon: {
            name: 'with icon',
            control: 'boolean'
        },
        withTitleIcon: {
            name: 'with title icon',
            control: 'boolean'
        },
        withIndicator: {
            name: 'with indicator',
            control: 'boolean'
        },
        withIndicatorIcon: {
            name: 'with indicator icon',
            control: 'boolean'
        },
        withIndicatorValue: {
            name: 'with indicator value',
            control: 'boolean'
        },
        indicatorPosition: {
            name: 'indicator position',
            control: 'radio',
            options: ['default', 'topRight']
        },
        bottomBorder: {
            name: 'with bottom border',
            control: 'boolean'
        },
        withClickHandler: {
            name: 'with click handler',
            control: 'boolean'
        },
        titleColor: {
            name: 'title color',
            control: 'color'
        },
        subtitleColor: {
            name: 'subtitle color',
            control: 'color'
        },
        parentCursor: {
            name: 'parent cursor',
            control: 'radio',
            options: ['not set', 'pointer', 'crosshair'],
            mapping: {
                ['not set']: undefined
            }
        },
        renderAs: {
            name: 'render as',
            control: 'radio',
            options: ['default', 'button', 'div'],
            mapping: {
                default: undefined
            }
        },
        ...argTypesToHide([
            'titleIcon', 'icon', 'onClick', 'className',
            'indicator', 'indicatorIcon', 'indicatorValue',
            'innerRef'
        ])
    }
};