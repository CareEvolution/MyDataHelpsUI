import React from 'react';
import Layout from '../../presentational/Layout';
import language from '../../../helpers/language';
import { Card, DateRangeCoordinator, MealButtons, MealLog, Title } from '../../presentational';
import GlucoseChart from '../../container/GlucoseChart';
import { MealCoordinator, StressLevel } from '../../container';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface GlucoseViewProps {
    previewState?: 'default'
    colorScheme?: 'light' | 'dark' | 'auto';
    mealEditorUrl?: string;
}

export default function (props: GlucoseViewProps) {

    const onEditMeal = () => {
        if (props.previewState || !props.mealEditorUrl) {
            console.log('edit meal');
            return;
        }
        MyDataHelps.openApplication(props.mealEditorUrl, { modal: true });
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Title order={2} style={{ padding: '16px' }}>{language('glucose-view-title')}</Title>
        <DateRangeCoordinator intervalType="Day" variant="rounded">
            <MealCoordinator previewState={props.previewState === 'default' ? 'with data' : undefined}>
                <Card style={{ paddingTop: 0, marginTop: 0 }}>
                    <GlucoseChart previewState={props.previewState === 'default' ? 'with data' : undefined} showStats={true} />
                    <StressLevel previewState={props.previewState === 'default' ? 'with data' : undefined} />
                    <MealButtons preview={!!props.previewState} onEditMeal={() => onEditMeal()} />
                </Card>
                <Card>
                    <MealLog preview={!!props.previewState} onEditMeal={() => onEditMeal()} />
                </Card>
            </MealCoordinator>
        </DateRangeCoordinator>
    </Layout>;
}