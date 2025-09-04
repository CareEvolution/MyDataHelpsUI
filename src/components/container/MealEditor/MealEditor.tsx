import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import './MealEditor.css';
import { getMealImageUrls, getMeals, getMealToEdit, getMealTypeDisplayText, language, Meal, resolveColor, saveMeals, timestampSortAsc, uploadMealImageFile } from '../../../helpers';
import { Button, Card, LayoutContext, LoadingIndicator, UnstyledButton } from '../../presentational';
import { format, parse, startOfDay } from 'date-fns';
import { createPreviewData, MealEditorPreviewState } from './MealEditor.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getFullDayAndDateString } from '../../../helpers/date-helpers';
import { combineItemsWithAnalysisItems, itemSortByNameAsc } from '../../../helpers/glucose-and-meals/meals';
import MealAnalysis from '../../presentational/MealAnalysis';

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
    const [allMeals, setAllMeals] = useState<Meal[]>([]);
    const [activeMeals, setActiveMeals] = useState<Meal[]>([]);
    const [mealToEdit, setMealToEdit] = useState<Meal>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [newImageFile, setNewImageFile] = useState<File>();
    const [imageTypeError, setImageTypeError] = useState<boolean>(false);
    const [imageUploadError, setImageUploadError] = useState<boolean>(false);

    const itemsToAddInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLoading(true);
        setAllMeals([]);
        setActiveMeals([]);
        setMealToEdit(undefined);
        setImageUrl(undefined);
        setImageLoading(true);
        setNewImageFile(undefined);
        setImageTypeError(false);
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
            setImageLoading(!!previewData.imageUrl);
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

    if (loading || !mealToEdit) {
        return <div className="mdhui-meal-editor" ref={props.innerRef}>
            <LoadingIndicator />
        </div>;
    }

    const onDelete = () => {
        if (props.previewState) {
            props.onDelete();
            return;
        }

        setLoading(true);

        mealToEdit.archiveTimestamp = new Date();

        const otherMeals = allMeals.filter(meal => meal.id !== mealToEdit.id);
        const updatedMeals = [...otherMeals, mealToEdit].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToEdit.timestamp), updatedMeals).then(props.onDelete);
    };

    const onSave = async () => {
        if (props.previewState) {
            props.onSave();
            return;
        }

        setLoading(true);
        setImageTypeError(false);
        setImageUploadError(false);

        if (newImageFile) {
            try {
                await uploadMealImageFile(mealToEdit, newImageFile);
            } catch {
                setLoading(false);
                setImageUploadError(true);
                return;
            }
        }

        mealToEdit.description = mealToEdit.description?.trim();

        const now = new Date();
        mealToEdit.lastModified = now;
        if (mealToEdit.analysis && !mealToEdit.analysis.reviewTimestamp) {
            mealToEdit.analysis.reviewTimestamp = now;
        }

        const otherMeals = allMeals.filter(meal => meal.id !== mealToEdit.id);
        const updatedMeals = [...otherMeals, mealToEdit].sort(timestampSortAsc);

        saveMeals(startOfDay(mealToEdit.timestamp), updatedMeals).then(props.onSave);
    };

    const hasDuplicateTimestamp = () => {
        const otherMeals = activeMeals.filter(meal => meal.id !== mealToEdit.id);
        return otherMeals.some(meal => meal.timestamp === mealToEdit.timestamp);
    };

    const onTimeChanged = (value: string) => {
        if (value) {
            setMealToEdit({ ...mealToEdit, timestamp: parse(value, 'HH:mm', mealToEdit.timestamp) });
        }
    };

    const onDescriptionChanged = (value: string) => {
        setMealToEdit({ ...mealToEdit, description: value.trim() ? value : undefined });
    };

    const onFileChanged = (file: File | undefined) => {
        if (file) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp'];
            if (allowedTypes.includes(file.type)) {
                setMealToEdit({ ...mealToEdit, hasImage: true });
                setNewImageFile(file);
                setImageUrl(URL.createObjectURL(file));
                setImageTypeError(false);
                setImageUploadError(false);
            } else {
                setImageTypeError(true);
            }
        }
    };

    const onRemoveImage = () => {
        setMealToEdit({ ...mealToEdit, hasImage: false });
        setNewImageFile(undefined);
        setImageUrl(undefined);
        setImageTypeError(false);
        setImageUploadError(false);
    };

    const onAddItem = (itemToAdd: string): void => {
        if (!itemToAdd || mealToEdit.items?.some(item => item.name.toLowerCase() === itemToAdd.toLowerCase())) return;

        const updatedItems = [...(mealToEdit.items ?? []), { name: itemToAdd }];
        setMealToEdit({ ...mealToEdit, items: updatedItems });
    };

    const onAddNewItem = (): void => {
        if (!itemsToAddInputRef.current) return;
        onAddItem(itemsToAddInputRef.current.value.trim());
        itemsToAddInputRef.current.value = '';
    };

    const onRemoveItem = (itemToRemove: string): void => {
        if (!mealToEdit.items || mealToEdit.items.length === 0) return;

        const updatedItems = mealToEdit.items.filter(item => item.name !== itemToRemove);
        setMealToEdit({ ...mealToEdit, items: updatedItems });
    };

    const onAddAnalysisItems = (): void => {
        if (!mealToEdit.analysis) return;

        const updatedItems = combineItemsWithAnalysisItems(mealToEdit);
        setMealToEdit({ ...mealToEdit, items: updatedItems });
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
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={event => onFileChanged(event.target.files?.[0])}
            />
            {children}
        </label>;
    };

    return <div className="mdhui-meal-editor" style={colorStyles} ref={props.innerRef}>
        <div className="mdhui-meal-editor-header">
            <div className="mdhui-meal-editor-header-type">
                {language('edit')} {getMealTypeDisplayText(mealToEdit.type)}
            </div>
            <div className="mdhui-meal-editor-header-date">
                {getFullDayAndDateString(mealToEdit.timestamp)}
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
                        <img className="mdhui-meal-editor-image" alt={language('meal-editor-image-alt')} src={imageUrl} onLoad={() => setImageLoading(false)} />
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
            {imageTypeError && <div className="mdhui-meal-editor-error">{language('meal-editor-image-type-error')}</div>}
        </div>
        <div className="mdhui-meal-editor-items">
            <div className="mdhui-meal-editor-items-header">
                <div className="mdhui-meal-editor-items-title">{language('meal-editor-items-title')}</div>
                <input
                    type="text"
                    className="mdhui-meal-editor-items-add-input"
                    ref={itemsToAddInputRef}
                    style={{ colorScheme: layoutContext.colorScheme }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            onAddNewItem();
                        }
                    }}
                />
                <div className="mdhui-meal-editor-items-add-button">
                    <Button variant="light" fullWidth={false} onClick={onAddNewItem}>{language('add')}</Button>
                </div>
            </div>
            <div className="mdhui-meal-editor-item-list">
                {mealToEdit.items && mealToEdit.items.length > 0 && mealToEdit.items.sort(itemSortByNameAsc).map(item => {
                    return <UnstyledButton key={item.name} onClick={() => onRemoveItem(item.name)}>
                        <div className="mdhui-meal-editor-item">
                            {item.name}
                            <FontAwesomeSvgIcon className="mdhui-meal-editor-item-delete-icon" icon={faTrashCan} />
                        </div>
                    </UnstyledButton>;
                })}
                {(!mealToEdit.items || mealToEdit.items.length === 0) &&
                    <div className="mdhui-meal-editor-item-none">{language('meal-editor-item-none')}</div>
                }
            </div>
        </div>
        <Card style={{ margin: '16px 0' }}>
            <MealAnalysis meal={mealToEdit} onAddItem={onAddItem} onAddItems={onAddAnalysisItems} />
        </Card>
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
    </div>
}