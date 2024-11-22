import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import './MealEditor.css';
import { ColorDefinition, getMealImageUrl, getMeals, getMealToEdit, getMealTypeDisplayText, language, Meal, resolveColor, saveMeals, timestampSortAsc, uploadMealImageFile } from '../../../helpers';
import { Button, LayoutContext, LoadingIndicator, UnstyledButton } from '../../presentational';
import { format, parse, startOfDay } from 'date-fns';
import { createPreviewData, MealEditorPreviewState } from './MealEditor.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faEdit, faPlus, faTrashCan, faUndo } from '@fortawesome/free-solid-svg-icons';

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
    const [originalImageFileName, setOriginalImageFileName] = useState<string>();
    const [currentImageFileName, setCurrentImageFileName] = useState<string>();
    const [originalImageUrl, setOriginalImageUrl] = useState<string>();
    const [currentImageUrl, setCurrentImageUrl] = useState<string>();
    const [newImageFile, setNewImageFile] = useState<File>();

    useEffect(() => {
        setLoading(true);
        setMeals(undefined);
        setMealToEdit(undefined);
        setOriginalImageFileName(undefined);
        setCurrentImageFileName(undefined);
        setOriginalImageUrl(undefined);
        setCurrentImageUrl(undefined);
        setNewImageFile(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            const previewData = createPreviewData(props.previewState, new Date());
            setLoading(false);
            setMeals(previewData.meals);
            setMealToEdit(previewData.mealToEdit);
            setOriginalImageFileName(previewData.mealToEdit.imageFileName);
            setCurrentImageFileName(previewData.mealToEdit.imageFileName);
            setOriginalImageUrl(previewData.imageUrl);
            setCurrentImageUrl(previewData.imageUrl);
            return;
        }

        getMealToEdit().then(mealReference => {
            if (mealReference) {
                getMeals(mealReference.date).then(async (meals) => {
                    const referencedMeal = meals.find(meal => meal.id === mealReference.id);
                    if (referencedMeal) {
                        setLoading(false);
                        setMeals(meals);
                        setMealToEdit(referencedMeal);
                        setOriginalImageFileName(referencedMeal.imageFileName);
                        setCurrentImageFileName(referencedMeal.imageFileName);
                        if (referencedMeal.imageFileName) {
                            const imageUrl = await getMealImageUrl(referencedMeal.imageFileName);
                            setOriginalImageUrl(imageUrl);
                            setCurrentImageUrl(imageUrl);
                        }
                    } else {
                        props.onError();
                    }
                });
            } else {
                props.onError();
            }
        });
    }, [props.previewState]);

    const onDelete = () => {
        if (props.previewState) {
            props.onDelete();
            return;
        }

        const otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        saveMeals(startOfDay(mealToEdit!.timestamp), otherMeals).then(() => {
            props.onDelete();
        });
    };

    const onSave = () => {
        if (props.previewState) {
            props.onSave();
            return;
        }

        setLoading(true);

        mealToEdit!.description = mealToEdit!.description?.trim();
        mealToEdit!.imageFileName = currentImageFileName;

        const otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        const updatedMeals = [...otherMeals, mealToEdit!].sort(timestampSortAsc);
        saveMeals(startOfDay(mealToEdit!.timestamp), updatedMeals).then(async () => {
            if (newImageFile) {
                await uploadMealImageFile(newImageFile);
            }
            setLoading(false);
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

    const onFileChanged = (file: File | undefined) => {
        if (file) {
            setNewImageFile(file);
            setCurrentImageFileName(file.name);
            setCurrentImageUrl(URL.createObjectURL(file));
        }
    };

    const onRevertImage = () => {
        setNewImageFile(undefined);
        setCurrentImageFileName(originalImageFileName);
        setCurrentImageUrl(originalImageUrl);
    };

    const onRemoveImage = () => {
        setNewImageFile(undefined);
        setCurrentImageFileName(undefined);
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

    const renderImageSelector = (children: React.ReactNode) => {
        return <label>
            <input type="file" style={{ display: 'none' }} onChange={event => onFileChanged(event.target.files?.[0])} />
            {children}
        </label>;
    };

    return <div className="mdhui-meal-editor" style={colorStyles} ref={props.innerRef}>
        {(loading || !mealToEdit) && <LoadingIndicator />}
        {!loading && mealToEdit && <div>
            <div className="mdhui-meal-editor-header">
                <div className="mdhui-meal-editor-header-type">
                    {getMealTypeDisplayText(mealToEdit.type)}
                </div>
                <div className="mdhui-meal-editor-header-date">
                    {format(mealToEdit.timestamp, 'EEE, MMMM do, yyyy')}
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
                        value={format(mealToEdit.timestamp, 'HH:mm')}
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
                        value={mealToEdit.description}
                        onChange={event => onDescriptionChanged(event.target.value)}
                        style={{
                            colorScheme: layoutContext.colorScheme
                        }}
                        placeholder={language('meal-editor-description-optional')}
                    />
                </div>
                {props.onCaptureImage && !originalImageFileName && !currentImageFileName && renderImageSelector(
                    <div
                        className="mdhui-button mdhui-meal-editor-image-add"
                        style={{
                            background: 'var(--mdhui-background-color-1)',
                            color: 'var(--mdhui-color-primary)'
                        }}
                    >
                        <FontAwesomeSvgIcon icon={faPlus} /> Add Image
                    </div>
                )}
                {props.onCaptureImage && (originalImageFileName || currentImageFileName) &&
                    <div className="mdhui-meal-editor-image-manager">
                        <div className="mdhui-meal-editor-image-wrapper">
                            <img
                                className={currentImageFileName
                                    ? "mdhui-meal-editor-image"
                                    : "mdhui-meal-editor-image mdhui-meal-editor-image-removed"
                                }
                                alt="meal image"
                                src={currentImageUrl ?? originalImageUrl}
                            />
                            {currentImageFileName && originalImageFileName !== currentImageFileName &&
                                <div className="mdhui-meal-editor-image-overlay">
                                    Pending
                                </div>
                            }
                            {!currentImageFileName &&
                                <div className="mdhui-meal-editor-image-overlay mdhui-meal-editor-image-overlay-removed">
                                    Removal Pending
                                </div>
                            }
                            <div className="mdhui-meal-editor-image-actions">
                                {renderImageSelector(
                                    <div className="mdhui-meal-editor-image-action">
                                        <FontAwesomeSvgIcon icon={faEdit} />
                                    </div>
                                )}
                                {originalImageFileName && originalImageFileName !== currentImageFileName &&
                                    <UnstyledButton onClick={() => onRevertImage()}>
                                        <div className="mdhui-meal-editor-image-action">
                                            <FontAwesomeSvgIcon icon={faUndo} />
                                        </div>
                                    </UnstyledButton>
                                }
                                {currentImageFileName &&
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