import React, { useRef, useState } from 'react';
import { getMealAnalysisPreviewData, MealAnalysisPreviewState } from '../../../helpers/glucose-and-meals/preview-data';
import { getDayKey, getMealImageUrls, language, Meal, prepareMealForEditing, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { combineItemsWithAnalysisItems, getMealsByDate } from '../../../helpers/glucose-and-meals/meals';
import { add, isWithinInterval, startOfDay, startOfToday } from 'date-fns';
import SingleMeal from '../../presentational/SingleMeal';
import { Card, LoadingIndicator, TextBlock } from '../../presentational';
import { v4 as uuid } from 'uuid';
import { onMealsUpdated, useMealsUpdatedEventListener } from '../../../helpers/glucose-and-meals/events';

export interface MealAnalysisWorklistProps {
    previewState?: 'loading' | MealAnalysisPreviewState;
    onEditMeal: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component displays the full list of pending meal analyses for review.
 */
export default function MealAnalysisWorklist(props: MealAnalysisWorklistProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>();
    const [mealsNeedingReview, setMealsNeedingReview] = useState<Meal[]>();
    const [mealImageUrls, setMealImageUrls] = useState<Record<string, string>>();
    const mealsUpdatedSenderId = useRef<string>(uuid());

    const startDate = add(startOfToday(), { days: -13 });
    const endDate = startOfToday();

    const initialize = async (): Promise<void> => {
        setLoading(true);

        if (props.previewState === 'loading') return;

        const previewData = getMealAnalysisPreviewData(props.previewState);

        const mealsByDate = previewData?.mealsByDate ?? await getMealsByDate(startDate, endDate);
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
    useMealsUpdatedEventListener(detail => {
        if (isWithinInterval(detail.date, { start: startDate, end: endDate })) {
            initialize();
        }
    }, [mealsUpdatedSenderId.current]);

    if (loading || !mealsByDate || !mealsNeedingReview || !mealImageUrls) {
        return <div className="mdhui-meal-analysis-worklist" ref={props.innerRef}>
            <LoadingIndicator />
        </div>;
    }

    const onReview = (mealToReview: Meal): void => {
        if (props.previewState) return;
        setLoading(true);
        prepareMealForEditing(mealToReview).then(props.onEditMeal);
    };

    const onAddItems = async (mealToReview: Meal): Promise<void> => {
        if (props.previewState || !mealToReview.analysis) return;

        setLoading(true);

        const now = new Date();
        mealToReview.items = combineItemsWithAnalysisItems(mealToReview);
        mealToReview.analysis.reviewTimestamp = now;
        mealToReview.lastModified = now;

        const dayKey = getDayKey(mealToReview.timestamp);
        const otherMeals = mealsByDate[dayKey].filter(meal => meal.id !== mealToReview.id);
        const updatedMeals = [...otherMeals, mealToReview].sort(timestampSortAsc);

        const mealDate = startOfDay(mealToReview.timestamp);
        await saveMeals(mealDate, updatedMeals);
        onMealsUpdated(mealsUpdatedSenderId.current, mealDate);

        setMealsByDate({ ...mealsByDate, [dayKey]: updatedMeals });
        setMealsNeedingReview(mealsNeedingReview.filter(meal => meal.id !== mealToReview.id));
        setLoading(false);
    };

    return <div className="mdhui-meal-analysis-worklist" ref={props.innerRef}>
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
            >{language('meal-analysis-worklist-empty')}</TextBlock>
        }
    </div>;
}