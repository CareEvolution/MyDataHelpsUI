import React, { createContext, useEffect, useState } from "react";
import { DailyLogEntry, LoadingIndicator, Section, SymptomConfiguration, SymptomSharkConfiguration, TreatmentConfiguration } from "../../../..";
import MyDataHelps from "@careevolution/mydatahelps-js";
import symptomSharkData from "../../helpers/symptom-shark-data";
import SymptomTreatmentFilters from "../../presentational/SymptomTreatmentFilters/SymptomTreatmentFilters";
import { demoLogEntries, demoSymptoms, demoTreatments } from "../../helpers/demo-data";

export interface SymptomSharkVisualizationCoordinatorProps {
    children: React.ReactNode;
    showFilters?: boolean;
    previewState?: "default";
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface SymptomSharkVisualizationContext {
    symptoms: SymptomConfiguration[];
    treatments: TreatmentConfiguration[];
    logEntries: { [key: string]: DailyLogEntry }
    hasFilteredSymptoms: boolean;
}

export const SymptomSharkVisualizationContext = createContext<SymptomSharkVisualizationContext | null>(null);

export default function (props: SymptomSharkVisualizationCoordinatorProps) {
    const [currentContext, setCurrentContext] = useState<SymptomSharkVisualizationContext | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
    const [expandedDropdown, setExpandedDropdown] = useState<"Symptoms" | "Treatments" | null>(null);
    let [configuration, setConfiguration] = useState<SymptomSharkConfiguration | null>(null);

    function load() {
        if (props.previewState == "default") {
            setConfiguration({ symptoms: demoSymptoms, treatments: demoTreatments });
            setCurrentContext({ symptoms: demoSymptoms, treatments: demoTreatments, logEntries: demoLogEntries, hasFilteredSymptoms: false });
            return;
        }

        symptomSharkData.getConfiguration().then(function (info) {
            symptomSharkData.getDailyLogEntries().then(function (logEntries) {
                setConfiguration(info);
                configuration = info;
                setCurrentContext({ symptoms: filterSymptoms(selectedSymptoms), treatments: filterTreatments(selectedTreatments), logEntries: logEntries, hasFilteredSymptoms: false });
            })
        })
    }

    function filterSymptoms(selectedSymptoms: string[]) {
        return configuration!.symptoms!.filter(s => (!selectedSymptoms.length || selectedSymptoms.includes(s.id)) && !s.inactive);
    }

    function filterTreatments(selectedTreatments: string[]) {
        return configuration!.treatments!.filter(s => (!selectedTreatments.length || selectedTreatments.includes(s.id)) && !s.inactive);
    }

    function updateSelectedSymptoms(selectedSymptoms: string[]) {
        setCurrentContext({ ...currentContext!, symptoms: filterSymptoms(selectedSymptoms), hasFilteredSymptoms: !!selectedSymptoms.length });
        setSelectedSymptoms(selectedSymptoms);
    }

    function updateSelectedTreatments(selectedTreatments: string[]) {
        setCurrentContext({ ...currentContext!, treatments: filterTreatments(selectedTreatments) });
        setSelectedTreatments(selectedTreatments);
    }

    useEffect(() => {
        load();
        MyDataHelps.on("applicationDidBecomeVisible", load);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", load);
        }
    }, []);

    if (!currentContext || !configuration) {
        return <LoadingIndicator />;
    }

    return <div ref={props.innerRef}>
        <SymptomSharkVisualizationContext.Provider value={currentContext}>
            {props.showFilters && <Section noTopMargin>
                <SymptomTreatmentFilters configuration={configuration}
                    selectedSymptoms={selectedSymptoms}
                    onSymptomsSelectionChange={(s) => updateSelectedSymptoms(s)}
                    selectedTreatments={selectedTreatments}
                    onTreatmentsSelectionChange={(s) => updateSelectedTreatments(s)}
                    expandedDropdown={expandedDropdown}
                    onExpandedDropdownChange={(d) => setExpandedDropdown(d)} />
            </Section>
            }
            {props.children}
        </SymptomSharkVisualizationContext.Provider>
    </div>
}