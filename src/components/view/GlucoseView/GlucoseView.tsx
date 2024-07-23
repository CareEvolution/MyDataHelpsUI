import React from 'react';
import './GlucoseView.css';
import Layout from '../../presentational/Layout';
import NavigationBar from '../../presentational/NavigationBar';
import language from '../../../helpers/language';
import { Card, DateRangeCoordinator, MealButtons, MealLog } from '../../presentational';
import GlucoseChart from '../../container/GlucoseChart';
import { MealCoordinator, StressLevel } from '../../container';

export interface GlucoseViewProps {
    previewState?: 'default'
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: GlucoseViewProps) {

    const onEditMeal = () => {
        console.log('edit meal');
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'} className="mdhui-glucose">
        <NavigationBar title={language('glucose-view-title')} showCloseButton={true} variant="compressedModal" />
        <DateRangeCoordinator intervalType="Day" variant="rounded">
            <MealCoordinator previewState={props.previewState === 'default' ? 'with data' : undefined}>
                <Card>
                    <GlucoseChart previewState={props.previewState === 'default' ? 'with data' : undefined} showStats={true} />
                    <StressLevel previewState={props.previewState === 'default' ? 'loaded' : undefined} />
                    <MealButtons preview={!!props.previewState} onEditMeal={() => onEditMeal()} />
                </Card>
                <Card>
                    <MealLog preview={!!props.previewState} onEditMeal={() => onEditMeal()} />
                </Card>
            </MealCoordinator>
        </DateRangeCoordinator>
    </Layout>;
}