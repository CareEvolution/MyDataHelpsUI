import React from 'react';
import Goal, { GoalColorConfiguration } from './Goal';
import { Grid, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { faBicycle, faCalendarDays, faDog, faHeartbeat, faListCheck, faMicrochip, faSquarePollHorizontal, faUserDoctor, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { ColorDefinition, createCustomFieldIntegerValueProvider, createRandomIntegerValueProvider, createStaticIntegerValueProvider } from '../../../helpers';
import { argTypesToHide } from '../../../../.storybook/helpers';

const meta: Meta<React.ComponentProps<typeof Goal>> = {
    title: 'Container/Goal',
    component: Goal,
    parameters: {
        layout: 'fullscreen'
    }
};
export default meta;

type GoalDefaultStoryArgs = React.ComponentProps<typeof Goal> & {
    colorScheme: 'auto' | 'light' | 'dark';
    iconType: 'default' | 'custom';
};

export const Default: StoryObj<GoalDefaultStoryArgs> = {
    args: {
        colorScheme: 'auto',
        variant: 'default' as any,
        previewState: 'complete',
        label: 'Days Wearing Fitness Tracker',
        description: 'Here is a description about days wearing a fitness tracker.',
        targetValue: 4,
        maxValue: 7,
        maxSegments: 10,
        iconType: 'default',
        notStartedColor: '',
        inProgressColor: '',
        completedColor: '',
        loadingIndicatorColor: '',
        progressBarColor: '',
        progressBarBackgroundColor: ''
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'verbose', 'compact'],
            mapping: { 'default': undefined }
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'not started', 'in progress', 'complete', 'maxed out', 'random']
        },
        label: {
            name: 'label',
            control: 'text'
        },
        description: {
            name: 'description',
            control: 'text'
        },
        targetValue: {
            name: 'target value',
            control: 'number'
        },
        maxValue: {
            name: 'maximum value',
            control: 'number'
        },
        maxSegments: {
            name: 'maximum segments',
            control: 'number'
        },
        iconType: {
            name: 'icon',
            control: 'radio',
            options: ['default', 'custom']
        },
        notStartedColor: {
            name: 'not started color',
            control: 'color'
        },
        inProgressColor: {
            name: 'in progress color',
            control: 'color'
        },
        completedColor: {
            name: 'completed color',
            control: 'color'
        },
        loadingIndicatorColor: {
            name: 'loading indicator color',
            control: 'color'
        },
        progressBarColor: {
            name: 'progress bar color',
            control: 'color'
        },
        progressBarBackgroundColor: {
            name: 'progress bar background color',
            control: 'color'
        },
        ...argTypesToHide([
            'valueProvider', 'icon', 'style', 'innerRef'
        ])
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Goal
                {...args}
                icon={args.iconType === 'custom' ? faHeartbeat : undefined}
            />
        </Layout>;
    }
};

type GoalAdvancedColorStoryArgs = React.ComponentProps<typeof Goal> & {
    colorScheme: 'auto' | 'light' | 'dark';
    notStartedStatusColor: ColorDefinition;
    notStartedOnSegmentColor: ColorDefinition;
    notStartedOffSegmentColor: ColorDefinition;
    notStartedIconColor: ColorDefinition;
    notStartedIconBackgroundColor: ColorDefinition;
    inProgressStatusColor: ColorDefinition;
    inProgressOnSegmentColor: ColorDefinition;
    inProgressOffSegmentColor: ColorDefinition;
    inProgressIconColor: ColorDefinition;
    inProgressIconBackgroundColor: ColorDefinition;
    completedStatusColor: ColorDefinition;
    completedOnSegmentColor: ColorDefinition;
    completedOffSegmentColor: ColorDefinition;
    completedIconColor: ColorDefinition;
    completedIconBackgroundColor: ColorDefinition;
};

