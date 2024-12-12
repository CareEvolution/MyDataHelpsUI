import React, { useContext, useEffect, useState } from 'react'
import './SingleMeal.css'
import UnstyledButton from '../UnstyledButton';
import { ColorDefinition, formatDateForLocale, getMealTypeDisplayText, Meal, resolveColor } from '../../../helpers';
import { LayoutContext } from '../Layout';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBurger, faCircleCheck, faCookie, faEdit, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { LoadingIndicator } from '../index';

export interface SingleMealProps {
    meal: Meal;
    mealImageUrl?: string;
    number?: number;
    color: ColorDefinition;
    onClick?: () => void;
    onEdit?: () => void;
    selected: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleMealProps) {
    const layoutContext = useContext(LayoutContext);

    const [imageLoading, setImageLoading] = useState<boolean>(true);

    useEffect(() => {
        setImageLoading(!!props.mealImageUrl);
    }, [props.mealImageUrl])

    return <div className="mdhui-meal" ref={props.innerRef}>
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
                            <img alt="meal thumbnail" src={props.mealImageUrl} onLoad={() => setImageLoading(false)} />
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
        <WrapIfNecessary onClick={props.onClick}>
            <div className="mdhui-meal-info">
                <div className="mdhui-meal-type">
                    {getMealTypeDisplayText(props.meal.type)}&nbsp;
                    {props.selected && <FontAwesomeSvgIcon icon={faCircleCheck} color="var(--mdhui-color-success)" />}
                </div>
                <div className="mdhui-meal-time">{formatDateForLocale(props.meal.timestamp, 'h:mm aa')}</div>
                {props.meal.description &&
                    <div className="mdhui-meal-description">{props.meal.description}</div>
                }
            </div>
        </WrapIfNecessary>
        {props.onEdit &&
            <UnstyledButton onClick={() => props.onEdit!()} style={{ height: '100%' }}>
                <div className="mdhui-meal-edit-action">
                    <FontAwesomeSvgIcon icon={faEdit} />
                </div>
            </UnstyledButton>
        }
    </div>;
}

function WrapIfNecessary(props: { onClick: (() => void) | undefined, children: React.ReactNode }) {
    if (props.onClick) {
        return <UnstyledButton onClick={() => props.onClick!()} style={{ height: '100%' }}>
            {props.children}
        </UnstyledButton>
    }
    return <>{props.children}</>;
}