import React, { useState, useEffect } from 'react';
import "./SetupStep.css"
import uuidv4 from '../../../helpers/uuidv4';
import colors from '../../../helpers/colors';
import MyDataHelps from "@careevolution/mydatahelps-js"
import language from '../../../helpers/language';
import { Button, Layout, LoadingIndicator, SegmentedControl, ShinyOverlay, UnstyledButton } from '../../presentational';
import { useInterval } from '../../../hooks';
import symptomSharkData, { SymptomConfiguration, TreatmentConfiguration } from '../../../helpers/symptom-shark-data';

export interface SetupStepProps {
    title: string;
    description?: string;
    inputPlaceholder: string;
    doneButtonText: string;
    concept: "Symptoms" | "Treatments";
    stepIdentifier?: string;
    requireItems: boolean;
    initialSetup: boolean;
    initialItems?: SymptomConfiguration[] | TreatmentConfiguration[];
}

export default function (props: SetupStepProps) {
    const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
    const [items, setItems] = useState<SymptomConfiguration[] | TreatmentConfiguration[]>([]);
    const [deletedItems, setDeletedItems] = useState<SymptomConfiguration[] | TreatmentConfiguration[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newItemName, setNewItemName] = useState<string>("");
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);

    function initialize() {
        if (!props.initialSetup) {
            symptomSharkData.getConfiguration().then(function (info) {
                if (props.concept == "Symptoms") {
                    setItems(info.symptoms);
                } else {
                    setItems(info.treatments);
                }
                setLoading(false);
            })
        } else {
            setLoading(false);
            if (props.initialItems?.length) {
                setItems(props.initialItems);
            }
        }

        if (props.stepIdentifier && (window as any).taskResult) {
            var targetStep = (window as any).taskResult.StepResults.find((t: any) => t.Identifier == props.stepIdentifier);
            if (targetStep) {
                var previousResult = targetStep.QuestionResults[0].Result;
                if (previousResult) {
                    setItems(JSON.parse(previousResult.replace(/\\/g, "")))
                }
            }
        }
    }

    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    useInterval(() => {
        setScrolledToBottom((t) => {
            var newValue = (window.scrollY + window.innerHeight) >= (document.body.scrollHeight - 20);
            if (newValue != t) {
                return newValue;
            }
            return t;
        });
    }, 300);

    useEffect(() => {
        initialize();
    }, []);

    function deleteItem(item: SymptomConfiguration | TreatmentConfiguration) {
        var newDeletedItems = [...deletedItems];
        newDeletedItems.push(item);
        setDeletedItems(newDeletedItems);
        setItems(items.filter(i => i.id != item.id));
        setUnsavedChanges(true);
    }

    function updateItem(item: SymptomConfiguration | TreatmentConfiguration) {
        var newItems = [...items];
        var index = newItems.findIndex(i => i.id == item.id);
        newItems[index] = item;
        setItems(newItems);
        setUnsavedChanges(true);
    }

    var getNextColor = function () {
        var usedColors = [];
        for (var i = 0; i < items.length; i++) {
            usedColors.push(items[i].color);
        }
        for (var j = 0; j < colors.length; j++) {
            if (usedColors.indexOf(colors[j]) == -1) {
                return colors[j];
            }
        }
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function handleKeyUp(keyCode: number) {
        if (keyCode === 13) {
            addNewItem(newItemName);
        }
    }

    function addNewItem(itemName: string) {
        var newItems = [...items];

        var item = {
            id: uuidv4(),
            name: itemName,
            color: getNextColor()
        };
        if (props.concept == "Symptoms") {
            (item as SymptomConfiguration).severityTracking = "None";
        }
        newItems.push(item);
        setItems(newItems);
        setNewItemName("");
        setUnsavedChanges(true);
    }

    function finish() {
        MyDataHelps.completeStep(JSON.stringify(items));
    }

    return (
        <Layout className="symptom-shark-view setup-step" colorScheme='light' bodyBackgroundColor='#f5f5f5'>
            <div className="current-items">
                <h3>{props.title}</h3>
                {!!props.description &&
                    <p>{props.description}</p>
                }
                <div className="item-list">
                    {items.map(item =>
                        <SetupStepItem key={item.id}
                            item={item}
                            onHighlight={(i) => setHighlightedItem(i.id)}
                            highlighted={highlightedItem == item.id}
                            onDelete={(i) => deleteItem(i)}
                            onItemChange={(i) => updateItem(i)} />
                    )}
                </div>
            </div>
            {loading &&
                <LoadingIndicator />
            }
            {!loading &&
                <div className="item-add">
                    <div className="new-item-name">
                        <input title={props.inputPlaceholder} ng-focus="$ctrl.scrollToInput()" autoCorrect="off" autoComplete="off" type="text" placeholder={props.inputPlaceholder} value={newItemName} onChange={(e) => setNewItemName(e.target.value)} onKeyUp={(e) => handleKeyUp(e.keyCode)} />
                    </div>
                    <div className="finish-wrapper">
                        {deletedItems.length > 0 && !props.initialSetup &&
                            <div className="warning">
                                {language("item-delete-warning")}
                                <ul>
                                    {deletedItems.map(d =>
                                        <li key={d.id} className="item-to-delete">{d.name}</li>
                                    )}
                                </ul>
                            </div>
                        }
                        {(!props.requireItems || items.length > 0) && !newItemName &&
                            <Button disabled={!!items.find(i => !i.name)} onClick={() => finish()}>
                                {props.doneButtonText}
                            </Button>
                        }
                        {newItemName &&
                            <Button onClick={() => addNewItem(newItemName)}>
                                <i className="fa fa-plus-circle"></i> {language("add")}
                            </Button>
                        }
                    </div>
                </div>
            }
            {unsavedChanges && !props.initialSetup && !scrolledToBottom &&
                <div className="unsaved-changes-banner" onClick={() => scrollToBottom()}>
                    {language("unsaved-changes")} <i className="fa fa-chevron-down"></i>
                </div>
            }
        </Layout>
    );
}

