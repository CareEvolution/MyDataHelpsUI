import React, { ChangeEvent, useState } from 'react';
import './MealEditor.css';
import { getMeals, getMealToEdit, Meal, saveMeals, timestampSortAsc, useInitializeView } from '../../../helpers';
import { Button, LoadingIndicator, UnstyledButton } from '../../presentational';
import { format, startOfDay } from 'date-fns';
import { MealEditorPreviewState, previewData } from './MealEditor.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import parse from "date-fns/parse";

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
        setMealToEdit({ ...mealToEdit!, timestamp: parse(event.target.value, 'kk:mm', mealToEdit!.timestamp) });
    }

    return <div className="mdhui-meal-editor">
        {loading && <LoadingIndicator />}
        {!loading && <div>
            <div className="mdhui-meal-editor-header">
                <div className="mdhui-meal-editor-header-type">
                    {mode === 'add' ? 'Add' : 'Edit'} {mealToEdit!.type}
                </div>
                <div className="mdhui-meal-editor-header-date">
                    {format(mealToEdit!.timestamp, 'EEE, MMMM do, yyyy')}
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
                Time: <input type="time" value={format(mealToEdit!.timestamp, 'kk:mm')} onChange={event => onTimeChanged(event)} />
            </div>
            {hasDuplicateTimestamp() && <div className="mdhui-meal-editor-error">Two meals cannot have the same timestamp.</div>}
            <div className="mdhui-meal-editor-buttons">
                <Button onClick={() => onSave()} disabled={hasDuplicateTimestamp()}>Save</Button>
                <Button onClick={() => props.onCancel()}>Cancel</Button>
            </div>
        </div>}
    </div>
}