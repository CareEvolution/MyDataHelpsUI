import React, { useState } from 'react';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { Card, Layout, LoadingIndicator, NavigationBar, ValueSelector } from '../../../presentational';
import { add, format, isBefore, startOfToday } from 'date-fns';
import { AsthmaLogEntry, AsthmaSymptomLevel } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier, getAsthmaSymptomLevel, getAsthmaSymptomLevelValue } from '../../helpers';
import { AsthmaLogEntryEditorViewPreviewState, previewData } from './AsthmaLogEntryEditorView.previewData';

export interface AsthmaLogEntryEditorViewProps {
    previewState?: AsthmaLogEntryEditorViewPreviewState;
    colorScheme?: 'light' | 'dark' | 'auto';
    date: Date;
}

export default function (props: AsthmaLogEntryEditorViewProps) {
    let yesterday = add(startOfToday(), {days: -1});
    if (isBefore(props.date, yesterday)) {
        MyDataHelps.dismiss();
        return null;
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [logEntry, setLogEntry] = useState<AsthmaLogEntry>();

    const updateSymptomLevel = (symptomLevel: AsthmaSymptomLevel): void => {
        let updatedLogEntry: AsthmaLogEntry = {
            ...logEntry!,
            symptomLevel: symptomLevel
        };
        if (symptomLevel === 'none') {
            updatedLogEntry.symptoms = [];
        }
        setLogEntry(updatedLogEntry);
    };

    const updateSymptoms = (symptoms: string[]): void => {
        let updatedLogEntry: AsthmaLogEntry = {
            ...logEntry!,
            symptoms: symptoms
        };
        if (symptoms.length > 0 && updatedLogEntry.symptomLevel === 'none') {
            updatedLogEntry.symptomLevel = 'mild'
        }
        setLogEntry(updatedLogEntry);
    };

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setLogEntry(previewData[props.previewState].logEntry);
            setLoading(false);
            return;
        }

        let dayBefore = add(new Date(props.date), {days: -1});
        let dayAfter = add(new Date(props.date), {days: 1});
        asthmaDataService.loadLogEntries(dayBefore, dayAfter).then(logEntries => {
            let logEntry = logEntries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(props.date));
            if (logEntry) {
                setLogEntry(logEntry);
            } else {
                MyDataHelps.dismiss();
            }
            setLoading(false);
        });
    });

    const onCancel = (): void => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    }

    const onSave = (): void => {
        if (loading || props.previewState) return;
        asthmaDataService.saveLogEntry(logEntry!).then(() => {
            MyDataHelps.dismiss();
        });
    };

    const onSymptomLevelChanged = (symptomLevelValue: string): void => {
        updateSymptomLevel(getAsthmaSymptomLevel(symptomLevelValue));
    };

    const onSymptomsChanged = (symptoms: string[]): void => {
        updateSymptoms(symptoms);
    };

    const onImpactsChanged = (impacts: string[]): void => {
        setLogEntry({
            ...logEntry!,
            impacts: impacts
        });
    };

    const onTriggersChanged = (triggers: string[]): void => {
        setLogEntry({
            ...logEntry!,
            triggers: triggers
        });
    };

    const cancelButton = <div className="button" style={{left: '16px'}} onClick={() => onCancel()}>Cancel</div>;
    const saveButton = <div className="button" style={{color: '#fff', background: '#369cff', right: '16px', padding: '0 16px'}} onClick={() => onSave()}>Save</div>;

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="#fff">
        <NavigationBar
            title={format(props.date, 'LLLL do')}
            navigationBarLeft={cancelButton}
            navigationBarRight={saveButton}
            variant="compressed"
            backgroundColor="#fff"
        />
        {loading && <LoadingIndicator/>}
        {!loading && logEntry &&
            <div>
                <Card backgroundColor="#f2f2f7">
                    <ValueSelector
                        title="Symptom level"
                        subtitle="Select one"
                        values={[
                            'No symptoms',
                            'Mild symptoms',
                            'Moderate symptoms',
                            'Severe symptoms'
                        ]}
                        selectedValues={[getAsthmaSymptomLevelValue(logEntry.symptomLevel)]}
                        preventEmptySelections={true}
                        onChange={selectedValues => onSymptomLevelChanged(selectedValues[0])}
                    />
                </Card>
                <Card backgroundColor="#f2f2f7">
                    <ValueSelector
                        title="Symptoms"
                        subtitle="Select all that apply"
                        values={[
                            'Difficulty breathing',
                            'Wheezing',
                            'Coughing',
                            'Chest tightness or pressure'
                        ]}
                        selectedValues={logEntry.symptoms}
                        variant='checkboxes'
                        multiSelect={true}
                        onChange={selectedValues => onSymptomsChanged(selectedValues)}
                    />
                </Card>
                <Card backgroundColor="#f2f2f7">
                    <ValueSelector
                        title="Impacts"
                        subtitle="Select all that apply"
                        values={[
                            'Wake up at night',
                            'Limit your daily activity',
                            'Use your rescue inhaler'
                        ]}
                        selectedValues={logEntry.impacts}
                        variant='checkboxes'
                        multiSelect={true}
                        onChange={selectedValues => onImpactsChanged(selectedValues)}
                    />
                </Card>
                <Card backgroundColor="#f2f2f7">
                    <ValueSelector
                        title="Triggers"
                        subtitle="Select all that apply"
                        values={[
                            'Cold/viral illness',
                            'Animal exposure',
                            'Seasonal allergens/pollen',
                            'Smoke (tobacco or wood burning)',
                            'Extreme weather changes',
                            'Air pollution',
                            'Strong smells',
                            'Chemicals/cleaning supplies',
                            'Dust',
                            'Mold',
                            'Dust mites',
                            'Rodents',
                            'Cockroaches',
                            'Taken a NSAID (non-steroidal anti-inflammatory drugs including aspirin and ibuprofen)',
                            'Taken a beta blocker',
                            'Had heartburn',
                            'Drank red wine',
                            'Tried any new foods',
                            'Cooked without a fan or open window',
                            'Had a pet sleep in your bed',
                            'Burned incense or a candle'
                        ]}
                        selectedValues={logEntry.triggers}
                        variant='checkboxes'
                        multiSelect={true}
                        onChange={selectedValues => onTriggersChanged(selectedValues)}
                    />
                </Card>
            </div>
        }
    </Layout>;
}