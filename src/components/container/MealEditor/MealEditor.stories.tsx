import React, { CSSProperties } from 'react';
import { Card, Layout } from '../../presentational';
import MealEditor from './MealEditor';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { MealEditorPreviewState } from './MealEditor.previewData';
import { Meta, StoryObj } from "@storybook/react";

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
            if (args.withImageCapture) {
                if (args.stateWithImageCapture === 'loading') {
                    return 'loading';
                }
                if (args.stateWithImageCapture !== 'live') {
                    return args.stateWithImageCapture as MealEditorPreviewState;
                }
                return undefined;
            }
            if (args.stateWithoutImageCapture === 'loading') {
                return 'loading';
            }
            if (args.stateWithoutImageCapture === 'loaded') {
                return 'without existing image'
            }
            return undefined;
        };

        const createChildren = () => {
            const childStyle: CSSProperties = {
                textDecoration: 'underline',
                textAlign: 'right',
                color: 'var(--mdhui-color-primary)',
                fontSize: '0.8em'
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
        stateWithImageCapture: 'without existing image',
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
            options: ['loading', 'loaded', 'live'],
            if: { arg: 'withImageCapture', eq: false }
        },
        stateWithImageCapture: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'without existing image', 'with existing image', 'live'],
            if: { arg: 'withImageCapture', eq: true }
        },
        withChildren: {
            name: 'with child components?'
        },
        ...argTypesToHide(['previewState', 'onError', 'onDelete', 'onSave', 'onCancel', 'innerRef'])
    }
};