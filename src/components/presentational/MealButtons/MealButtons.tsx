import React, { useContext } from 'react'
import './MealButtons.css'
import { Button, DateRangeContext, TextBlock } from '../index';
import { MealContext } from '../../container';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBurger, faCookie, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { getMealTypeDisplayText, MealType, saveMeals, timestampSortAsc } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import { add, startOfDay } from 'date-fns';

export interface MealButtonsProps {
    preview?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealButtonsProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const mealContext = useContext(MealContext);

    if (!mealContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Meal Buttons must be used within a Meal Coordinator.</TextBlock>
    }

    const addMeal = (type: MealType) => {
        if (props.preview) return;

        let now = new Date();
        let newMeal = {
            id: uuid(),
            timestamp: dateRangeContext ? add(startOfDay(dateRangeContext.intervalStart), { hours: now.getHours(), minutes: now.getMinutes() }) : now,
            type: type
        };

        saveMeals(startOfDay(newMeal.timestamp), [...mealContext.meals, newMeal].sort(timestampSortAsc)).then();
    };

    return <div className="mdhui-meal-buttons" ref={props.innerRef}>
        <Button onClick={() => addMeal('meal')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faBurger} /> {getMealTypeDisplayText('meal')}</Button>
        <Button onClick={() => addMeal('snack')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faCookie} /> {getMealTypeDisplayText('snack')}</Button>
        <Button onClick={() => addMeal('drink')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faWineBottle} /> {getMealTypeDisplayText('drink')}</Button>
    </div>;
}