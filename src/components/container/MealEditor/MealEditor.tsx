import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import './MealEditor.css';
import { formatDateForLocale, getMealImageUrls, getMeals, getMealToEdit, getMealTypeDisplayText, language, Meal, resolveColor, saveMeals, timestampSortAsc, uploadMealImageFile } from '../../../helpers';
import { Button, LayoutContext, LoadingIndicator, UnstyledButton } from '../../presentational';
import { parse, startOfDay } from 'date-fns';
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

/**
 * This component can be used to edit meal log entries.
 */
export default function MealEditor(props: MealEditorProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [allMeals, setAllMeals] = useState<Meal[]>();
    const [activeMeals, setActiveMeals] = useState<Meal[]>();
    const [mealToEdit, setMealToEdit] = useState<Meal>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [newImageFile, setNewImageFile] = useState<File>();
    const [imageUploadError, setImageUploadError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setAllMeals(undefined);
        setActiveMeals(undefined);
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
            setAllMeals(previewData.allMeals);
            setActiveMeals(previewData.activeMeals);
            setMealToEdit(previewData.mealToEdit);
            setImageUrl(previewData.imageUrl);
            return;
        }

        getMealToEdit().then(mealReference => {
            if (mealReference) {
                getMeals(mealReference.date).then(async allMeals => {
                    const activeMeals = allMeals.filter(meal => !meal.archiveTimestamp);
                    const referencedMeal = activeMeals.find(meal => meal.id === mealReference.id);
                    if (referencedMeal) {
                        const imageUrls = await getMealImageUrls([referencedMeal]);
                        const imageUrl = imageUrls[referencedMeal.id.toString()];

                        setLoading(false);
                        setAllMeals(allMeals);
                        setActiveMeals(activeMeals);
                        setMealToEdit(referencedMeal);
                        setImageUrl(imageUrl);
                        setImageLoading(!!imageUrl);
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

        setLoading(true);

        mealToEdit!.archiveTimestamp = new Date();

        const otherMeals = allMeals!.filter(meal => meal.id !== mealToEdit!.id);
        const updatedMeals = [...otherMeals, mealToEdit!].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToEdit!.timestamp), updatedMeals).then(props.onDelete);
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
                await uploadMealImageFile(mealToEdit!, newImageFile);
            } catch {
                setLoading(false);
                setImageUploadError(true);
                return;
            }
        }

        mealToEdit!.description = mealToEdit!.description?.trim();

        const otherMeals = allMeals!.filter(meal => meal.id !== mealToEdit!.id);
        const updatedMeals = [...otherMeals, mealToEdit!].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToEdit!.timestamp), updatedMeals).then(props.onSave);
    };

    const hasDuplicateTimestamp = () => {
        const otherMeals = activeMeals!.filter(meal => meal.id !== mealToEdit!.id);
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
            setMealToEdit({ ...mealToEdit!, hasImage: true });
            setNewImageFile(file);
            setImageUrl(URL.createObjectURL(file));
            setImageUploadError(false);
        }
    };

    const onRemoveImage = () => {
        setMealToEdit({ ...mealToEdit!, hasImage: false });
        setNewImageFile(undefined);
        setImageUrl(undefined);
        setImageUploadError(false);
    };

    const colorStyles = {
        '--mdhui-meal-editor-image-action-background-color': resolveColor(layoutContext.colorScheme, {
            lightMode: 'var(--mdhui-meal-editor-image-action-background-color-light)',
            darkMode: 'var(--mdhui-meal-editor-image-action-background-color-dark)'
        })
    } as CSSProperties;

    const renderImageSelector = (children: React.ReactNode) => {
        return <label>
            <input
                type="file"
                accept="image/*;capture=camera"
                style={{ display: 'none' }}
                onChange={event => onFileChanged(event.target.files?.[0])}
            />
            {children}
        </label>;
    };

    return <div className="mdhui-meal-editor" style={colorStyles} ref={props.innerRef}>
        {(loading || !mealToEdit) && <LoadingIndicator />}
        {!loading && mealToEdit && <div>
            <div className="mdhui-meal-editor-header">
                <div className="mdhui-meal-editor-header-type">
                    {language('edit')} {getMealTypeDisplayText(mealToEdit.type)}
                </div>
                <div className="mdhui-meal-editor-header-date">
                    {formatDateForLocale(mealToEdit.timestamp, 'EEE, MMMM do, yyyy')}
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
                        value={formatDateForLocale(mealToEdit.timestamp, 'HH:mm')}
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
                {props.withImageCapture && !imageUrl && renderImageSelector(
                    <div className="mdhui-button mdhui-meal-editor-image-add">
                        <FontAwesomeSvgIcon icon={faPlus} /> {language('meal-editor-add-image')}
                    </div>
                )}
                {props.withImageCapture && imageUrl &&
                    <div className="mdhui-meal-editor-image-manager">
                        {imageLoading &&
                            <div className="mdhui-meal-editor-image-loading">
                                <LoadingIndicator />
                            </div>
                        }
                        <div className="mdhui-meal-editor-image-wrapper" style={{ display: imageLoading ? 'none' : 'inline-block' }}>
                            <img className="mdhui-meal-editor-image" alt="meal image" src={imageUrl} onLoad={() => setImageLoading(false)} />
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
            {imageUploadError && <div className="mdhui-meal-editor-error">{language('meal-editor-image-upload-error')}</div>}
            <div className="mdhui-meal-editor-buttons">
                <Button onClick={() => props.onCancel()} variant="light">{language('cancel')}</Button>
                <Button onClick={() => onSave()} disabled={hasDuplicateTimestamp()}>{language('save')}</Button>
            </div>
        </div>}
    </div>
}