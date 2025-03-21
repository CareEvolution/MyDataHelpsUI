import React, { useContext } from 'react'
import './MealButtons.css'
import { Button, DateRangeContext, TextBlock } from '../index';
import { MealContext } from '../../container';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBurger, faCookie, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { getMealTypeDisplayText, Meal, MealType, prepareMealForEditing } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import { add, startOfDay } from 'date-fns';

export interface MealButtonsProps {
    preview?: boolean;
    autoLaunchEditor?: boolean;
    onEditMeal?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component renders buttons that can be used to quickly add meal log entries.  It can be
 * configured to automatically launch the meal editor when a new meal has been added.  It must
 * be used within a Meal Coordinator.
 */
export default function MealButtons(props: MealButtonsProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const mealContext = useContext(MealContext);

    if (!mealContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Meal Buttons must be used within a Meal Coordinator.</TextBlock>
    }

    const addMeal = (type: MealType) => {
        if (props.preview) {
            if (props.autoLaunchEditor && props.onEditMeal) {
                props.onEditMeal();
            }
            return;
        }

        let now = new Date();
        const meal: Meal = {
            id: uuid(),
            timestamp: dateRangeContext ? add(startOfDay(dateRangeContext.intervalStart), { hours: now.getHours(), minutes: now.getMinutes() }) : now,
            type: type,
            created: now,
            lastModified: now
        };
        mealContext.addMeal(meal).then(() => {
            if (props.autoLaunchEditor && props.onEditMeal) {
                prepareMealForEditing(meal).then(props.onEditMeal)
            }
        });
    };

    return <div className="mdhui-meal-buttons" ref={props.innerRef}>
        <Button onClick={() => addMeal('meal')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faBurger} /> {getMealTypeDisplayText('meal')}</Button>
        <Button onClick={() => addMeal('snack')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faCookie} /> {getMealTypeDisplayText('snack')}</Button>
        <Button onClick={() => addMeal('drink')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faWineBottle} /> {getMealTypeDisplayText('drink')}</Button>
    </div>;
}