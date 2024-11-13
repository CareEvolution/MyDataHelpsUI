import React, { ChangeEvent, useContext, useState } from 'react';
import './MealEditor.css';
import { getMeals, getMealToEdit, getMealTypeDisplayText, language, Meal, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { Button, LayoutContext, LoadingIndicator, UnstyledButton } from '../../presentational';
import { startOfDay } from 'date-fns';
import { MealEditorPreviewState, previewData } from './MealEditor.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import parse from 'date-fns/parse';
import { formatDate, capitalize } from '../../../helpers/locale';

type EditMode = 'add' | 'edit';

export interface MealEditorProps {
    previewState?: 'loading' | MealEditorPreviewState
    onError: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: MealEditorProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [mealToEdit, setMealToEdit] = useState<Meal>();
    const [meals, setMeals] = useState<Meal[]>();
    const [mode, setMode] = useState<EditMode>();

    useInitializeView(() => {
        setLoading(true);
        setMealToEdit(undefined);
        setMeals(undefined);
        setMode(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            let currentPreviewData = previewData(props.previewState, new Date());
            setLoading(false);
            setMealToEdit(currentPreviewData.mealToEdit);
            setMeals(currentPreviewData.meals);
            setMode(props.previewState as EditMode);
            return;
        }

        getMealToEdit().then(mealToEdit => {
            if (mealToEdit) {
                getMeals(startOfDay(mealToEdit.timestamp)).then(meals => {
                    setLoading(false);
                    setMealToEdit(mealToEdit);
                    setMeals(meals);
                    setMode(meals.find(meal => meal.id === mealToEdit.id) ? 'edit' : 'add');
                });
            } else {
                props.onError();
            }
        });
    }, [], [props.previewState]);

    const onDelete = () => {
        if (props.previewState) {
            props.onDelete();
            return;
        }

        let otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        saveMeals(startOfDay(mealToEdit!.timestamp), [...otherMeals].sort(timestampSortAsc)).then(() => {
            props.onDelete();
        });
    };

    const onSave = () => {
        if (props.previewState) {
            props.onSave();
            return;
        }

        let otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        saveMeals(startOfDay(mealToEdit!.timestamp), [...otherMeals, mealToEdit!].sort(timestampSortAsc)).then(() => {
            props.onSave();
        });
    };

    const hasDuplicateTimestamp = () => {
        let otherMeals = meals!.filter(meal => meal.id !== mealToEdit!.id);
        return !!otherMeals.find(meal => meal.timestamp === mealToEdit!.timestamp);
    };

    const onTimeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value) {
            setMealToEdit({ ...mealToEdit!, timestamp: parse(value, 'HH:mm', mealToEdit!.timestamp) });
        }
    }

    return <div className="mdhui-meal-editor" ref={props.innerRef}>
        {loading && <LoadingIndicator />}
        {!loading && <div>
            <div className="mdhui-meal-editor-header">
                <div className="mdhui-meal-editor-header-type">
                    {mode === 'add' ? language('add') : language('edit')} {getMealTypeDisplayText(mealToEdit!.type)}
                </div>
                <div className="mdhui-meal-editor-header-date">
                    {capitalize(formatDate(mealToEdit!.timestamp, 'EEE, MMMM do, yyyy'))}
                </div>
                {mode === 'edit' &&
                    <UnstyledButton onClick={() => onDelete()}>
                        <div className="mdhui-meal-editor-header-delete-action">
                            <FontAwesomeSvgIcon icon={faTrashCan} />
                        </div>
                    </UnstyledButton>
                }
            </div>
            <div className="mdhui-meal-editor-form">
                {language('meal-editor-time-input-label')}:
                <input
                    className="mdhui-meal-editor-input"
                    type="time"
                    value={formatDate(mealToEdit!.timestamp, 'HH:mm')}
                    onChange={event => onTimeChanged(event)}
                    style={{
                        colorScheme: layoutContext.colorScheme
                    }}
                />
            </div>
            {hasDuplicateTimestamp() && <div className="mdhui-meal-editor-error">{language('meal-editor-duplicate-timestamp-error')}</div>}
            <div className="mdhui-meal-editor-buttons">
                <Button onClick={() => props.onCancel()} variant="light">{language('cancel')}</Button>
                <Button onClick={() => onSave()} disabled={hasDuplicateTimestamp()}>{language('save')}</Button>
            </div>
        </div>}
    </div>
}