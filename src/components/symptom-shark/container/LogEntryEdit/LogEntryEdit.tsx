import React, { useState, useEffect, useMemo } from 'react';
import MyDataHelps from "@careevolution/mydatahelps-js"
import { isSameDay, add, formatISO } from 'date-fns';
import "./LogEntryEdit.css"
import getDayKey from '../../../../helpers/get-day-key';
import { getDayOfWeek } from '../../../../helpers/date-helpers';
import language from '../../../../helpers/language';
import symptomSharkData, { DailyLogEntry, SymptomConfiguration, SymptomSharkConfiguration, TreatmentConfiguration } from '../../helpers/symptom-shark-data';
import { Button, DayTrackerSymbol, Face, LoadingIndicator, NavigationBar, NotesInput, SegmentedControl, Title, TrackerItem } from '../../../presentational';
import debounce from 'lodash/debounce';
import { previewConfiguration, previewLogEntry } from '../LogToday/LogToday.previewData';
import { getLongDateString } from '../../../../helpers/date-helpers';

export interface SymptomSharkLogEntryEditProps {
    date: Date;
    promptForReviewAfterDays?: number;
    previewState?: "default";
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

    function setSeverity(item: SymptomConfiguration, severity: number | string | null) {
        if (severity == language("mild-shortened")) {
            severity = 2;
        } else if (severity == language("moderate-shortened")) {
            severity = 5;
        } else if (severity == language("severe-shortened")) {
            severity = 8;
        }

        var newEntry = { ...logEntry! };
        var newItems = [...newEntry.symptoms];
        if (newItems.find(t => t.id == item.id)) {
            newItems.splice(newItems.findIndex(t => t.id == item.id), 1);
        }
        if (severity) {
            newItems.push({ id: item.id, severity: severity as number });
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
    dateLabel += (", " + getLongDateString(props.date));

    function getDayTracker(entry: DailyLogEntry) {
        var primaryColors = entry.symptoms.map(t => configuration!.symptoms.find(s => s.id == t.id)?.color).filter(t => !!t).map(t => t!);
        var secondaryColors = entry.treatments.map(t => configuration!.treatments.find(s => s.id == t.id)?.color).filter(t => !!t).map(t => t!);
        return <DayTrackerSymbol size="large" key={primaryColors.join('|') + ',' + secondaryColors.join('|')} primaryColors={primaryColors} secondaryColors={secondaryColors} />
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
        <div className="mdhui-ss-log-entry-edit-wrapper">
            <NavigationBar title={dateLabel} showBackButton={true} variant="compressed" backgroundColor="var(--mdhui-background-color-highest-contrast)" className="mdhui-ss-edit-nav" />
            <div className="mdhui-ss-log-entry-edit">
                {!logEntry &&
                    <LoadingIndicator />
                }
                {!!logEntry && !!configuration &&
                    <>
                        <div style={{ width: "100%", overflow: "hidden" }}>
                            {getDayTracker(logEntry)}
                        </div>
                        {isSameDay(new Date(), props.date) &&
                            <Title className="mdhui-ss-edit-title" order={3}>{language("symptoms-experiencing-today")}</Title>
                        }
                        {!isSameDay(new Date(), props.date) &&
                            <Title className="mdhui-ss-edit-title" order={3}>{language("symptoms-experiencing-previous")}</Title>
                        }
                        <div className="mdhui-ss-edit-items">
                            {configuration?.symptoms.filter(s => !s.inactive).map(s =>
                                <TrackerItem className="mdhui-ss-edit-item" selected={!!logEntry.symptoms.find(s2 => s2.id == s.id)}
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
                                    <Title className="mdhui-ss-edit-title" order={3}>{language("treatments-experiencing-today")}</Title>
                                }
                                {!isSameDay(new Date(), props.date) &&
                                    <Title className="mdhui-ss-edit-title" order={3}>{language("treatments-experiencing-previous")}</Title>
                                }
                                <div className="mdhui-ss-edit-items">
                                    {configuration?.treatments.filter(s => !s.inactive).map(s =>
                                        <TrackerItem className="mdhui-ss-edit-item" selected={!!logEntry.treatments.find(s2 => s2.id == s.id)}
                                            color={s.color}
                                            text={s.name}
                                            key={s.id}
                                            onClick={() => toggleTreatment(s)}
                                            bordered={true} />
                                    )}
                                </div>
                            </div>
                        }
                        {isSameDay(new Date(), props.date) &&
                            <Title className="mdhui-ss-edit-title" order={3}>{language("feeling-overall-today")}</Title>
                        }
                        {!isSameDay(new Date(), props.date) &&
                            <Title className="mdhui-ss-edit-title" order={3}>{language("feeling-overall-previous")}</Title>
                        }
                        <div className="mdhui-ss-edit-items">
                            <Face className="mdhui-ss-edit-face" faceValue={5} selected={logEntry.overallFeeling == 5} onClick={() => updateFace(5)} />
                            <Face className="mdhui-ss-edit-face" faceValue={4} selected={logEntry.overallFeeling == 4} onClick={() => updateFace(4)} />
                            <Face className="mdhui-ss-edit-face" faceValue={3} selected={logEntry.overallFeeling == 3} onClick={() => updateFace(3)} />
                            <Face className="mdhui-ss-edit-face" faceValue={2} selected={logEntry.overallFeeling == 2} onClick={() => updateFace(2)} />
                            <Face className="mdhui-ss-edit-face" faceValue={1} selected={logEntry.overallFeeling == 1} onClick={() => updateFace(1)} />
                        </div>
                        <Title className="mdhui-ss-edit-title" order={3} style={{ marginBottom: "16px" }}>{language("additional-notes")}</Title>
                        <NotesInput placeholder={language("add-notes")} autoTimestamp={isSameDay(new Date(), props.date)} onChange={(v) => updateNotes(v)} value={logEntry.notes} />
                        <Button onClick={() => back()}>{language("done")}</Button>
                        {selectedSymptom &&
                            <div className="mdhui-ss-symptom-edit-modal">
                                <div className="mdhui-ss-symptom-edit-padder">
                                    <div className="mdhui-ss-symptom-edit-container">
                                        <Title className="mdhui-ss-edit-title" order={3} style={{ marginBottom: "16px" }}>{isSameDay(new Date(), props.date) ? language("how-severe-is") : language("how-severe-was")} {selectedSymptom.name}?</Title>
                                        {selectedSymptom.severityTracking == "3PointScale" &&
                                            <SegmentedControl variant="optionsVertical" segments={
                                                [{ key: language("mild-shortened"), title: language("mild") },
                                                { key: language("moderate-shortened"), title: language("moderate") },
                                                { key: language("severe-shortened"), title: language("severe") }]
                                            } selectedSegment={getSeverity(selectedSymptom)} onSegmentSelected={(s) => setSeverity(selectedSymptom, s)} />
                                        }
                                        {selectedSymptom.severityTracking == "10PointScale" &&
                                            <SegmentedControl variant="optionsVertical" segments={
                                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => { return { key: i.toString(), title: i.toString() } })
                                            } selectedSegment={getSeverity(selectedSymptom)} onSegmentSelected={(s) => setSeverity(selectedSymptom, parseInt(s))} />
                                        }
                                        <Button className='mdhui-ss-clear-symptom' variant="subtle" onClick={() => setSeverity(selectedSymptom, null)}>{language("clear-symptom")}</Button>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
}