interface SetupStepItemProps {
    highlighted: boolean;
    item: SymptomConfiguration | TreatmentConfiguration;
    onItemChange(item: SymptomConfiguration | TreatmentConfiguration): void;
    onHighlight(item: SymptomConfiguration | TreatmentConfiguration): void;
    onDelete(item: SymptomConfiguration | TreatmentConfiguration): void;
}

function isSymptom(item: SymptomConfiguration | TreatmentConfiguration): item is SymptomConfiguration {
    return (item as SymptomConfiguration).severityTracking !== undefined;
}

function SetupStepItem(props: SetupStepItemProps) {
    const [editing, setEditing] = useState<boolean>(false);

    var itemType = 'Treatment';
    if (isSymptom(props.item)) {
        itemType = 'Symptom';
    }

    var updateItemName = function (name: string) {
        var newItem = { ...props.item };
        newItem.name = name;
        props.onItemChange(newItem);
    }

    var updateColor = function (color: string) {
        var newItem = { ...props.item };
        newItem.color = color;
        props.onItemChange(newItem);
    }

    var updateSeverityTracking = function (severityTracking: 'None' | '3PointScale' | '10PointScale') {
        var newItem = { ...props.item } as SymptomConfiguration;
        newItem.severityTracking = severityTracking;
        props.onItemChange(newItem);
    }

    var updateInactive = function (inactive: boolean) {
        var newItem = { ...props.item };
        newItem.inactive = inactive;
        props.onItemChange(newItem);
    }

    return <div className={"setup-step-item" + (props.item.inactive ? " muted" : "") + (props.highlighted ? " highlighted" : "") + (!props.item.name.length ? " error" : "")}>
        <div className="item-list-item-content">
            <div className="item-color" style={{ backgroundColor: props.item.color }}></div>
            <input title={language("enter-symptom-name")} type="text" placeholder={itemType == "Symptom" ? language("enter-symptom-name") : language("enter-treatment-name")} value={props.item.name} onChange={(e) => updateItemName(e.target.value)} onFocus={() => props.onHighlight(props.item)} />
        </div>
        {editing &&
            <div className="item-editor">
                <div className="item-setting">
                    <div className="color-picker">
                        <div className="color-picker-slider">
                            {colors.map(c =>
                                <div key={c} className={"color" + (props.item.color == c ? ' selected' : "")} style={{ backgroundColor: c }} onClick={() => updateColor(c)}></div>
                            )}
                        </div>
                    </div>
                </div>
                {itemType == "Symptom" &&
                    <div className="item-setting">
                        <div className="option-select-vertical" style={{ marginTop: "0" }}>
                            <SegmentedControl variant="optionsVertical" segments={[
                                { key: 'None', title: language("severity-tracking-none") },
                                { key: '3PointScale', title: language("severity-tracking-3point") },
                                { key: '10PointScale', title: language("severity-tracking-10point") }
                            ]} selectedSegment={(props.item as SymptomConfiguration).severityTracking} onSegmentSelected={(segmentKey) => updateSeverityTracking(segmentKey as 'None' | '3PointScale' | '10PointScale')} />
                        </div>
                    </div>
                }
                <div className="item-setting">
                    <div className="option-select-horizontal">
                        <SegmentedControl variant="optionsHorizontal" segments={[
                            { key: 'false', title: language("not-muted") },
                            { key: 'true', title: language("muted") }
                        ]} selectedSegment={(props.item.inactive || false).toString()} onSegmentSelected={(segmentKey) => updateInactive(segmentKey == "true")} />
                    </div>
                </div>
                <div className="item-setting delete-button">
                    <a href="javascript:{}" onClick={() => props.onDelete(props.item)}><i className="fa fa-trash"></i> {language("delete")}</a>
                </div>
            </div>
        }
    </div>;
}