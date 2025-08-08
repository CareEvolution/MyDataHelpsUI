import React, { useState } from 'react';
import { getDayKey, getMealImageUrls, language, Meal, prepareMealForEditing, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { combineItemsWithAnalysisItems, getMealsByDate } from '../../../helpers/glucose-and-meals/meals';
import { add, startOfDay, startOfToday } from 'date-fns';
import SingleMeal from '../../presentational/SingleMeal';
import { Action, LoadingIndicator } from '../../presentational';
import { getPreviewData } from './MealAnalysisPreview.previewData';

export interface MealAnalysisPreviewProps {
    previewState?: 'default';
    variant?: 'compact';
    onReviewAll: () => void;
    onEditMeal: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function MealAnalysisPreview(props: MealAnalysisPreviewProps) {
    const today = startOfToday();

    const [loading, setLoading] = useState<boolean>(true);
    const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>();
    const [mealsNeedingReview, setMealsNeedingReview] = useState<Meal[]>();
    const [mealImageUrls, setMealImageUrls] = useState<Record<string, string>>();
    const [mealToReview, setMealToReview] = useState<Meal>();

    const initialize = async (): Promise<void> => {
        setLoading(true);

        const previewData = getPreviewData(props.previewState);

        const mealsByDate = previewData?.mealsByDate ?? await getMealsByDate(add(today, { days: -13 }), today);
        const mealsNeedingReview = Object.values(mealsByDate).flat()
            .filter(meal => meal.analysis && !meal.analysis.reviewTimestamp && !meal.archiveTimestamp)
            .sort(timestampSortAsc);
        const mealImageUrls = previewData?.mealImageUrls ?? await getMealImageUrls(mealsNeedingReview);

        if (mealsNeedingReview.length > 0) {
            setMealsByDate(mealsByDate);
            setMealsNeedingReview(mealsNeedingReview);
            setMealImageUrls(mealImageUrls);
            setMealToReview(mealsNeedingReview[0]);
        } else {
            setMealsByDate(undefined);
            setMealsNeedingReview(undefined);
            setMealImageUrls(undefined);
            setMealToReview(undefined);
        }

        setLoading(false);
    };

    useInitializeView(initialize);

    if (!mealsByDate || !mealsNeedingReview || !mealImageUrls || !mealToReview) return null;

    const onReview = (): void => {
        if (props.previewState) {
            props.onEditMeal();
            return;
        }
        setLoading(true);
        prepareMealForEditing(mealToReview).then(props.onEditMeal);
    };

    const onAddItems = (): void => {
        if (props.previewState || !mealToReview.analysis) return;

        setLoading(true);

        const now = new Date();
        mealToReview.items = combineItemsWithAnalysisItems(mealToReview);
        mealToReview.analysis.reviewTimestamp = now;
        mealToReview.lastModified = now;

        const dayKey = getDayKey(mealToReview.timestamp);
        const otherMeals = mealsByDate[dayKey].filter(meal => meal.id !== mealToReview.id);
        const updatedMeals = [...otherMeals, mealToReview].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToReview.timestamp), updatedMeals).then(() => {
            if (mealsNeedingReview.length > 1) {
                const nextMealNeedingReview = mealsNeedingReview[1];
                setMealsByDate({ ...mealsByDate, [dayKey]: updatedMeals });
                setMealsNeedingReview(mealsNeedingReview.slice(1));
                setMealToReview(nextMealNeedingReview);
            } else {
                setMealsByDate(undefined);
                setMealsNeedingReview(undefined);
                setMealImageUrls(undefined);
                setMealToReview(undefined);
            }
            setLoading(false);
        });
    };

    return <div className="mdhui-meal-analysis-preview" ref={props.innerRef}>
        <Action
            title={language('meal-analysis-preview-title')}
            indicatorValue={mealsNeedingReview.length > 0 ? mealsNeedingReview.length.toString() : undefined}
            bottomBorder={props.variant !== 'compact'}
            onClick={props.onReviewAll}
        />
        {props.variant !== 'compact' &&
            <>
                {loading && <LoadingIndicator />}
                {!loading &&
                    <SingleMeal
                        meal={mealToReview}
                        mealImageUrl={mealImageUrls[mealToReview.id.toString()]}
                        onAddAnalysisItems={onAddItems}
                        onReviewAnalysis={onReview}
                        displayDateWithTime
                    />
                }
            </>
        }
    </div>;
}