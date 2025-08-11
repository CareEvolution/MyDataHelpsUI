import React from 'react';
import { language } from '../../../helpers';
import BlankView from '../BlankView';
import MealAnalysisWorklist from '../../container/MealAnalysisWorklist';

export interface MealAnalysisViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: Parameters<typeof MealAnalysisWorklist>[0]['previewState'];
    onEditMeal: () => void;
}

export default function MealAnalysisView(props: MealAnalysisViewProps) {
    return <BlankView title={language('meal-analysis-view-title')} showCloseButton>
        <MealAnalysisWorklist
            previewState={props.previewState}
            onEditMeal={props.onEditMeal}
        />
    </BlankView>;
}