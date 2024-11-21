import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import './MealEditor.css';
import { ColorDefinition, getMeals, getMealToEdit, getMealTypeDisplayText, getNewImageUrl, language, Meal, resolveColor, saveMeals, timestampSortAsc } from '../../../helpers';
import { Button, LayoutContext, LoadingIndicator, UnstyledButton } from '../../presentational';
import { format, parse, startOfDay } from 'date-fns';
import { createPreviewData, MealEditorPreviewState } from './MealEditor.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faEdit, faPlus, faTrashCan, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps from "@careevolution/mydatahelps-js";

export interface MealEditorProps {
    previewState?: 'loading' | MealEditorPreviewState;
    onError: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    onCaptureImage?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealEditorProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [meals, setMeals] = useState<Meal[]>();
    const [mealToEdit, setMealToEdit] = useState<Meal>();
    const [originalImageUrl, setOriginalImageUrl] = useState<string>();
    const [currentImageUrl, setCurrentImageUrl] = useState<string>();

    useEffect(() => {
        setLoading(true);
        setMeals(undefined);
        setMealToEdit(undefined);
        setOriginalImageUrl(undefined);
        setCurrentImageUrl(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            const previewData = createPreviewData(props.previewState, new Date());
            setLoading(false);
            setMeals(previewData.meals);
            setMealToEdit(previewData.mealToEdit);
            setOriginalImageUrl(previewData.originalImageUrl);
            setCurrentImageUrl(previewData.currentImageUrl);
            return;
        }

        getMealToEdit().then(mealReference => {
            if (mealReference) {
                getMeals(mealReference.date).then(meals => {
                    const referencedMeal = meals.find(meal => meal.id === mealReference.id);
                    if (referencedMeal) {
                        getNewImageUrl().then(newImageUrl => {
                            setLoading(false);
                            setMeals(meals);
                            setMealToEdit(referencedMeal);
                            setOriginalImageUrl(referencedMeal.imageUrl);
                            setCurrentImageUrl(newImageUrl ?? referencedMeal.imageUrl);
                        });
                    } else {
                        props.onError();
                    }
                });
            } else {
                props.onError();
            }
        });

        const checkForNewImageUrl = () => {
            if (mealToEdit) {
                setLoading(true);
                getNewImageUrl().then(newImageUrl => {
                    setLoading(false);
                    setCurrentImageUrl(newImageUrl ?? currentImageUrl);
                });
            }
        };

        MyDataHelps.on('applicationDidBecomeVisible', checkForNewImageUrl);
        return () => {
            MyDataHelps.off('applicationDidBecomeVisible', checkForNewImageUrl);
        }
    }, [props.previewState]);

    const onDelete = () => {
        if (props.previewState) {
            props.onDelete();
            return;
        }

        const otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        saveMeals(startOfDay(mealToEdit!.timestamp), [...otherMeals].sort(timestampSortAsc)).then(() => {
            props.onDelete();
        });
    };

    const onSave = () => {
        mealToEdit!.description = mealToEdit!.description?.trim();
        mealToEdit!.imageUrl = currentImageUrl;

        if (props.previewState) {
            props.onSave();
            return;
        }

        const otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        saveMeals(startOfDay(mealToEdit!.timestamp), [...otherMeals, mealToEdit!].sort(timestampSortAsc)).then(() => {
            props.onSave();
        });
    };

    const hasDuplicateTimestamp = () => {
        const otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        return !!otherMeals.find(meal => meal.timestamp === mealToEdit!.timestamp);
    };

    const onTimeChanged = (value: string) => {
        if (value) {
            setMealToEdit({ ...mealToEdit!, timestamp: parse(value, 'HH:mm', mealToEdit!.timestamp) });
        }
    };

    const onDescriptionChanged = (value: string) => {
        setMealToEdit({ ...mealToEdit!, description: value.trim() ? value : undefined });
    };

    const onRevertImage = () => {
        setCurrentImageUrl(originalImageUrl);
    };

    const onRemoveImage = () => {
        setCurrentImageUrl(undefined);
    };

    const getColorVariable = (variable: string, colorDefinition: ColorDefinition | undefined) => {
        const color: { [key: string]: string | undefined } = {};
        color[variable] = resolveColor(layoutContext.colorScheme, colorDefinition ?? { lightMode: `var(${variable}-light)`, darkMode: `var(${variable}-dark)` });
        return color;
    };

