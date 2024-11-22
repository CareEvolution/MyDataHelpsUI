﻿import React, { CSSProperties } from 'react';
import { Card, Layout } from '../../presentational';
import MealEditor, { MealEditorProps } from './MealEditor';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { MealEditorPreviewState } from './MealEditor.previewData';

export default {
    title: 'Container/MealEditor',
    component: MealEditor,
    parameters: { layout: 'fullscreen' }
};

interface MealEditorStoryArgs extends MealEditorProps {
    colorScheme: 'auto' | 'light' | 'dark';
    stateWithoutImageCapture: 'loading' | 'loaded' | 'live';
    stateWithImageCapture: 'loading' | MealEditorPreviewState | 'live';
    withChildren: boolean;
}

const render = (args: MealEditorStoryArgs) => {
    const onError = () => {
        console.log('error');
    };

    const onDelete = () => {
        console.log('delete');
    };

    const onCancel = () => {
        console.log('cancel');
    };

    const onSave = () => {
        console.log('save');
    };

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
                onError={() => onError()}
                onDelete={() => onDelete()}
                onCancel={() => onCancel()}
                onSave={() => onSave()}
                withImageCapture={args.withImageCapture}
                children={args.withChildren ? createChildren() : undefined}
            />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        withImageCapture: false,
        stateWithoutImageCapture: 'loaded',
        stateWithImageCapture: 'without image',
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
        ...argTypesToHide(['previewState'])
    },
    render: render
};