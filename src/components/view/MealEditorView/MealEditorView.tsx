import React from 'react';
import Layout from '../../presentational/Layout';
import { MealEditor } from '../../container';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { Card } from '../../presentational';

export interface MealEditorViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: MealEditorViewProps) {
    const onError = () => {
        if (props.previewState) {
            console.log('error');
            return;
        }
        MyDataHelps.dismiss();
    };

    const onDelete = () => {
        if (props.previewState) {
            console.log('delete');
            return;
        }
        MyDataHelps.dismiss();
    };

    const onSave = () => {
        if (props.previewState) {
            console.log('save');
            return;
        }
        MyDataHelps.dismiss();
    };

    const onCancel = () => {
        if (props.previewState) {
            console.log('cancel');
            return;
        }
        MyDataHelps.dismiss();
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Card>
            <MealEditor
                previewState={props.previewState === 'default' ? 'edit' : undefined}
                onError={() => onError()}
                onDelete={() => onDelete()}
                onCancel={() => onCancel()}
                onSave={() => onSave()}
            />
        </Card>
    </Layout>;
}