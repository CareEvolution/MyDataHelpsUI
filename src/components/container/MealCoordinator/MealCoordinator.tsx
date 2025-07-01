import React, { createContext, useContext, useState } from 'react';
import { getMealImageUrls, getMeals, Meal, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { DateRangeContext } from '../../presentational';
import { startOfDay, startOfToday } from 'date-fns';
import { createPreviewData, MealCoordinatorPreviewState } from './MealCoordinator.previewData';

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

    useInitializeView(() => {
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
    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    const addMeal = async (meal: Meal): Promise<void> => {
        setLoading(true);

        const updatedMeals = [...allMeals, meal].sort(timestampSortAsc);
        await saveMeals(startOfDay(meal.timestamp), updatedMeals);

        setAllMeals(updatedMeals);
        setActiveMeals([...activeMeals, meal].sort(timestampSortAsc));
        setLoading(false);
    };

    const saveMeal = async (meal: Meal): Promise<void> => {
        setLoading(true);

        const updatedMeals = [...(allMeals.filter(m => m.id !== meal.id)), meal].sort(timestampSortAsc);
        await saveMeals(startOfDay(meal.timestamp), updatedMeals);

        setAllMeals(updatedMeals);
        setActiveMeals([...activeMeals].sort(timestampSortAsc));
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