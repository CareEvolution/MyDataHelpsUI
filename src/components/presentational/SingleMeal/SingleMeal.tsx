import React, { useContext } from 'react'
import './SingleMeal.css'
import { format } from "date-fns";
import UnstyledButton from '../UnstyledButton';
import { ColorDefinition, Meal, resolveColor } from '../../../helpers';
import { LayoutContext } from '../Layout';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faBurger, faCircleCheck, faCookie, faWineBottle } from '@fortawesome/free-solid-svg-icons';

export interface SingleMealProps {
    meal: Meal;
    number: number;
    color: ColorDefinition;
    onClick: () => void;
    selected: boolean;
    innerRef?: React.Ref<HTMLButtonElement>;
}

export default function (props: SingleMealProps) {
    const layoutContext = useContext(LayoutContext);

    return <UnstyledButton className="mdhui-meal" onClick={() => props.onClick()} innerRef={props.innerRef}>
        <div className="mdhui-meal-number" style={{ background: resolveColor(layoutContext.colorScheme, props.color) }}>
            {props.number}&nbsp;
            {props.meal.type === 'meal' && <FontAwesomeSvgIcon icon={faBurger} />}
            {props.meal.type === 'snack' && <FontAwesomeSvgIcon icon={faCookie} />}
            {props.meal.type === 'drink' && <FontAwesomeSvgIcon icon={faWineBottle} />}
        </div>
        <div className="mdhui-meal-info">
            <div className="mdhui-meal-type">
                {props.meal.type}&nbsp;
                {props.selected && <FontAwesomeSvgIcon icon={faCircleCheck} color="var(--mdhui-color-success)" />}
            </div>
            <div className="mdhui-meal-time">{format(props.meal.timestamp, 'K:mm bb')}</div>
        </div>
    </UnstyledButton>
}