export const AdvancedColors: StoryObj<GoalAdvancedColorStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'complete',
        notStartedStatusColor: '',
        notStartedOnSegmentColor: '',
        notStartedOffSegmentColor: '',
        notStartedIconColor: '',
        notStartedIconBackgroundColor: '',
        inProgressStatusColor: '',
        inProgressOnSegmentColor: '',
        inProgressOffSegmentColor: '',
        inProgressIconColor: '',
        inProgressIconBackgroundColor: '',
        completedStatusColor: '',
        completedOnSegmentColor: '',
        completedOffSegmentColor: '',
        completedIconColor: '',
        completedIconBackgroundColor: '',
        progressBarColor: '',
        progressBarBackgroundColor: ''
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'not started', 'in progress', 'complete', 'maxed out', 'random']
        },
        notStartedStatusColor: {
            name: 'not started - status color',
            control: 'color'
        },
        notStartedOnSegmentColor: {
            name: 'not started - on segment color',
            control: 'color'
        },
        notStartedOffSegmentColor: {
            name: 'not started - off segment color',
            control: 'color'
        },
        notStartedIconColor: {
            name: 'not started - icon color',
            control: 'color'
        },
        notStartedIconBackgroundColor: {
            name: 'not started - icon background color',
            control: 'color'
        },
        inProgressStatusColor: {
            name: 'in progress - status color',
            control: 'color'
        },
        inProgressOnSegmentColor: {
            name: 'in progress - on segment color',
            control: 'color'
        },
        inProgressOffSegmentColor: {
            name: 'in progress - off segment color',
            control: 'color'
        },
        inProgressIconColor: {
            name: 'in progress - icon color',
            control: 'color'
        },
        inProgressIconBackgroundColor: {
            name: 'in progress - icon background color',
            control: 'color'
        },
        completedStatusColor: {
            name: 'completed - status color',
            control: 'color'
        },
        completedOnSegmentColor: {
            name: 'completed - on segment color',
            control: 'color'
        },
        completedOffSegmentColor: {
            name: 'completed - off segment color',
            control: 'color'
        },
        completedIconColor: {
            name: 'completed - icon color',
            control: 'color'
        },
        completedIconBackgroundColor: {
            name: 'completed - icon background color',
            control: 'color'
        },
        loadingIndicatorColor: {
            name: 'loading indicator color',
            control: 'color'
        },
        progressBarColor: {
            name: 'progress bar color',
            control: 'color'
        },
        progressBarBackgroundColor: {
            name: 'progress bar background color',
            control: 'color'
        },
        ...argTypesToHide([
            'variant', 'label', 'description', 'targetValue', 'maxValue', 'valueProvider', 'maxSegments', 'icon',
            'notStartedColor', 'inProgressColor', 'completedColor', 'style', 'innerRef'
        ])
    },
    render: args => {
        const notStartedColors: GoalColorConfiguration = {
            statusColor: args.notStartedStatusColor,
            onSegmentColor: args.notStartedOnSegmentColor,
            offSegmentColor: args.notStartedOffSegmentColor,
            iconColor: args.notStartedIconColor,
            iconBackgroundColor: args.notStartedIconBackgroundColor
        };
        const inProgressColors: GoalColorConfiguration = {
            statusColor: args.inProgressStatusColor,
            onSegmentColor: args.inProgressOnSegmentColor,
            offSegmentColor: args.inProgressOffSegmentColor,
            iconColor: args.inProgressIconColor,
            iconBackgroundColor: args.inProgressIconBackgroundColor
        };
        const completedColors: GoalColorConfiguration = {
            statusColor: args.completedStatusColor,
            onSegmentColor: args.completedOnSegmentColor,
            offSegmentColor: args.completedOffSegmentColor,
            iconColor: args.completedIconColor,
            iconBackgroundColor: args.completedIconBackgroundColor
        };

        return <Layout colorScheme={args.colorScheme}>
            <Goal
                {...args}
                variant="verbose"
                label="Days Wearing Fitness Tracker"
                description="Here is a description about days wearing a fitness tracker."
                targetValue={4}
                maxValue={7}
                notStartedColor={notStartedColors}
                inProgressColor={inProgressColors}
                completedColor={completedColors}
            />
        </Layout>;
    }
};

type GoalTieredStoryArgs = React.ComponentProps<typeof Goal> & {
    colorScheme: 'auto' | 'light' | 'dark';
    value: number;
};

