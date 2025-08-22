import React, { useContext } from 'react'
import './MealLog.css'
import { getColorFromAssortment, language, Meal, prepareMealForEditing } from '../../../helpers';
import { LoadingIndicator, TextBlock, Title } from '../index';
import SingleMeal from '../SingleMeal';
import { MealContext } from '../../container';
import { combineItemsWithAnalysisItems } from '../../../helpers/glucose-and-meals/meals';

export interface MealLogProps {
    preview?: boolean;
    onEditMeal: () => void;
    showMealNumbers?: boolean;
    highlightSelectedMeal?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component renders a daily meal log.  It can be configured to show meal numbers and/or
 * highlight the currently selected meal.  It must be used within a Meal Coordinator.
 */
export default function MealLog(props: MealLogProps) {
    const mealContext = useContext(MealContext);

    if (!mealContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Meal Log must be used within a Meal Coordinator.</TextBlock>
    }

    const onEditMeal = (meal: Meal) => {
        if (props.preview) {
            props.onEditMeal();
            return;
        }
        prepareMealForEditing(meal).then(props.onEditMeal);
    };

    const onAddAnalysisItems = (meal: Meal) => {
        if (props.preview || !meal.analysis) return;

        const now = new Date();
        meal.items = combineItemsWithAnalysisItems(meal);
        meal.analysis.reviewTimestamp = now;
        meal.lastModified = now;

        mealContext.saveMeal(meal);
    };

    return <div className="mdhui-meal-log" ref={props.innerRef}>
        <Title order={3}>{language('meal-log-title')}</Title>
        {mealContext.loading && <LoadingIndicator />}
        {!mealContext.loading && mealContext.meals.length === 0 &&
            <div className="mdhui-meal-log-empty-text">{language('meal-log-no-data')}</div>
        }
        {!mealContext.loading && mealContext.meals.map((meal, index) => {
            return <SingleMeal
                key={`meal-${index}`}
                meal={meal}
                mealImageUrl={mealContext.imageUrls[meal.id.toString()]}
                number={props.showMealNumbers ? index + 1 : undefined}
                color={getColorFromAssortment(index)}
                onClick={() => mealContext.onMealClicked(meal)}
                onEdit={() => onEditMeal(meal)}
                onAddAnalysisItems={() => onAddAnalysisItems(meal)}
                onReviewAnalysis={() => onEditMeal(meal)}
                selected={props.highlightSelectedMeal ? mealContext.selectedMeal === meal : false}
            />;
        })}
    </div>;
}