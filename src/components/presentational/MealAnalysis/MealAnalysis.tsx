import React from 'react'
import './MealAnalysis.css'
import { language, Meal } from '../../../helpers';
import { Button, UnstyledButton } from '../../presentational';
import { itemSort } from '../../../helpers/glucose-and-meals/meals';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface MealAnalysisProps {
    variant?: 'worklist';
    meal: Meal;
    onAddItem?: (itemToAdd: string) => void;
    onAddItems?: () => void;
    onReviewItems?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function MealAnalysis(props: MealAnalysisProps) {
    if (!props.meal.analysis || props.meal.analysis.items.length === 0 || (props.variant === 'worklist' && props.meal.analysis.reviewTimestamp)) return null;

    return <div className="mdhui-meal-analysis">
        <div className="mdhui-meal-analysis-header">
            <div className="mdhui-meal-analysis-title">{language('meal-analysis-title')}</div>
        </div>
        <div className="mdhui-meal-analysis-message">{language('meal-analysis-message')}</div>
        <div className="mdhui-meal-analysis-items">
            {props.variant === 'worklist' && props.meal.analysis.items.sort(itemSort).map(item => item.name).join(', ')}
            {props.variant !== 'worklist' && props.meal.analysis.items.sort(itemSort).map(item => {
                return <UnstyledButton key={item.name} onClick={() => props.onAddItem?.(item.name)}>
                    <div className="mdhui-meal-analysis-item">
                        <FontAwesomeSvgIcon className="mdhui-meal-analysis-item-add-icon" icon={faPlus} />
                        {item.name}
                    </div>
                </UnstyledButton>;
            })}
        </div>
        <div className="mdhui-meal-analysis-buttons">
            <Button variant="subtle" fullWidth={false} onClick={() => props.onAddItems?.()} stopPropagation={true}>{language('meal-analysis-add-items')}</Button>
            {props.variant === 'worklist' &&
                <Button variant="subtle" fullWidth={false} onClick={() => props.onReviewItems?.()} stopPropagation={true}>{language('meal-analysis-review')}</Button>
            }
        </div>
    </div>;
}