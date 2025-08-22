import React, { CSSProperties } from 'react';
import { Card, Layout } from '../../presentational';
import MealEditor from './MealEditor';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { MealEditorPreviewState } from './MealEditor.previewData';
import { Meta, StoryObj } from '@storybook/react';

type MealEditorStoryArgs = React.ComponentProps<typeof MealEditor> & {
    colorScheme: 'auto' | 'light' | 'dark';
    stateWithoutImageCapture: 'loading' | 'loaded' | 'live';
    stateWithImageCapture: 'loading' | MealEditorPreviewState | 'live';
    withChildren: boolean;
};

const meta: Meta<MealEditorStoryArgs> = {
    title: 'Container/MealEditor',
    component: MealEditor,
    parameters: { layout: 'fullscreen' },
    render: args => {
        const computePreviewState = (args: MealEditorStoryArgs): 'loading' | MealEditorPreviewState | undefined => {
            return args.withImageCapture
                ? args.stateWithImageCapture !== 'live' ? args.stateWithImageCapture as 'loading' | MealEditorPreviewState : undefined
                : args.stateWithoutImageCapture !== 'live' ? args.stateWithoutImageCapture as 'loading' | 'loaded' : undefined;
        };

        const createChildren = () => {
            const childStyle: CSSProperties = {
                textDecoration: 'underline',
                textAlign: 'right',
                color: 'var(--mdhui-color-primary)',
                fontSize: '0.8em',
                padding: '0 16px'
            };
            return <div style={childStyle}>Provide More Details</div>;
        };

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <MealEditor
                    previewState={computePreviewState(args)}
                    onError={() => console.log('error')}
                    onDelete={() => console.log('delete')}
                    onCancel={() => console.log('cancel')}
                    onSave={() => console.log('save')}
                    withImageCapture={args.withImageCapture}
                    children={args.withChildren ? createChildren() : undefined}
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<MealEditorStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        withImageCapture: false,
        stateWithoutImageCapture: 'loaded',
        stateWithImageCapture: 'loaded',
        withChildren: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        withImageCapture: {
            name: 'with image capture?'
        },
        stateWithoutImageCapture: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'loaded', 'with automated meal analysis', 'live'],
            if: { arg: 'withImageCapture', eq: false }
        },
        stateWithImageCapture: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'loaded', 'with image', 'with image and automated meal analysis', 'live'],
            if: { arg: 'withImageCapture', eq: true }
        },
        withChildren: {
            name: 'with child components?'
        },
        ...argTypesToHide(['previewState', 'onError', 'onDelete', 'onSave', 'onCancel', 'innerRef'])
    }
};