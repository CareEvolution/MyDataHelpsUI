import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import "./SymptomTreatmentFilters.css";
import { ShinyOverlay, SymptomConfiguration, SymptomSharkConfiguration, TrackerItem, TreatmentConfiguration, UnstyledButton, language } from '../../../..';

export interface SymptomTreatmentFiltersProps {
    expandedDropdown: "Symptoms" | "Treatments" | null;
    onExpandedDropdownChange(expandedDropdown: "Symptoms" | "Treatments" | null): void;
    selectedSymptoms: string[];
    selectedTreatments: string[];
    configuration: SymptomSharkConfiguration;
    onSymptomsSelectionChange(symptoms: string[]): void;
    onTreatmentsSelectionChange(treatments: string[]): void;
}

export default function (props: SymptomTreatmentFiltersProps) {

    function toggleSymptom(item: SymptomConfiguration) {
        var newSelectedItems = [...props.selectedSymptoms];
        if (newSelectedItems.indexOf(item.id) != -1) {
            newSelectedItems.splice(newSelectedItems.indexOf(item.id), 1);
        } else {
            newSelectedItems.push(item.id);
        }
        props.onSymptomsSelectionChange(newSelectedItems);
    }

    function toggleTreatment(item: TreatmentConfiguration) {
        var newSelectedItems = [...props.selectedTreatments];
        if (newSelectedItems.indexOf(item.id) != -1) {
            newSelectedItems.splice(newSelectedItems.indexOf(item.id), 1);
        } else {
            newSelectedItems.push(item.id);
        }
        props.onTreatmentsSelectionChange(newSelectedItems);
    }

    return <div className="mdhui-ss-symptom-treatment-filters">
        <UnstyledButton className="mdhui-ss-symptom-treatment-filter-dropdown-button" onClick={() => props.expandedDropdown == "Symptoms" ? props.onExpandedDropdownChange(null) : props.onExpandedDropdownChange("Symptoms")}
            style={{ fontWeight: props.selectedSymptoms.length > 0 ? "bold" : "" }}>
            {language("select-symptoms")} <FontAwesomeIcon icon={props.expandedDropdown == "Symptoms" ? faCaretUp : faCaretDown} />
            <ShinyOverlay />
        </UnstyledButton>
        <UnstyledButton className="mdhui-ss-symptom-treatment-filter-dropdown-button" onClick={() => props.expandedDropdown == "Treatments" ? props.onExpandedDropdownChange(null) : props.onExpandedDropdownChange("Treatments")}
            style={{ fontWeight: props.selectedTreatments.length > 0 ? "bold" : "" }}>
            {language("select-treatments")} <FontAwesomeIcon icon={props.expandedDropdown == "Treatments" ? faCaretUp : faCaretDown} />
            <ShinyOverlay />
        </UnstyledButton>
        {props.expandedDropdown == "Symptoms" &&
            <div className="mdhui-ss-symptom-treatment-filter-items-list">
                {props.configuration.symptoms.filter(s => !s.inactive).map((m) =>
                    <TrackerItem className="mdhui-ss-symptom-treatment-filter-item" selected={props.selectedSymptoms.indexOf(m.id) != -1} onClick={() => toggleSymptom(m)} color={m.color} key={m.id} text={m.name} />
                )}
            </div>
        }
        {props.expandedDropdown == "Treatments" &&
            <div className="mdhui-ss-symptom-treatment-filter-items-list">
                {props.configuration.treatments.filter(s => !s.inactive).map((m) =>
                    <TrackerItem className="mdhui-ss-symptom-treatment-filter-item" selected={props.selectedTreatments.indexOf(m.id) != -1} onClick={() => toggleTreatment(m)} color={m.color} key={m.id} text={m.name} />
                )}
            </div>
        }
    </div>;
}