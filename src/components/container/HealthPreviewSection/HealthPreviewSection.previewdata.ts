import { HealthPreviewSectionConcept } from "./HealthPreviewSection";

export default function getHealthPreviewSectionData(concept: HealthPreviewSectionConcept) {
    switch (concept) {
        case "Medications":
            return {
                "PreviewValues": [
                    "atorvastatin 10 MG Oral Tablet",
                    "Metformin hydrochloride 500 MG Oral Tablet",
                    "atorvastatin 40 MG Oral Tablet"
                ],
                "Count": 67
            };
        case "Conditions":
            return {
                "PreviewValues": [
                    "Hypertension",
                    "Hyperlipidemia",
                    "Diabetes"
                ],
                "Count": 12
            };
        case "Allergies":
            return {
                "PreviewValues": [
                    "Penicillin",
                    "Dust",
                    "Pollen"
                ],
                "Count": 3
            };
        case "Immunizations":
            return {
                "PreviewValues": [
                    "Influenza virus vaccine",
                    "Tetanus and diphtheria toxoids - preservative free",
                    "Pneumococcal conjugate vaccine"
                ],
                "Count": 3
            };
        case "Reports":
            return {
                "PreviewValues": [
                    "Diagnostic X-Ray",
                    "Operative Note"
                ],
                "Count": 3
            };
        case "Procedures":
            return {
                "PreviewValues": [
                    "INJ TENDON SHEATH/LIGAMENT",
                    "DRAIN/INJ JOINT/BURSA W/US",
                    "INJ FOR TENDON ORIGIN/INSRT"
                ],
                "Count": 3
            };
    }
}