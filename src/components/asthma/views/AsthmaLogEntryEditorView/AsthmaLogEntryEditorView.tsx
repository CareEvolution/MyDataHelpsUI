import React, { useState } from 'react';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { Card, Layout, LoadingIndicator, NavigationBar, UnstyledButton, ValueSelector } from '../../../presentational';
import { add, format, isBefore, startOfToday } from 'date-fns';
import { AsthmaLogEntry, AsthmaSymptom, AsthmaSymptomLevel } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier, getAsthmaImpacts, getAsthmaImpactTexts, getAsthmaSymptomLevel, getAsthmaSymptomLevelText, getAsthmaSymptoms, getAsthmaSymptomTexts, getAsthmaTriggers, getAsthmaTriggerTexts } from '../../helpers';
import { AsthmaLogEntryEditorViewPreviewState, previewData } from './AsthmaLogEntryEditorView.previewData';
import language from '../../../../helpers/language';

export interface AsthmaLogEntryEditorViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'loading' | AsthmaLogEntryEditorViewPreviewState;
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

    const updateSymptoms = (symptoms: AsthmaSymptom[]): void => {
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

        if (props.previewState === 'loading') {
            return;
        }
        if (props.previewState) {
            setLogEntry(previewData[props.previewState].logEntry);
            setLoading(false);
            return;
        }

        let dayBefore = add(new Date(props.date), {days: -1});
        let dayAfter = add(new Date(props.date), {days: 1});
        asthmaDataService.loadLogEntries(dayBefore, dayAfter).then(logEntries => {
            let logEntryIdentifier = dateToAsthmaLogEntryIdentifier(props.date);
            let logEntry = logEntries.find(e => e.identifier === logEntryIdentifier);
            if (logEntry) {
                setLogEntry(logEntry);
            } else {
                MyDataHelps.dismiss();
            }
            setLoading(false);
        });
    }, [], [props.previewState]);

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

    const onSymptomLevelChanged = (symptomLevelText: string): void => {
        updateSymptomLevel(getAsthmaSymptomLevel(symptomLevelText));
    };

    const onSymptomsChanged = (symptomTexts: string[]): void => {
        updateSymptoms(getAsthmaSymptoms(symptomTexts));
    };

    const onImpactsChanged = (impactTexts: string[]): void => {
        setLogEntry({
            ...logEntry!,
            impacts: getAsthmaImpacts(impactTexts)
        });
    };

    const onTriggersChanged = (triggerTexts: string[]): void => {
        setLogEntry({
            ...logEntry!,
            triggers: getAsthmaTriggers(triggerTexts)
        });
    };

    const cancelButton = <UnstyledButton className="button" style={{left: '16px'}} onClick={() => onCancel()}>Cancel</UnstyledButton>;
    const saveButton = <UnstyledButton className="button" style={{color: '#fff', background: '#369cff', right: '16px', padding: '0 16px'}} onClick={() => onSave()}>Save</UnstyledButton>;

    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar
            title={format(props.date, 'LLLL do')}
            navigationBarLeft={cancelButton}
            navigationBarRight={saveButton}
            variant="compressed"
            backgroundColor="var(--mdhui-background-color-0)"
        />
        {loading && <LoadingIndicator/>}
        {!loading && logEntry &&
            <div>
                <Card backgroundColor="var(--mdhui-background-color-1)">
                    <ValueSelector
                        title={language('asthma-log-entry-editor-view-symptom-level-title')}
                        subtitle={language('asthma-log-entry-editor-view-select-one-subtitle')}
                        values={[
                            language('asthma-symptom-level-none'),
                            language('asthma-symptom-level-mild'),
                            language('asthma-symptom-level-moderate'),
                            language('asthma-symptom-level-severe')
                        ]}
                        selectedValues={[getAsthmaSymptomLevelText(logEntry.symptomLevel)]}
                        preventEmptySelections={true}
                        onChange={selectedValues => onSymptomLevelChanged(selectedValues[0])}
                    />
                </Card>
                <Card backgroundColor="var(--mdhui-background-color-1)">
                    <ValueSelector
                        title={language('asthma-log-entry-editor-view-symptoms-title')}
                        subtitle={language('asthma-log-entry-editor-view-select-all-subtitle')}
                        values={[
                            language('asthma-symptom-difficulty-breathing'),
                            language('asthma-symptom-wheezing'),
                            language('asthma-symptom-coughing'),
                            language('asthma-symptom-chest-tightness')
                        ]}
                        selectedValues={getAsthmaSymptomTexts(logEntry.symptoms)}
                        variant='checkboxes'
                        multiSelect={true}
                        onChange={selectedValues => onSymptomsChanged(selectedValues)}
                    />
                </Card>
                <Card backgroundColor="var(--mdhui-background-color-1)">
                    <ValueSelector
                        title={language('asthma-log-entry-editor-view-impacts-title')}
                        subtitle={language('asthma-log-entry-editor-view-select-all-subtitle')}
                        values={[
                            language('asthma-impact-waking-at-night'),
                            language('asthma-impact-limit-daily-activity'),
                            language('asthma-impact-using-rescue-inhaler')
                        ]}
                        selectedValues={getAsthmaImpactTexts(logEntry.impacts)}
                        variant='checkboxes'
                        multiSelect={true}
                        onChange={selectedValues => onImpactsChanged(selectedValues)}
                    />
                </Card>
                <Card backgroundColor="var(--mdhui-background-color-1)">
                    <ValueSelector
                        title={language('asthma-log-entry-editor-view-triggers-title')}
                        subtitle={language('asthma-log-entry-editor-view-select-all-subtitle')}
                        values={[
                            language('asthma-trigger-cold-illness'),
                            language('asthma-trigger-animal-exposure'),
                            language('asthma-trigger-seasonal-allergens'),
                            language('asthma-trigger-smoke'),
                            language('asthma-trigger-weather-changes'),
                            language('asthma-trigger-air-pollution'),
                            language('asthma-trigger-strong-smells'),
                            language('asthma-trigger-chemicals'),
                            language('asthma-trigger-dust'),
                            language('asthma-trigger-mold'),
                            language('asthma-trigger-dust-mites'),
                            language('asthma-trigger-rodents'),
                            language('asthma-trigger-cockroaches'),
                            language('asthma-trigger-nsaid'),
                            language('asthma-trigger-beta-blocker'),
                            language('asthma-trigger-heartburn'),
                            language('asthma-trigger-red-wine'),
                            language('asthma-trigger-new-foods'),
                            language('asthma-trigger-cooked-without-ventilation'),
                            language('asthma-trigger-pet-in-bed'),
                            language('asthma-trigger-incense-or-candle')
                        ]}
                        selectedValues={getAsthmaTriggerTexts(logEntry.triggers)}
                        variant='checkboxes'
                        multiSelect={true}
                        onChange={selectedValues => onTriggersChanged(selectedValues)}
                    />
                </Card>
            </div>
        }
    </Layout>;
}