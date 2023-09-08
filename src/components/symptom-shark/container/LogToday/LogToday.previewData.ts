import { DailyLogEntry, SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";

export let previewConfiguration: SymptomSharkConfiguration = {
    "symptoms": [
        {
            "id": "1",
            "color": "#c4291c",
            "name": "Headache",
            "severityTracking": "3PointScale"
        },
        {
            "id": "2",
            "color": "#e35c33",
            "name": "Nausea",
            "severityTracking": "10PointScale"
        },
        {
            "id": "3",
            "color": "#5db37e",
            "name": "Dizziness",
            severityTracking: "None"
        }
    ], 
    "treatments": [
        {
            "id": "10",
            "color": "#c4291c",
            "name": "Tylenol"
        },
        {
            "id": "12",
            "color": "#e35c33",
            "name": "Rest"
        }
    ]
};

export let previewLogEntry: DailyLogEntry = {
    "symptoms": [
        {
            "id": "1",
            "severity": 2
        },
        {
            "id": "2",
            "severity": 7
        },
        {
            "id": "3"
        }
    ],
    "treatments": [
        {
            "id": "10"
        },
        {
            "id": "12"
        }
    ],
    "overallFeeling": 5,
    "notes": "I'm feeling a little better today."
}