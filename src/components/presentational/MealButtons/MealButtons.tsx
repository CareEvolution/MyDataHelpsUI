import React, { useContext } from "react"
import "./MealButtons.css"
import { Button } from "../index";
import { MealContext } from "../../container";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faBurger, faCookie, faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { MealType } from "../../../helpers";

export interface MealButtonsProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealButtonsProps) {
    const mealContext = useContext(MealContext);

    if (!mealContext) return null;

    const addMeal = (mealType: MealType) => {
        // TODO: Add meal logic.
    };

    return <div className="mdhui-meal-buttons" ref={props.innerRef}>
        <Button onClick={() => addMeal('meal')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faBurger} /> Meal</Button>
        <Button onClick={() => addMeal('drink')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faWineBottle} /> Drink</Button>
        <Button onClick={() => addMeal('snack')} variant="light" disabled={mealContext.loading}><FontAwesomeSvgIcon icon={faCookie} /> Snack</Button>
    </div>;
}