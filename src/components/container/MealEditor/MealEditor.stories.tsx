import React from 'react';
import { Card, Layout } from '../../presentational';
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

    const onCancel = () => {
        console.log('cancel');
    };

    const onSave = () => {
        console.log('save');
    };

    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <MealEditor
                previewState={args.previewState}
                onError={() => onError()}
                onDelete={() => onDelete()}
                onCancel={() => onCancel()}
                onSave={() => onSave()}
            />
        </Card>
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