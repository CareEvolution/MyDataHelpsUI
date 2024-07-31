import React, { useContext } from 'react'
import './MealButtons.css'
import { Button, DateRangeContext } from '../index';
import { MealContext } from '../../container';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBurger, faCookie, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { getMealTypeDisplayText, MealType, prepareMealForEditing } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';

export interface MealButtonsProps {
    preview?: boolean;
    onEditMeal: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealButtonsProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const mealContext = useContext(MealContext);

    if (!mealContext) return null;

    const addMeal = (type: MealType) => {
        if (props.preview) {
            props.onEditMeal();
            return;
        }
        let mealTimestamp = dateRangeContext ? add(dateRangeContext.intervalStart, { hours: 12 }) : new Date();
        prepareMealForEditing({ id: uuid(), timestamp: mealTimestamp, type: type }).then(() => {
            props.onEditMeal();
        });
    };

    return <div className="mdhui-meal-buttons" ref={props.innerRef}>
        <Button onClick={() => addMeal('meal')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faBurger} /> {getMealTypeDisplayText('meal')}</Button>
        <Button onClick={() => addMeal('snack')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faCookie} /> {getMealTypeDisplayText('snack')}</Button>
        <Button onClick={() => addMeal('drink')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faWineBottle} /> {getMealTypeDisplayText('drink')}</Button>
    </div>;
}