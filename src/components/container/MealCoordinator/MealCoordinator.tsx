import React, { createContext, useContext, useState } from "react";
import { getMeals, Meal, useInitializeView } from "../../../helpers";
import { DateRangeContext } from "../../presentational";
import { startOfToday } from "date-fns";
import { MealCoordinatorPreviewState, previewData } from "./MealCoordinator.previewData";

export interface MealCoordinatorProps {
    previewState?: 'loading' | MealCoordinatorPreviewState;
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface MealContext {
    loading: boolean;
    meals: Meal[];
    selectedMeal?: Meal;
    onMealClicked: (meal: Meal) => void;
}

export const MealContext = createContext<MealContext | null>(null);

export default function (props: MealCoordinatorProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const selectedDate = dateRangeContext?.intervalStart ?? startOfToday();

    const [loading, setLoading] = useState<boolean>(true);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedMeal, setSelectedMeal] = useState<Meal>();

    const onMealClicked: (meal: Meal) => void = (meal: Meal) => {
        setSelectedMeal(selectedMeal === meal ? undefined : meal);
    };

    useInitializeView(() => {
        setLoading(true);
        setMeals([]);
        setSelectedMeal(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            setLoading(false);
            setMeals(previewData(props.previewState, selectedDate).meals);
            return;
        }

        getMeals(selectedDate).then(meals => {
            setLoading(false);
            setMeals(meals);
        });
    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    return <div ref={props.innerRef}>
        <MealContext.Provider value={{ loading, meals, selectedMeal, onMealClicked }}>
            {props.children}
        </MealContext.Provider>
    </div>;
}