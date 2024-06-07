import React, { useContext } from 'react'
import './SingleMeal.css'
import { format } from "date-fns";
import UnstyledButton from '../UnstyledButton';
import { ColorDefinition, Meal, resolveColor } from '../../../helpers';
import Card from '../Card';
import { LayoutContext } from '../Layout';

export interface SingleMealProps {
    meal: Meal;
    number: number;
    color: ColorDefinition;
    onClick: () => void;
    selected: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleMealProps) {
    const layoutContext = useContext(LayoutContext);

    return <Card className="mdhui-meal" innerRef={props.innerRef}>
        <UnstyledButton onClick={() => props.onClick()}>
            <div className="mdhui-meal-header">
                <div className="mdhui-meal-name">Meal {props.number} <span className="mdhui-meal-color" style={{background: resolveColor(layoutContext.colorScheme, props.color)}}>&nbsp;</span></div>
                <div className="mdhui-meal-time">Logged at {format(props.meal.observationDate, 'K:mm bb')}</div>
            </div>
            <div className="mdhui-meal-calories">{Number(props.meal.nutrients.dietaryEnergyConsumed.total).toFixed(0)} Calories</div>
            {!props.selected &&
                <div className="mdhui-meal-more-info-link">More info</div>
            }
            {props.selected &&
                <div className="mdhui-meal-less-info-link">Less info</div>
            }
            {props.selected &&
                <div className="mdhui-meal-more-info">
                    <div className="mdhui-meal-more-info-nutrients">
                        <div className="mdhui-meal-more-info-nutrient">
                            <div className="mdhui-meal-more-info-nutrient-value">{Number(props.meal.nutrients.dietaryCarbohydrates.total).toFixed(0)}{props.meal.nutrients.dietaryCarbohydrates.units}</div>
                            <div className="mdhui-meal-more-info-nutrient-name">Carbs</div>
                        </div>
                        <div className="mdhui-meal-more-info-nutrient-divider">&nbsp;</div>
                        <div className="mdhui-meal-more-info-nutrient">
                            <div className="mdhui-meal-more-info-nutrient-value">{Number(props.meal.nutrients.dietaryProtein.total).toFixed(0)}{props.meal.nutrients.dietaryProtein.units}</div>
                            <div className="mdhui-meal-more-info-nutrient-name">Protein</div>
                        </div>
                        <div className="mdhui-meal-more-info-nutrient-divider">&nbsp;</div>
                        <div className="mdhui-meal-more-info-nutrient">
                            <div className="mdhui-meal-more-info-nutrient-value">{Number(props.meal.nutrients.dietaryFatTotal.total).toFixed(0)}{props.meal.nutrients.dietaryFatTotal.units}</div>
                            <div className="mdhui-meal-more-info-nutrient-name">Fat</div>
                        </div>
                    </div>
                    {props.meal.minGlucose && props.meal.maxGlucose &&
                        <div className="mdhui-meal-more-info-nutrient-glucose">Your starting glucose was <span className="mdhui-meal-more-info-nutrient-glucose-value">{props.meal.minGlucose}mg/dl</span> and after <span className="mdhui-meal-more-info-nutrient-glucose-time">1 hour</span> it was <span
                            className="mdhui-meal-more-info-nutrient-glucose-value">{props.meal.maxGlucose}mg/dl</span></div>
                    }
                </div>
            }
        </UnstyledButton>
    </Card>;
}