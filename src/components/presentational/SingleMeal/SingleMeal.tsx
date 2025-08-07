import React, { useContext, useEffect, useState } from 'react'
import './SingleMeal.css'
import UnstyledButton from '../UnstyledButton';
import { ColorDefinition, getMealTypeDisplayText, language, Meal, resolveColor } from '../../../helpers';
import { LayoutContext } from '../Layout';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBurger, faCircleCheck, faCookie, faEdit, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { Card, LoadingIndicator } from '../../presentational';
import { getTimeOfDayString } from '../../../helpers/date-helpers';
import MealAnalysis from '../MealAnalysis';
import { itemSort } from '../../../helpers/glucose-and-meals/meals';

export interface SingleMealProps {
    meal: Meal;
    mealImageUrl?: string;
    number?: number;
    color: ColorDefinition;
    onClick?: () => void;
    onEdit?: () => void;
    onAddAnalysisItems?: () => void;
    onReviewAnalysis?: () => void;
    selected: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleMealProps) {
    const layoutContext = useContext(LayoutContext);

    const [imageLoading, setImageLoading] = useState<boolean>(true);

    useEffect(() => {
        setImageLoading(!!props.mealImageUrl);
    }, [props.mealImageUrl])

    return <div className="mdhui-meal" onClick={props.onClick} ref={props.innerRef}>
        <div className="mdhui-meal-content">
            <WrapIfNecessary onClick={props.onClick}>
                <div className="mdhui-meal-thumbnail">
                    {!props.mealImageUrl &&
                        <>
                            {props.meal.type === 'meal' && <FontAwesomeSvgIcon icon={faBurger} />}
                            {props.meal.type === 'snack' && <FontAwesomeSvgIcon icon={faCookie} />}
                            {props.meal.type === 'drink' && <FontAwesomeSvgIcon icon={faWineBottle} />}
                        </>
                    }
                    {props.mealImageUrl &&
                        <>
                            <div className="mdhui-meal-thumbnail-image" style={{ display: imageLoading ? 'none' : 'block' }}>
                                <img alt={language('meal-thumbnail-alt')} src={props.mealImageUrl} onLoad={() => setImageLoading(false)} />
                            </div>
                            {imageLoading &&
                                <LoadingIndicator className="mdhui-meal-loading" />
                            }
                        </>
                    }
                    {props.number !== undefined &&
                        <div className="mdhui-meal-number" style={{ background: resolveColor(layoutContext.colorScheme, props.color) }}>
                            {props.number}
                        </div>
                    }
                </div>
            </WrapIfNecessary>
            <div className="mdhui-meal-info">
                <div className="mdhui-meal-type">
                    {getMealTypeDisplayText(props.meal.type)}&nbsp;
                    {props.selected && <FontAwesomeSvgIcon icon={faCircleCheck} color="var(--mdhui-color-success)" />}
                </div>
                <div className="mdhui-meal-time">{getTimeOfDayString(props.meal.timestamp)}</div>
                {props.meal.description &&
                    <div className="mdhui-meal-description">{props.meal.description}</div>
                }
                {props.meal.items && props.meal.items.length > 0 &&
                    <>
                        <div className="mdhui-meal-items">{language('meal-items-label')} {props.meal.items.sort(itemSort).map(item => item.name).join(', ')}</div>
                    </>
                }
            </div>
            {props.onEdit &&
                <div className="mdhui-meal-actions">
                    <UnstyledButton onClick={props.onEdit} stopPropagation={true}>
                        <div className="mdhui-meal-edit-action">
                            <FontAwesomeSvgIcon icon={faEdit} />
                        </div>
                    </UnstyledButton>
                </div>
            }
        </div>
        <Card style={{ marginTop: '0' }}>
            <MealAnalysis variant="worklist" meal={props.meal} onAddItems={props.onAddAnalysisItems} onReviewItems={props.onReviewAnalysis} />
        </Card>
    </div>;
}

function WrapIfNecessary(props: { onClick: (() => void) | undefined, children: React.ReactNode }) {
    if (props.onClick) {
        return <UnstyledButton onClick={props.onClick} stopPropagation={true}>
            {props.children}
        </UnstyledButton>
    }
    return <>{props.children}</>;
}