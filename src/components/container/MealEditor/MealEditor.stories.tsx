import React from 'react';
import { Layout } from '../../presentational';
import MealEditor, { MealEditorProps } from './MealEditor';

export default {
    title: 'Container/MealEditor',
    component: MealEditor,
    parameters: { layout: 'fullscreen' }
};

interface MealEditorStoryArgs extends MealEditorProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: MealEditorStoryArgs) => {
    const onError = () => {
        console.log('error');
    };

    const onDelete = () => {
        console.log('delete');
    };

    const onSave = () => {
        console.log('save');
    };

    const onCancel = () => {
        console.log('cancel');
    };

    return <Layout colorScheme={args.colorScheme}>
        <MealEditor
            previewState={args.previewState}
            onError={() => onError()}
            onDelete={() => onDelete()}
            onSave={() => onSave()}
            onCancel={() => onCancel()}
        />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'add'
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
            options: ['loading', 'add', 'edit']
        }
    },
    render: render
};