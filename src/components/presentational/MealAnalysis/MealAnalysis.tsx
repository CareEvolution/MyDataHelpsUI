import React from 'react'
import './MealAnalysis.css'
import { language, Meal } from '../../../helpers';
import { Button } from '../../presentational';

export interface MealAnalysisProps {
    meal: Meal;
    onAddItems?: () => void;
    onDismiss?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function MealAnalysis(props: MealAnalysisProps) {
    if (!props.meal.analysis || props.meal.analysis.items.length === 0 || props.meal.analysis.reviewTimestamp) return null;

    return <div className="mdhui-meal-analysis">
        <div className="mdhui-meal-analysis-header">
            <div className="mdhui-meal-analysis-title">{language('meal-analysis-title')}</div>
        </div>
        <div className="mdhui-meal-analysis-message">{language('meal-analysis-message')}</div>
        <div className="mdhui-meal-analysis-items">{props.meal.analysis.items.map(item => item.name).join(', ')}</div>
        <div className="mdhui-meal-analysis-buttons">
            {props.onAddItems &&
                <Button variant="subtle" fullWidth={false} onClick={props.onAddItems} stopPropagation={true}>{language('meal-analysis-add-items')}</Button>
            }
            {props.onDismiss &&
                <Button variant="subtle" fullWidth={false} onClick={props.onDismiss} stopPropagation={true}>{language('meal-analysis-dismiss')}</Button>
            }
        </div>
    </div>;
}