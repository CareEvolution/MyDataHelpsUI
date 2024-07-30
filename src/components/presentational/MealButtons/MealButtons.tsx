import React, { useContext } from 'react'
import './MealButtons.css'
import { Button } from '../index';
import { MealContext } from '../../container';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBurger, faCookie, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { MealType, prepareMealForEditing } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export interface MealButtonsProps {
    preview?: boolean;
    onEditMeal: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealButtonsProps) {
    const mealContext = useContext(MealContext);

    if (!mealContext) return null;

    const addMeal = (type: MealType) => {
        if (props.preview) {
            props.onEditMeal();
            return;
        }
        prepareMealForEditing({ id: uuid(), timestamp: new Date(), type: type }).then(() => {
            props.onEditMeal();
        });
    };

    return <div className="mdhui-meal-buttons" ref={props.innerRef}>
        <Button onClick={() => addMeal('meal')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faBurger} /> Meal</Button>
        <Button onClick={() => addMeal('snack')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faCookie} /> Snack</Button>
        <Button onClick={() => addMeal('drink')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faWineBottle} /> Drink</Button>
    </div>;
}