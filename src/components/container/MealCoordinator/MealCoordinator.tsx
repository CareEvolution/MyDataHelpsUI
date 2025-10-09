import React, { createContext, useContext, useRef, useState } from 'react';
import { getMealImageUrls, getMeals, Meal, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { DateRangeContext } from '../../presentational';
import { isSameDay, startOfDay, startOfToday } from 'date-fns';
import { createPreviewData, MealCoordinatorPreviewState } from './MealCoordinator.previewData';
import { v4 as uuid } from 'uuid';
import { onMealsUpdated, useMealsUpdatedEventListener } from '../../../helpers/glucose-and-meals/events';

export interface MealCoordinatorProps {
    previewState?: 'loading' | MealCoordinatorPreviewState;
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface MealContext {
    loading: boolean;
    meals: Meal[];
    imageUrls: { [key: string]: string };
    selectedMeal?: Meal;
    addMeal: (meal: Meal) => Promise<void>;
    saveMeal: (meal: Meal) => Promise<void>;
    onMealClicked: (meal: Meal) => void;
}

export const MealContext = createContext<MealContext | null>(null);

/**
 * This component is used to load and coordinate meal data across its meal-aware child components.
 */
export default function MealCoordinator(props: MealCoordinatorProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const selectedDate = dateRangeContext?.intervalStart ?? startOfToday();

    const [loading, setLoading] = useState<boolean>(true);
    const [allMeals, setAllMeals] = useState<Meal[]>([]);
    const [activeMeals, setActiveMeals] = useState<Meal[]>([]);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [selectedMeal, setSelectedMeal] = useState<Meal>();
    const mealsUpdatedSenderId = useRef<string>(uuid());

    const initialize = () => {
        setLoading(true);
        setAllMeals([]);
        setActiveMeals([]);
        setSelectedMeal(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            const previewData = createPreviewData(props.previewState, selectedDate);
            setLoading(false);
            setAllMeals(previewData.allMeals);
            setActiveMeals(previewData.activeMeals);
            setImageUrls(previewData.imageUrls);
            return;
        }

        getMeals(selectedDate).then(allMeals => {
            const activeMeals = allMeals.filter(meal => !meal.archiveTimestamp);
            getMealImageUrls(activeMeals).then(imageUrls => {
                setLoading(false);
                setAllMeals(allMeals);
                setActiveMeals(activeMeals);
                setImageUrls(imageUrls);
            });
        });
    };

    useInitializeView(initialize, [], [props.previewState, dateRangeContext?.intervalStart]);
    useMealsUpdatedEventListener(detail => {
        if (isSameDay(detail.date, selectedDate)) {
            initialize();
        }
    }, [mealsUpdatedSenderId.current]);

    const addMeal = async (meal: Meal): Promise<void> => {
        setLoading(true);

        const updatedMeals = [...allMeals, meal].sort(timestampSortAsc);

        const mealDate = startOfDay(meal.timestamp);
        await saveMeals(mealDate, updatedMeals);
        onMealsUpdated(mealsUpdatedSenderId.current, mealDate);

        setAllMeals(updatedMeals);
        setActiveMeals([...activeMeals, meal].sort(timestampSortAsc));
        setLoading(false);
    };

    const saveMeal = async (meal: Meal): Promise<void> => {
        setLoading(true);

        const updatedMeals = [...(allMeals.filter(m => m.id !== meal.id)), meal].sort(timestampSortAsc);

        const mealDate = startOfDay(meal.timestamp);
        await saveMeals(mealDate, updatedMeals);
        onMealsUpdated(mealsUpdatedSenderId.current, mealDate);

        setAllMeals(updatedMeals);
        setActiveMeals([...(activeMeals.filter(m => m.id !== meal.id)), meal].sort(timestampSortAsc));
        setLoading(false);
    };

    const onMealClicked = (meal: Meal) => {
        setSelectedMeal(selectedMeal === meal ? undefined : meal);
    };

    return <div ref={props.innerRef}>
        <MealContext.Provider value={{ loading, meals: activeMeals, imageUrls, selectedMeal, addMeal, saveMeal, onMealClicked }}>
            {props.children}
        </MealContext.Provider>
    </div>;
}