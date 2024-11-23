import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import './MealEditor.css';
import { ColorDefinition, getDayKey, getMealImageUrl, getMeals, getMealToEdit, getMealTypeDisplayText, language, Meal, resolveColor, saveMeals, timestampSortAsc, uploadMealImageFile } from '../../../helpers';
import { Button, LayoutContext, LoadingIndicator, UnstyledButton } from '../../presentational';
import { format, parse, startOfDay } from 'date-fns';
import { createPreviewData, MealEditorPreviewState } from './MealEditor.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export interface MealEditorProps {
    previewState?: 'loading' | MealEditorPreviewState;
    onError: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    withImageCapture?: boolean;
    children?: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealEditorProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [meals, setMeals] = useState<Meal[]>();
    const [mealToEdit, setMealToEdit] = useState<Meal>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [newImageFile, setNewImageFile] = useState<File>();
    const [imageUploadError, setImageUploadError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setMeals(undefined);
        setMealToEdit(undefined);
        setImageUrl(undefined);
        setImageLoading(true);
        setNewImageFile(undefined);
        setImageUploadError(false);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            const previewData = createPreviewData(props.previewState, new Date());
            setLoading(false);
            setMeals(previewData.meals);
            setMealToEdit(previewData.mealToEdit);
            setImageUrl(previewData.imageUrl);
            return;
        }

        getMealToEdit().then(mealReference => {
            if (mealReference) {
                getMeals(mealReference.date).then(meals => {
                    const referencedMeal = meals.find(meal => meal.id === mealReference.id);
                    if (referencedMeal) {
                        setLoading(false);
                        setMeals(meals);
                        setMealToEdit(referencedMeal);
                        if (referencedMeal.imageFileName) {
                            getMealImageUrl(referencedMeal.imageFileName).then(imageUrl => {
                                if (imageUrl) {
                                    setImageUrl(imageUrl);
                                } else {
                                    setImageLoading(false);
                                }
                            });
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

    const onSave = async () => {
        if (props.previewState) {
            props.onSave();
            return;
        }

        setLoading(true);
        setImageUploadError(false);

        if (newImageFile) {
            try {
                await uploadMealImageFile(newImageFile);
            } catch {
                setLoading(false);
                setImageUploadError(true);
                return;
            }
        }

        mealToEdit!.description = mealToEdit!.description?.trim();

        const otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        const updatedMeals = [...otherMeals, mealToEdit!].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToEdit!.timestamp), updatedMeals).then(async () => {
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

    const onImageLoaded = () => {
        setImageLoading(false);
    };

    const onFileChanged = (file: File | undefined) => {
        if (file) {
            file = new File([file], `${getDayKey(mealToEdit!.timestamp)}_${mealToEdit!.id}.${file.name.split('.').pop()}`, { type: file.type });
            setNewImageFile(file);
            setMealToEdit({ ...mealToEdit!, imageFileName: file.name });
            setImageUrl(URL.createObjectURL(file));
            setImageUploadError(false);
        }
    };

    const onRemoveImage = () => {
        setNewImageFile(undefined);
        setMealToEdit({ ...mealToEdit!, imageFileName: undefined });
        setImageUrl(undefined);
        setImageUploadError(false);
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
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={event => onFileChanged(event.target.files?.[0])} />
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
                <UnstyledButton onClick={onDelete}>
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
                        style={{ colorScheme: layoutContext.colorScheme }}
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
                        style={{ colorScheme: layoutContext.colorScheme }}
                        placeholder={language('meal-editor-description-optional')}
                    />
                </div>
                {props.withImageCapture && !mealToEdit.imageFileName && renderImageSelector(
                    <div className="mdhui-button mdhui-meal-editor-image-add">
                        <FontAwesomeSvgIcon icon={faPlus} /> Add Image
                    </div>
                )}
                {props.withImageCapture && mealToEdit.imageFileName &&
                    <div className="mdhui-meal-editor-image-manager">
                        {imageLoading &&
                            <div className="mdhui-meal-editor-image-loading">
                                <LoadingIndicator />
                            </div>
                        }
                        <div className="mdhui-meal-editor-image-wrapper" style={{ display: imageLoading ? 'none' : 'inline-block' }}>
                            <img className="mdhui-meal-editor-image" alt="meal image" src={imageUrl} onLoad={onImageLoaded} />
                            <div className="mdhui-meal-editor-image-actions">
                                {renderImageSelector(
                                    <div className="mdhui-meal-editor-image-action">
                                        <FontAwesomeSvgIcon icon={faEdit} />
                                    </div>
                                )}
                                <UnstyledButton onClick={onRemoveImage}>
                                    <div className="mdhui-meal-editor-image-action mdhui-meal-editor-image-action-remove">
                                        <FontAwesomeSvgIcon icon={faTrashCan} />
                                    </div>
                                </UnstyledButton>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {props.children &&
                <div className="mdhui-meal-editor-children">
                    {props.children}
                </div>
            }
            {hasDuplicateTimestamp() && <div className="mdhui-meal-editor-error">{language('meal-editor-duplicate-timestamp-error')}</div>}
            {imageUploadError && <div className="mdhui-meal-editor-error">An error occurred while uploading the selected image. Please try again, use a different image, or remove the image in order to save.</div>}
            <div className="mdhui-meal-editor-buttons">
                <Button onClick={() => props.onCancel()} variant="light">{language('cancel')}</Button>
                <Button onClick={() => onSave()} disabled={hasDuplicateTimestamp()}>{language('save')}</Button>
            </div>
        </div>}
    </div>
}