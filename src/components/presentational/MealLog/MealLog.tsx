import React, { useContext } from "react"
import "./MealLog.css"
import { getColorFromAssortment } from "../../../helpers";
import { LoadingIndicator, Title } from "../index";
import SingleMeal from "../SingleMeal";
import { MealContext } from "../../container";

export interface MealLogProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealLogProps) {
    const mealContext = useContext(MealContext);

    if (!mealContext) return null;

    return <div className="mdhui-meal-log" ref={props.innerRef}>
        <Title order={3}>Meal Log</Title>
        {mealContext.loading && <LoadingIndicator />}
        {!mealContext.loading && mealContext.meals.length === 0 &&
            <div className="mdhui-meal-log-empty-text">No meals logged</div>
        }
        {!mealContext.loading && mealContext.meals.map((meal, index) => {
            return <SingleMeal
                key={`meal-${index}`}
                meal={meal}
                number={index + 1}
                color={getColorFromAssortment(index)}
                onClick={() => mealContext.onMealClicked(meal)}
                selected={mealContext.selectedMeal === meal}
            />;
        })}
    </div>;
}