export const Tiered: StoryObj<GoalTieredStoryArgs> = {
    args: {
        colorScheme: 'auto',
        variant: 'default' as any,
        value: 0
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'verbose', 'compact'],
            mapping: { 'default': undefined }
        },
        value: {
            name: 'value',
            control: {
                type: 'range',
                min: 0,
                max: 365
            }
        },
        ...argTypesToHide([
            'previewState', 'label', 'description', 'targetValue', 'maxValue', 'valueProvider', 'maxSegments', 'icon',
            'notStartedColor', 'inProgressColor', 'completedColor', 'loadingIndicatorColor',
            'progressBarColor', 'progressBarBackgroundColor', 'style', 'innerRef'
        ])
    },
    render: args => {
        const createGoal = (args: GoalTieredStoryArgs) => {
            return <Goal
                {...args}
                valueProvider={createStaticIntegerValueProvider(args.value)}
                maxSegments={10}
                notStartedColor={{
                    statusColor: { lightMode: '#59595d', darkMode: '#ddd' },
                    offSegmentColor: { lightMode: '#ddd', darkMode: '#59595d' },
                    iconColor: { lightMode: '#000', darkMode: '#ccc' }
                }}
                inProgressColor={{
                    statusColor: { lightMode: '#59595d', darkMode: '#ddd' },
                    onSegmentColor: '#43963d',
                    offSegmentColor: { lightMode: '#ddd', darkMode: '#59595d' },
                    iconColor: { lightMode: '#000', darkMode: '#ccc' }
                }}
                completedColor={{
                    statusColor: '#ffd700',
                    onSegmentColor: '#ffd700',
                    offSegmentColor: { lightMode: '#ddd', darkMode: '#59595d' },
                    iconColor: '#000',
                    iconBackgroundColor: '#ffd700'
                }}
                progressBarColor="#43963d"
                // progressBarBackgroundColor="#e1fad4"
            />;
        };

        const goals = [
            createGoal({
                ...args,
                label: 'Connect your medical records',
                description: 'Connect your medical records by scrolling down on your MyDataHelps Dashboard and tapping "Connect Provider".',
                targetValue: 1,
                maxValue: 1,
                icon: faUserDoctor
            }),
            createGoal({
                ...args,
                label: 'Log your symptoms',
                description: 'Enter daily symptoms logs to earn this badge.',
                targetValue: [
                    { targetValue: 6, color: '#cd7f32' },
                    {
                        targetValue: 180, color: '#bcc6cc',
                        inProgressColors: {
                            iconColor: '#000',
                            iconBackgroundColor: '#cd7f32'
                        }
                    },
                    {
                        targetValue: 360, color: '#ffd700',
                        inProgressColors: {
                            iconColor: '#000',
                            iconBackgroundColor: '#bcc6cc'
                        }
                    }
                ],
                maxValue: 360,
                icon: faCalendarDays
            }),
            createGoal({
                ...args,
                label: 'Complete your surveys',
                description: 'Complete surveys on your task list to earn this badge.',
                targetValue: 23,
                maxValue: 23,
                icon: faSquarePollHorizontal
            }),
            createGoal({
                ...args,
                label: 'Complete weekly check-ins',
                description: 'Complete weekly check-in surveys to earn this badge.',
                targetValue: [
                    { targetValue: 6, color: '#cd7f32' },
                    {
                        targetValue: 25, color: '#bcc6cc',
                        inProgressColors: {
                            iconColor: '#000',
                            iconBackgroundColor: '#cd7f32'
                        }
                    },
                    {
                        targetValue: 50, color: '#ffd700',
                        inProgressColors: {
                            iconColor: '#000',
                            iconBackgroundColor: '#bcc6cc'
                        }
                    }
                ],
                maxValue: 50,
                icon: faListCheck
            }),
            createGoal({
                ...args,
                label: 'Connect your smart device',
                description: 'Connect your smart device (e.g. Apple Watch, Fitbit) to MyDataHelps, if you own one, by selecting your device and logging in.',
                targetValue: [
                    { targetValue: 10, color: '#cd7f32' },
                    {
                        targetValue: 180, color: '#bcc6cc',
                        inProgressColors: {
                            iconColor: '#000',
                            iconBackgroundColor: '#cd7f32'
                        }
                    },
                    {
                        targetValue: 360, color: '#ffd700',
                        inProgressColors: {
                            iconColor: '#000',
                            iconBackgroundColor: '#bcc6cc'
                        }
                    }
                ],
                maxValue: 360,
                icon: faHeartbeat
            })
        ];

        const grid = args.variant === 'compact'
            ? <Grid gap={0}>
                {goals.map((goal, index) => <Grid.Column key={index} span={2.4}>{goal}</Grid.Column>)}
            </Grid>
            : <Grid gap={0}>
                <Grid.Column span={12}>{goals}</Grid.Column>
            </Grid>;

        return <Layout colorScheme={args.colorScheme}>{grid}</Layout>;
    }
};

type GoalLiveStoryArgs = React.ComponentProps<typeof Goal> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

export const Live: StoryObj<GoalLiveStoryArgs> = {
    args: {
        colorScheme: 'auto',
        variant: 'default' as any
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        variant: {
            name: 'variant',
            control: 'radio',
            options: ['default', 'verbose', 'compact'],
            mapping: { 'default': undefined }
        },
        ...argTypesToHide([
            'previewState', 'label', 'description', 'targetValue', 'maxValue', 'valueProvider', 'maxSegments', 'icon',
            'notStartedColor', 'inProgressColor', 'completedColor', 'loadingIndicatorColor',
            'progressBarColor', 'progressBarBackgroundColor', 'style', 'innerRef'
        ])
    },
    render: args => {
        const goals = [
            <Goal
                variant={args.variant}
                label="Value From Static Provider"
                targetValue={4}
                maxValue={10}
                valueProvider={createStaticIntegerValueProvider(3)}
                icon={faDog}
                inProgressColor={'#6ddec9'}
                completedColor={'#22776c'}
            />,
            <Goal
                variant={args.variant}
                label="Value From Random Provider"
                targetValue={7}
                maxValue={10}
                valueProvider={createRandomIntegerValueProvider(10)}
                icon={faBicycle}
                inProgressColor={'#224ca6'}
                completedColor={'#4a78ed'}
            />,
            <Goal
                variant={args.variant}
                label="Value From Custom Field Provider"
                targetValue={5}
                maxValue={10}
                valueProvider={createCustomFieldIntegerValueProvider('SomeCustomField')}
                icon={faWandSparkles}
                inProgressColor={'#8dd548'}
                completedColor={'#ca19ee'}
            />
        ];

        const grid = args.variant === 'compact'
            ? <Grid gap={0} style={{ margin: '16px' }}>
                {goals.map((goal, index) => <Grid.Column key={index} span={4}>{goal}</Grid.Column>)}
            </Grid>
            : <Grid gap={0}>
                <Grid.Column span={12}>{goals}</Grid.Column>
            </Grid>;

        return <Layout colorScheme={args.colorScheme}>{grid}</Layout>;
    }
};
