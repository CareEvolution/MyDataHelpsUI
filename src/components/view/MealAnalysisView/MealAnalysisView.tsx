import React from 'react';
import { language } from '../../../helpers';
import BlankView from '../BlankView';
import MealAnalysisWorklist from '../../container/MealAnalysisWorklist';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface MealAnalysisViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: Parameters<typeof MealAnalysisWorklist>[0]['previewState'];
    mealEditorUrl: string;
}

export default function MealAnalysisView(props: MealAnalysisViewProps) {
    const onEditMeal = (): void => {
        if (props.previewState) return;
        MyDataHelps.openApplication(props.mealEditorUrl, { modal: true });
    }

    return <BlankView title={language('meal-analysis-view-title')} showCloseButton>
        <MealAnalysisWorklist
            previewState={props.previewState}
            onEditMeal={onEditMeal}
        />
    </BlankView>;
}