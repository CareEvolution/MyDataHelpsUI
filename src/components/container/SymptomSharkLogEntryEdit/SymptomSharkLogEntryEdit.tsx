import React, { useState, useEffect, useMemo } from 'react';
import MyDataHelps from "@careevolution/mydatahelps-js"
import { isSameDay, format, add, formatISO } from 'date-fns';
import "./SymptomSharkLogEntryEdit.css"
import getDayKey from '../../../helpers/get-day-key';
import { getDayOfWeek } from '../../../helpers/date-helpers';
import language from '../../../helpers/language';
import symptomSharkData, { DailyLogEntry, SymptomConfiguration, SymptomSharkConfiguration, TreatmentConfiguration } from '../../../helpers/symptom-shark-data';
import { Button, DayTrackerSymbol, Face, LoadingIndicator, NavigationBar, NotesInput, ShinyOverlay, TrackerItem, UnstyledButton } from '../../presentational';
import { debounce, set } from 'lodash';
import { previewConfiguration, previewLogEntry } from '../SymptomSharkLogToday/SymptomSharkLogToday.previewData';

export interface SymptomSharkLogEntryEditProps {
    date: Date;
    promptForReviewAfterDays?: number;
    previewState: "default";
}

export default function (props: SymptomSharkLogEntryEditProps) {
    const [logEntry, setLogEntry] = useState<DailyLogEntry | null>(null);
    const [promptForReview, setPromptForReview] = useState<boolean>(false);
    const [configuration, setConfiguration] = useState<SymptomSharkConfiguration | null>(null);
    const [saving, setSaving] = useState<boolean>(false);
    const [selectedSymptom, setSelectedSymptom] = useState<SymptomConfiguration | null>(null);

    function initialize() {
        if (props.previewState == "default") {
            setConfiguration(previewConfiguration);
            setLogEntry(previewLogEntry);
            return;
        }

        var start = add(props.date, { days: -14 });
        var end = add(props.date, { days: 1 });

        symptomSharkData.getConfiguration().then(function (configuration) {
            symptomSharkData.getDailyLogEntries(formatISO(start), formatISO(end)).then(function (logEntries) {
                setConfiguration(configuration);
                if (logEntries[getDayKey(props.date)]) {
                    setLogEntry(logEntries[getDayKey(props.date)]);
                } else {
                    setLogEntry({
                        symptoms: [],
                        treatments: [],
                        notes: ""
                    });
                }
                if (props.promptForReviewAfterDays && Object.keys(logEntries).length > props.promptForReviewAfterDays) {
                    setPromptForReview(true);
                }
            });
        });
    }

    useEffect(() => {
        initialize();
    }, []);

    function setSeverity(item: SymptomConfiguration, severity: number | null) {
        var newEntry = { ...logEntry! };
        var newItems = [...newEntry.symptoms];
        if (newItems.find(t => t.id == item.id)) {
            newItems.splice(newItems.findIndex(t => t.id == item.id), 1);
        }
        if (severity) {
            newItems.push({ id: item.id, severity: severity });
        }
        newEntry.symptoms = newItems;
        saveLogEntry(newEntry);
        setSelectedSymptom(null);
    }

    function toggleSymptom(item: SymptomConfiguration) {
        if (item.severityTracking == '10PointScale' || item.severityTracking == "3PointScale") {
            setSelectedSymptom(item);
            return;
        }

        var newEntry = { ...logEntry! };
        var newItems = [...newEntry.symptoms];

        if (newItems.find(t => t.id == item.id)) {
            newItems.splice(newItems.findIndex(t => t.id == item.id), 1);
        } else {
            newItems.push({ id: item.id });
        }
        newEntry.symptoms = newItems;
        saveLogEntry(newEntry);
    }

    function toggleTreatment(item: TreatmentConfiguration) {
        var newEntry = { ...logEntry! };
        var newItems = [...newEntry.treatments];

        if (newItems.find(t => t.id == item.id)) {
            newItems.splice(newItems.findIndex(t => t.id == item.id), 1);
        } else {
            newItems.push({ id: item.id });
        }
        newEntry.treatments = newItems;
        saveLogEntry(newEntry);
    }

    function saveLogEntry(newLogEntry: DailyLogEntry) {
        setLogEntry(newLogEntry);
        if (props.previewState == "default") { return; }
        setSaving(true);
        symptomSharkData.saveDailyLogEntry(getDayKey(props.date), newLogEntry).then(function () {
            setSaving(false);
        });
    }

    function updateFace(face: number) {
        var newEntry = { ...logEntry! };
        if (newEntry.overallFeeling == face) {
            newEntry.overallFeeling = undefined;
        } else {
            newEntry.overallFeeling = face;
        }
        saveLogEntry(newEntry);
    }

    const debouncedSave = useMemo(
        () => debounce(saveLogEntry, 300)
        , []);

    function updateNotes(notes: string) {
        var newEntry = { ...logEntry! };
        newEntry.notes = notes;
        setLogEntry(newEntry);
        debouncedSave(newEntry);
    }

    var back = function () {
        if (promptForReview) {
            MyDataHelps.requestReview(7);
        }
        if (saving) {
            return;
        }
        MyDataHelps.back();
    };

    var dateLabel = getDayOfWeek(props.date);
    dateLabel += (", " + format(props.date, "MMM d, yyyy"));

    function getDayTracker(entry: DailyLogEntry) {
        var primaryColors = entry.symptoms.map(t => configuration!.symptoms.find(s => s.id == t.id)?.color).filter(t => !!t).map(t => t!);
        var secondaryColors = entry.treatments.map(t => configuration!.treatments.find(s => s.id == t.id)?.color).filter(t => !!t).map(t => t!);
        return <DayTrackerSymbol className='scaled-up-tracker' key={primaryColors.join('|') + ',' + secondaryColors.join('|')} primaryColors={primaryColors} secondaryColors={secondaryColors} />
    }

    function getSeverity(s: SymptomConfiguration) {
        var symptomRef = logEntry!.symptoms.find(s2 => s2.id == s.id);
        if (symptomRef) {
            if (s.severityTracking == "10PointScale") {
                if (!symptomRef.severity) { return undefined };
                return symptomRef.severity.toString();
            }
            if (s.severityTracking == "3PointScale") {
                if (!symptomRef.severity) { return undefined };
                if (symptomRef.severity > 0 && symptomRef.severity <= 3) {
                    return language("mild-shortened");
                }
                if (symptomRef.severity > 3 && symptomRef.severity <= 7) {
                    return language("moderate-shortened");
                }
                if (symptomRef.severity > 7) {
                    return language("severe-shortened");
                }
            }
        }
    }

    return (
        <>
            <NavigationBar title={dateLabel} showBackButton={true} variant="compressed" />
            <div className="log-entry-edit">
                {!logEntry &&
                    <LoadingIndicator />
                }
                {!!logEntry && !!configuration &&
                    <>
                        <div className="day-edit-body" style={{ paddingTop: "8px" }}>
                            <div style={{ width: "100%", overflow: "hidden" }}>
                                {getDayTracker(logEntry)}
                            </div>
                            {isSameDay(new Date(), props.date) &&
                                <h3>{language("symptoms-experiencing-today")}</h3>
                            }
                            {!isSameDay(new Date(), props.date) &&
                                <h3>{language("symptoms-experiencing-previous")}</h3>
                            }
                            <div className="items">
                                {configuration?.symptoms.filter(s => !s.inactive).map(s =>
                                    <TrackerItem className="item" selected={!!logEntry.symptoms.find(s2 => s2.id == s.id)}
                                        color={s.color}
                                        text={s.name}
                                        key={s.id}
                                        onClick={() => toggleSymptom(s)}
                                        badge={getSeverity(s)} />
                                )}
                            </div>
                            {configuration.treatments.length > 0 &&
                                <div>
                                    {isSameDay(new Date(), props.date) &&
                                        <h3>{language("treatments-experiencing-today")}</h3>
                                    }
                                    {!isSameDay(new Date(), props.date) &&
                                        <h3>{language("treatments-experiencing-previous")}</h3>
                                    }
                                    <div className="items">
                                        {configuration?.treatments.filter(s => !s.inactive).map(s =>
                                            <TrackerItem className="item" selected={!!logEntry.treatments.find(s2 => s2.id == s.id)}
                                                color={s.color}
                                                text={s.name}
                                                key={s.id}
                                                onClick={() => toggleTreatment(s)}
                                                bordered={true} />
                                        )}
                                    </div>
                                </div>
                            }
                            <div>
                                {isSameDay(new Date(), props.date) &&
                                    <h3>{language("feeling-overall-today")}</h3>
                                }
                                {!isSameDay(new Date(), props.date) &&
                                    <h3>{language("feeling-overall-previous")}</h3>
                                }
                                <div className="faces">
                                    <Face className="ss-face" faceValue={5} selected={logEntry.overallFeeling == 5} onClick={() => updateFace(5)} />
                                    <Face className="ss-face" faceValue={4} selected={logEntry.overallFeeling == 4} onClick={() => updateFace(4)} />
                                    <Face className="ss-face" faceValue={3} selected={logEntry.overallFeeling == 3} onClick={() => updateFace(3)} />
                                    <Face className="ss-face" faceValue={2} selected={logEntry.overallFeeling == 2} onClick={() => updateFace(2)} />
                                    <Face className="ss-face" faceValue={1} selected={logEntry.overallFeeling == 1} onClick={() => updateFace(1)} />
                                </div>
                            </div>
                            <h3 style={{ marginBottom: "16px" }}>{language("additional-notes")}</h3>
                            <NotesInput placeholder={language("add-notes")} autoTimestamp={isSameDay(new Date(), props.date)} onChange={(v) => updateNotes(v)} value={logEntry.notes} />
                        </div>
                        <Button onClick={() => back()}>{language("done")}</Button>
                        {selectedSymptom &&
                            <div className="symptom-edit-modal">
                                <div className="symptom-edit-padder">
                                    <div className="symptom-edit-container">
                                        <h3 style={{ marginTop: "0", marginBottom: "16px" }}>{isSameDay(new Date(), props.date) ? language("how-severe-is") : language("how-severe-was")} {selectedSymptom.name}?</h3>
                                        {selectedSymptom.severityTracking == "3PointScale" &&
                                            <div className="option-select-vertical">
                                                <UnstyledButton className={"option" + (getSeverity(selectedSymptom) == language("mild-shortened") ? " selected" : "")} onClick={() => setSeverity(selectedSymptom, 2)}>
                                                    {language("mild")} <ShinyOverlay />
                                                </UnstyledButton>
                                                <UnstyledButton className={"option" + (getSeverity(selectedSymptom) == language("moderate-shortened") ? " selected" : "")} onClick={() => setSeverity(selectedSymptom, 5)} ng-class="{selected:$ctrl.symptomSeverity($ctrl.selectedSymptom) == 5}">
                                                    {language("moderate")} <ShinyOverlay />
                                                </UnstyledButton>
                                                <UnstyledButton className={"option" + (getSeverity(selectedSymptom) == language("severe-shortened") ? " selected" : "")} onClick={() => setSeverity(selectedSymptom, 10)} ng-class="{selected:$ctrl.symptomSeverity($ctrl.selectedSymptom) == 10}">
                                                    {language("severe")} <ShinyOverlay />
                                                </UnstyledButton>
                                            </div>
                                        }
                                        {selectedSymptom.severityTracking == "10PointScale" &&
                                            <div className="option-select-vertical">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                                                    <UnstyledButton key={i} onClick={() => setSeverity(selectedSymptom, i)} className={"option" + (getSeverity(selectedSymptom) == i.toString() ? " selected" : "")}>
                                                        {i}
                                                        <ShinyOverlay />
                                                    </UnstyledButton>
                                                )}
                                            </div>
                                        }
                                        <UnstyledButton className="clear-symptom" onClick={() => setSeverity(selectedSymptom, null)}>{language("clear-symptom")}</UnstyledButton>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </>
    );
}