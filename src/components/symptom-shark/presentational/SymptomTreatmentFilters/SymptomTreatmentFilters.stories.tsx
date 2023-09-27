import React, { useState } from "react";
import { Layout, Section } from "../../../presentational";
import { previewConfiguration } from "../../container/LogToday/LogToday.previewData";
import SymptomTreatmentFilters from "./SymptomTreatmentFilters";

export default { title: "SymptomShark/Presentational/SymptomTreatmentFilters", component: SymptomTreatmentFilters, parameters: { layout: 'fullscreen' } };

export function Default() {
    const [selectedSymptoms, setSelectedSymptom] = useState<string[]>([]);
    const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
    const [expandedDropdown, setExpandedDropdown] = useState<"Symptoms" | "Treatments" | null>(null);

    return <Layout colorScheme="auto">
        <Section><SymptomTreatmentFilters configuration={previewConfiguration}
            selectedSymptoms={selectedSymptoms}
            onSymptomsSelectionChange={(s) => setSelectedSymptom(s)}
            selectedTreatments={selectedTreatments}
            onTreatmentsSelectionChange={(s) => setSelectedTreatments(s)}
            expandedDropdown={expandedDropdown}
            onExpandedDropdownChange={(d) => setExpandedDropdown(d)} /></Section>
    </Layout>
}
