import React from 'react'
import './MealAnalysis.css'
import { Meal } from '../../../helpers';
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
            <div className="mdhui-meal-analysis-title">Automated Analysis</div>
        </div>
        <div className="mdhui-meal-analysis-message">The items below have been suggested by an automated analysis of the image you provided.</div>
        <div className="mdhui-meal-analysis-items">{props.meal.analysis.items.map(item => item.name).join(', ')}</div>
        <div className="mdhui-meal-analysis-buttons">
            {props.onAddItems &&
                <Button variant="subtle" fullWidth={false} onClick={props.onAddItems} stopPropagation={true}>Add Items</Button>
            }
            {props.onDismiss &&
                <Button variant="subtle" fullWidth={false} onClick={props.onDismiss} stopPropagation={true}>Dismiss</Button>
            }
        </div>
    </div>;
}