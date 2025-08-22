import React, { useRef, useState } from 'react';
import { getMealAnalysisPreviewData, MealAnalysisPreviewState } from '../../../helpers/glucose-and-meals/preview-data';
import { getDayKey, getMealImageUrls, language, Meal, prepareMealForEditing, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { combineItemsWithAnalysisItems, getMealsByDate } from '../../../helpers/glucose-and-meals/meals';
import { add, isWithinInterval, startOfDay, startOfToday } from 'date-fns';
import SingleMeal from '../../presentational/SingleMeal';
import { Action, LoadingIndicator } from '../../presentational';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { v4 as uuid } from 'uuid';
import { onMealsUpdated, useMealsUpdatedEventListener } from '../../../helpers/glucose-and-meals/events';

export interface MealAnalysisPreviewProps {
    previewState?: 'loading' | MealAnalysisPreviewState;
    variant?: 'compact';
    onReviewAll: () => void;
    onEditMeal: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component displays pending meal analyses, allows for one-at-a-time review, and can open a full meal analysis review worklist.
 */
export default function MealAnalysisPreview(props: MealAnalysisPreviewProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>();
    const [mealsNeedingReview, setMealsNeedingReview] = useState<Meal[]>();
    const [mealImageUrls, setMealImageUrls] = useState<Record<string, string>>();
    const [mealToReview, setMealToReview] = useState<Meal>();
    const mealsUpdatedSenderId = useRef<string>(uuid());

    const startDate = add(startOfToday(), { days: -13 });
    const endDate = startOfToday();

    const resetState = (): void => {
        setMealsByDate(undefined);
        setMealsNeedingReview(undefined);
        setMealImageUrls(undefined);
        setMealToReview(undefined);
    }

    const initialize = async (): Promise<void> => {
        setLoading(true);

        if (props.previewState === 'loading') {
            resetState();
            return;
        }

        const previewData = getMealAnalysisPreviewData(props.previewState);

        const mealsByDate = previewData?.mealsByDate ?? await getMealsByDate(startDate, endDate);
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

        setLoading(props.previewState === 'with meals to review - reloading');
    };

    useInitializeView(initialize, [], [props.previewState]);
    useMealsUpdatedEventListener(detail => {
        if (isWithinInterval(detail.date, { start: startDate, end: endDate })) {
            initialize();
        }
    }, [mealsUpdatedSenderId.current]);

    if (!mealsByDate || !mealsNeedingReview || !mealImageUrls || !mealToReview) return null;

    const onReview = (): void => {
        if (props.previewState) return;
        setLoading(true);
        prepareMealForEditing(mealToReview).then(props.onEditMeal);
    };

    const onAddItems = async (): Promise<void> => {
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

        if (mealsNeedingReview.length > 1) {
            const nextMealNeedingReview = mealsNeedingReview[1];
            setMealsByDate({ ...mealsByDate, [dayKey]: updatedMeals });
            setMealsNeedingReview(mealsNeedingReview.slice(1));
            setMealToReview(nextMealNeedingReview);
        } else {
            resetState();
        }
        setLoading(false);
    };

    return <div className="mdhui-meal-analysis-preview" ref={props.innerRef}>
        <Action
            title={language('meal-analysis-preview-title')}
            indicator={loading && props.variant === 'compact' ? <FontAwesomeSvgIcon icon={faRefresh} spin /> : undefined}
            indicatorValue={!loading && mealsNeedingReview.length > 0 ? mealsNeedingReview.length.toString() : undefined}
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