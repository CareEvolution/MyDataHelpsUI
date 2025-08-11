import React, { useState } from 'react';
import { getMealAnalysisPreviewData, MealAnalysisPreviewState } from '../../../helpers/glucose-and-meals/preview-data';
import { getDayKey, getMealImageUrls, language, Meal, prepareMealForEditing, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { combineItemsWithAnalysisItems, getMealsByDate } from '../../../helpers/glucose-and-meals/meals';
import { add, startOfDay, startOfToday } from 'date-fns';
import SingleMeal from '../../presentational/SingleMeal';
import { Card, LoadingIndicator, TextBlock, Title } from '../../presentational';

export interface MealAnalysisReviewProps {
    previewState?: 'loading' | MealAnalysisPreviewState;
    onEditMeal: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function MealAnalysisReview(props: MealAnalysisReviewProps) {
    const today = startOfToday();

    const [loading, setLoading] = useState<boolean>(true);
    const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>();
    const [mealsNeedingReview, setMealsNeedingReview] = useState<Meal[]>();
    const [mealImageUrls, setMealImageUrls] = useState<Record<string, string>>();

    const initialize = async (): Promise<void> => {
        setLoading(true);

        if (props.previewState === 'loading') return;

        const previewData = getMealAnalysisPreviewData(props.previewState);

        const mealsByDate = previewData?.mealsByDate ?? await getMealsByDate(add(today, { days: -13 }), today);
        const mealsNeedingReview = Object.values(mealsByDate).flat()
            .filter(meal => meal.analysis && !meal.analysis.reviewTimestamp && !meal.archiveTimestamp)
            .sort(timestampSortAsc);
        const mealImageUrls = previewData?.mealImageUrls ?? await getMealImageUrls(mealsNeedingReview);

        setMealsByDate(mealsByDate);
        setMealsNeedingReview(mealsNeedingReview);
        setMealImageUrls(mealImageUrls);
        setLoading(false);
    };

    useInitializeView(initialize, [], [props.previewState]);

    if (loading || !mealsByDate || !mealsNeedingReview || !mealImageUrls) {
        return <div className="mdhui-meal-analysis-review" ref={props.innerRef}>
            <Title order={3} defaultMargin>{language('meal-analysis-review-title')}</Title>
            <LoadingIndicator />
        </div>;
    }

    const onReview = (mealToEdit: Meal): void => {
        if (props.previewState) {
            props.onEditMeal();
            return;
        }
        setLoading(true);
        prepareMealForEditing(mealToEdit).then(props.onEditMeal);
    };

    const onAddItems = (mealToEdit: Meal): void => {
        if (props.previewState || !mealToEdit.analysis) return;

        setLoading(true);

        const now = new Date();
        mealToEdit.items = combineItemsWithAnalysisItems(mealToEdit);
        mealToEdit.analysis.reviewTimestamp = now;
        mealToEdit.lastModified = now;

        const dayKey = getDayKey(mealToEdit.timestamp);
        const otherMeals = mealsByDate[dayKey].filter(meal => meal.id !== meal.id);
        const updatedMeals = [...otherMeals, mealToEdit].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToEdit.timestamp), updatedMeals).then(() => {
            setMealsByDate({ ...mealsByDate, [dayKey]: updatedMeals });
            setMealsNeedingReview(mealsNeedingReview.filter(meal => meal.id !== mealToEdit.id));
            setLoading(false);
        });
    };

    return <div className="mdhui-meal-analysis-review" ref={props.innerRef}>
        <Title order={3} defaultMargin>{language('meal-analysis-review-title')}</Title>
        {mealsNeedingReview.length > 0 && mealsNeedingReview.map((meal, index) => {
            return <Card key={`meal-${index}`}>
                <SingleMeal
                    meal={meal}
                    mealImageUrl={mealImageUrls[meal.id.toString()]}
                    onAddAnalysisItems={() => onAddItems(meal)}
                    onReviewAnalysis={() => onReview(meal)}
                    displayDateWithTime
                />
            </Card>;
        })}
        {mealsNeedingReview.length === 0 &&
            <TextBlock
                color="var(--mdhui-text-color-2)"
                style={{
                    margin: 0,
                    padding: '16px',
                    lineHeight: '22px',
                    textAlign: 'center'
                }}
            >{language('meal-analysis-review-empty')}</TextBlock>
        }
    </div>;
}