    const colorStyles = {
        ...getColorVariable('--mdhui-meal-editor-image-action-background-color', undefined)
    } as CSSProperties;

    return <div className="mdhui-meal-editor" style={colorStyles} ref={props.innerRef}>
        {loading && <LoadingIndicator />}
        {!loading && <div>
            <div className="mdhui-meal-editor-header">
                <div className="mdhui-meal-editor-header-type">
                    {getMealTypeDisplayText(mealToEdit!.type)}
                </div>
                <div className="mdhui-meal-editor-header-date">
                    {format(mealToEdit!.timestamp, 'EEE, MMMM do, yyyy')}
                </div>
                <UnstyledButton onClick={() => onDelete()}>
                    <div className="mdhui-meal-editor-header-delete-action">
                        <FontAwesomeSvgIcon icon={faTrashCan} />
                    </div>
                </UnstyledButton>
            </div>
            <div className="mdhui-meal-editor-form">
                <div className="mdhui-meal-editor-time">
                    <div className="mdhui-meal-editor-time-label">{language('meal-editor-time-input-label')}:</div>
                    <input
                        className="mdhui-meal-editor-time-input"
                        type="time"
                        value={format(mealToEdit!.timestamp, 'HH:mm')}
                        onChange={event => onTimeChanged(event.target.value)}
                        style={{
                            colorScheme: layoutContext.colorScheme
                        }}
                    />
                </div>
                <div className="mdhui-meal-editor-description">
                    <div className="mdhui-meal-editor-description-label">{language('meal-editor-description-input-label')}:</div>
                    <textarea
                        className="mdhui-meal-editor-description-input"
                        rows={3}
                        maxLength={250}
                        value={mealToEdit!.description}
                        onChange={event => onDescriptionChanged(event.target.value)}
                        style={{
                            colorScheme: layoutContext.colorScheme
                        }}
                        placeholder={language('meal-editor-description-optional')}
                    />
                </div>
                {props.onCaptureImage && !originalImageUrl && !currentImageUrl &&
                    // No image.
                    <Button className="mdhui-meal-editor-image-add" onClick={() => props.onCaptureImage!()} variant="light">
                        <FontAwesomeSvgIcon icon={faPlus} /> Add Image
                    </Button>
                }
                {props.onCaptureImage && (originalImageUrl || currentImageUrl) &&
                    <div className="mdhui-meal-editor-image-manager">
                        <div className="mdhui-meal-editor-image-wrapper">
                            <img
                                className={currentImageUrl
                                    ? "mdhui-meal-editor-image"
                                    : "mdhui-meal-editor-image mdhui-meal-editor-image-removed"
                                }
                                alt="meal image"
                                src={currentImageUrl ?? originalImageUrl}
                            />
                            {currentImageUrl && originalImageUrl !== currentImageUrl &&
                                <div className="mdhui-meal-editor-image-overlay">
                                    Pending
                                </div>
                            }
                            {!currentImageUrl &&
                                <div className="mdhui-meal-editor-image-overlay mdhui-meal-editor-image-overlay-removed">
                                    Removal Pending
                                </div>
                            }
                            <div className="mdhui-meal-editor-image-actions">
                                <UnstyledButton onClick={() => props.onCaptureImage!()}>
                                    <div className="mdhui-meal-editor-image-action">
                                        <FontAwesomeSvgIcon icon={faEdit} />
                                    </div>
                                </UnstyledButton>
                                {originalImageUrl && originalImageUrl !== currentImageUrl &&
                                    <UnstyledButton onClick={() => onRevertImage()}>
                                        <div className="mdhui-meal-editor-image-action">
                                            <FontAwesomeSvgIcon icon={faUndo} />
                                        </div>
                                    </UnstyledButton>
                                }
                                {currentImageUrl &&
                                    <UnstyledButton onClick={() => onRemoveImage()}>
                                        <div className="mdhui-meal-editor-image-action mdhui-meal-editor-image-action-remove">
                                            <FontAwesomeSvgIcon icon={faTrashCan} />
                                        </div>
                                    </UnstyledButton>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            {
                hasDuplicateTimestamp() && <div className="mdhui-meal-editor-error">{language('meal-editor-duplicate-timestamp-error')}</div>
            }
            <div className="mdhui-meal-editor-buttons">
                <Button onClick={() => props.onCancel()} variant="light">{language('cancel')}</Button>
                <Button onClick={() => onSave()} disabled={hasDuplicateTimestamp()}>{language('save')}</Button>
            </div>
        </div>}
    </div>
}