import React from 'react';
import Layout from '../../presentational/Layout';
import Card from '../../presentational/Card';
import MealEditor from '../../container/MealEditor/MealEditor';
import { MealEditorPreviewState } from '../../container';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface MealEditorViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'loading' | MealEditorPreviewState | 'live';
}

export default function (props: MealEditorViewProps) {
    const dismiss = () => {
        if (props.previewState && props.previewState !== 'live') return;
        MyDataHelps.dismiss();
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'} flex={true}>
        <Card>
            <MealEditor
                previewState={props.previewState !== 'live' ? props.previewState : undefined}
                onError={dismiss}
                onDelete={dismiss}
                onCancel={dismiss}
                onSave={dismiss}
                withImageCapture={true}
            />
        </Card>
    </Layout>;
}