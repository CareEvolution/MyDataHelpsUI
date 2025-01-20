import { EhrNewsFeedEventModel } from "./types";

export const procedureGroupEvent: EhrNewsFeedEventModel = {
    "Type": "ProcedureGroup",
    "Category": "Procedure",
    "ID": "fe14a3dc-2efe-ed11-aac9-0afb9334277d",
    "Date": "2017-11-05T16:00:00+00:00",
    "Event": [
        {
            "ID": "fe14a3dc-2efe-ed11-aac9-0afb9334277d",
            "Date": "2017-11-05T16:00:00+00:00",
            "Procedure": "INJ TENDON SHEATH/LIGAMENT",
            "Type": "Surgery",
            "Description": "SOFT TISSUE",
            "Location": "Hospital A",
            PerformedByCaregiver: {
                ID: "123",
                CaregiverName: "John Doe",
                Addresses: [],
                ContactInfos: [],
                Pcp: false
            },
            VerifiedByCaregiver: {
                ID: "123",
                CaregiverName: "John Doe",
                Addresses: [],
                ContactInfos: [],
                Pcp: false
            }
        },
        {
            "ID": "fc14a3dc-2efe-ed11-aac9-0afb9334277f",
            "Date": "2017-11-05T16:00:00+00:00",
            "Procedure": "ARTHROCENTESIS - JOINT INJECTION",
            "Type": "",
            "Description": "ARTHROCENTESIS - JOINT INJECTION",
            "Location": "Hospital B",
        },
        {
            "ID": "fc14a3dc-2efe-ed11-aac9-0afb9334277x",
            "Date": "2017-11-05T16:00:00+00:00",
            "Procedure": "ARTHROCENTESIS - JOINT INJECTION",
            "Type": "",
            "Description": "ARTHROCENTESIS - JOINT INJECTION",
            "Location": "",
        }
    ],
    "Patient": {
        "PatientID": "ac81d336-72d8-407d-8731-b74aa8a7b42b",
        "PersonID": "d1c2475f-3177-4581-8d8c-6cdc45d89bc4",
        "PatientName": "D D",
        "RecordAuthority": "Cedars-Sinai"
    }
};

export const claimServiceGroupEvent: EhrNewsFeedEventModel = {
    "Type": "ClaimServiceGroup",
    "Category": "Procedure",
    "ID": "ebe7a449-477f-ee11-aac1-e2a3d5bdf50f",
    "Date": "2016-09-01T00:00:00-04:00",
    "Event": [
        {
            "ID": "ebe7a449-477f-ee11-aac1-e2a3d5bdf50f",
            "Service": "INTERNAL EYE PHOTOGRAPHY",
            "EndDate": "2016-09-01T23:59:59.9-04:00",
            "StartDate": "2016-09-01T00:00:00-04:00",
            "Status": "Allowed"
        },
        {
            "ID": "eae7a449-477f-ee11-aac1-e2a3d5bdf50ff",
            "Service": "CORNEAL TOPOGRAPHY",
            "EndDate": "2016-09-01T23:59:59.9-04:00",
            "StartDate": "2016-09-01T00:00:00-04:00",
            "Status": "Allowed"
        },
        {
            "ID": "e9e7a449-477f-ee11-aac1-e2a3sd5bdf50f",
            "Service": "OPHTHALMIC BIOMETRY BY PARTIAL COHE",
            "EndDate": "2016-09-01T23:59:59.9-04:00",
            "StartDate": "2016-09-01T00:00:00-04:00",
            "Status": "Allowed"
        }
    ],
    "Patient": {
        "PatientID": "3da17583-7595-42b9-9fa2-5a42958b60aa",
        "PersonID": "22ab3e2c-6dc4-40f5-913d-163cbad9d96c",
        "PatientName": "",
        "RecordAuthority": "CMS Sandbox"
    }
};

export const claimProcedureGroupEvent: EhrNewsFeedEventModel = {
    "Type": "ClaimProcedureGroup",
    "Category": "Procedure",
    "ID": "ede7a449-477f-ee11-aac1-e2a3d5bdf50f",
    "Date": "2016-09-01T00:00:00-04:00",
    "Event": [
        {
            ID: "ebe7a449-477f-ee11-aac1-eg2a3d5bdf50f",
            Procedure: "INTERNAL EYE PHOTOGRAPHY",
            Type: "Outpatient",
            Date: "2016-09-01T23:59:59.9-04:00"
        },
        {
            ID: "ebe7a449-477f-ee11-aadc1-e2a3d5bdf50f",
            Procedure: "CORNEAL TOPOGRAPHY",
            Date: "2016-09-01T23:59:59.9-04:00"
        },
        {
            ID: "ebe7a449-477f-ee11f-aac1-e2a3d5bdf50f",
            Procedure: "OPHTHALMIC BIOMETRY BY PARTIAL COHE",
            Date: "2016-09-01T23:59:59.9-04:00"
        },
        {
            ID: "ebe7a449-477f-ees11-aac1-e2a3d5bdf50f",
            Procedure: "4th procedure",
            Date: "2016-09-01T23:59:59.9-04:00"
        }
    ],
    "Patient": {
        "PatientID": "3da17583-7595-42b9-9fa2-5a42958b60aa",
        "PersonID": "22ab3e2c-6dc4-40f5-913d-163cbad9d96c",
        "PatientName": "",
        "RecordAuthority": "CMS Sandbox"
    }
};

export const labReportEvent: EhrNewsFeedEventModel = {
    "Type": "LabReport",
    "Category": "LabReport",
    "ID": "7d13ae69-477f-ee11-aac1-e2a3d5bdf50f",
    "Date": "2021-02-27T08:25:00-05:00",
    "Event": {
        "ID": "7d13ae69-477f-ee11-aac1-e2a3d5bdf50f",
        "ObservationDate": "2021-02-27T08:25:00-05:00",
        "AccessionNumber": "4DB2B1FA",
        "EncounterID": "aa12ae69-477f-ee11-aac1-e2a3d5bdf50f",
        "Comment": "This was performed at the request of Dr. Smith.",
        "LabObservations": [
            {
                "ID": "be13ae69-477f-gee11-aac1-e2a3d5bdf50f",
                "Type": "Cholesterol",
                "Value": "135.0",
                "Acuity": "Normal",
                "NormalRange": "100.0-190.0",
                "AcuityHighlight": "Normal",
                "ObservationDate": "2021-02-27T08:25:00-05:00",
                "ObservationResultStatus": "F",
                "ObservationResultStatusDate": "2017-02-27T08:25:00-05:00",
                "TrendAvailable": false,
                "Comment": "             NCEP RECOMMENDED ADULT GUIDELINES\r\n\r\nTotal Cholesterol:  <200 mg/dL        Desirable\r\n                    200 - 239 mg/dL   Borderline High\r\n                    >240 mg/dL        High\r\n\r\nTriglycerides:      <150 mg/dL        Normal\r\n                    150 - 199 mg/dL   Borderline High\r\n                    200 - 499 mg/dL   High\r\n                    >500 mg/dL        Very High\r\n\r\nHDL-Cholesterol:    <40 mg/dL         Low/Undesirable\r\n                    40 - 60 mg/dL     Normal\r\n                    >60 mg/dL         High/Desirable\r\n                                  (= negative risk for CHD)\r\n\r\nLDL-Cholesterol:    <100 mg/dL        Optimal\r\n                    100 - 129 mg/dL   Near Optimal\r\n                    130 - 159 mg/dL   Borderline High\r\n                    160 - 189 mg/dL   High\r\n                    >190 mg/dL        Very High\r\nPatient's individual LDL-cholesterol goal may differ based\r\non the presence of risk factors for cardiovascular disease.\r\n",
                "TypeDefinition": "<p>Cholesterol is a waxy, fat-like substance that occurs naturally in all parts of the body. Your body needs some cholesterol to work properly. But if you have too much in your blood, it can combine with other substances in the blood and stick to the walls of your arteries. This is called plaque. Plaque can narrow your arteries or even block them.</p>\n\n<p>High levels of cholesterol in the blood can increase your risk of <a name=\"noreveal\" href='https://medlineplus.gov/heartdiseases.html' target=\"_blank\">heart disease</a>. Your cholesterol levels tend to rise as you get older. There are usually no signs or symptoms that you have high blood cholesterol, but it can be detected with a blood test. You are likely to have high cholesterol if members of your family have it, if you are overweight or if you eat a lot of fatty foods.</p>\n\n<p>You can lower your cholesterol by exercising more and eating more fruits and vegetables. You also may need to take medicine to lower your cholesterol.</p>\n\n<p class=\"attribution\">NIH: National Heart, Lung, and Blood Institute</p><p><a href='https://medlineplus.gov/cholesterol.html' target='_blank'>Click here for more information from MedlinePlus.gov.</a></p>"
            },
            {
                "ID": "bf13ae69-477f-see11-aac1-e2a3d5bdf50f",
                "Type": "HDL",
                "Value": "45.0",
                "Acuity": "Normal",
                "NormalRange": "40.0-59.0",
                "AcuityHighlight": "Normal",
                "ObservationDate": "2021-02-27T08:25:00-05:00",
                "ObservationResultStatus": "F",
                "ObservationResultStatusDate": "2017-02-27T08:25:00-05:00",
                "TrendAvailable": false,
                "TypeDefinition": "<p>Cholesterol is a waxy, fat-like substance that occurs naturally in all parts of the body. Your body needs some cholesterol to work properly. But if you have too much in your blood, it can combine with other substances in the blood and stick to the walls of your arteries. This is called plaque. Plaque can narrow your arteries or even block them.</p>\n\n<p>High levels of cholesterol in the blood can increase your risk of <a name=\"noreveal\" href='https://medlineplus.gov/heartdiseases.html' target=\"_blank\">heart disease</a>. Your cholesterol levels tend to rise as you get older. There are usually no signs or symptoms that you have high blood cholesterol, but it can be detected with a blood test. You are likely to have high cholesterol if members of your family have it, if you are overweight or if you eat a lot of fatty foods.</p>\n\n<p>You can lower your cholesterol by exercising more and eating more fruits and vegetables. You also may need to take medicine to lower your cholesterol.</p>\n\n<p class=\"attribution\">NIH: National Heart, Lung, and Blood Institute</p><p><a href='https://medlineplus.gov/cholesterol.html' target='_blank'>Click here for more information from MedlinePlus.gov.</a></p>"
            },
            {
                "ID": "c013ae69s-477f-ee11-aac1-e2a3d5bdf50f",
                "Type": "LDL",
                "Value": "152.0",
                "Acuity": "High",
                "NormalRange": "100.0-129.0",
                "AcuityHighlight": "High",
                "ObservationDate": "2021-02-27T08:25:00-05:00",
                "ObservationResultStatus": "F",
                "ObservationResultStatusDate": "2017-02-27T08:25:00-05:00",
                "TrendAvailable": false,
                "TypeDefinition": "<p>Cholesterol is a waxy, fat-like substance that occurs naturally in all parts of the body. Your body needs some cholesterol to work properly. But if you have too much in your blood, it can combine with other substances in the blood and stick to the walls of your arteries. This is called plaque. Plaque can narrow your arteries or even block them.</p>\n\n<p>High levels of cholesterol in the blood can increase your risk of <a name=\"noreveal\" href='https://medlineplus.gov/heartdiseases.html' target=\"_blank\">heart disease</a>. Your cholesterol levels tend to rise as you get older. There are usually no signs or symptoms that you have high blood cholesterol, but it can be detected with a blood test. You are likely to have high cholesterol if members of your family have it, if you are overweight or if you eat a lot of fatty foods.</p>\n\n<p>You can lower your cholesterol by exercising more and eating more fruits and vegetables. You also may need to take medicine to lower your cholesterol.</p>\n\n<p class=\"attribution\">NIH: National Heart, Lung, and Blood Institute</p><p><a href='https://medlineplus.gov/cholesterol.html' target='_blank'>Click here for more information from MedlinePlus.gov.</a></p>"
            }
        ],
        "ReportStatusDate": "2021-02-27T08:25:00-05:00",
        "ReportStatus": "Final",
        "Service": "VWP"
    },
    "Patient": {
        "PatientID": "4992c866-84e8-4be2-9f0a-5517f08d363e",
        "PersonID": "22ab3e2c-6dc4-40f5-913d-163cbad9d96c",
        "PatientName": "",
        "RecordAuthority": "CareEvolution FHIR"
    }
};

export const reportEvent: EhrNewsFeedEventModel = {
    "Type": "Report",
    "Category": "Report",
    "ID": "81b38143-41fe-ed11-aabb-e477137a3627",
    "Date": "2019-04-15T16:30:00+00:00",
    "Event": {
        "ID": "81b38143-41fe-ed11-aabb-e477137a3627",
        "Type": "Subsequent evaluation note",
        "Format": "Html",
        "DictatedByCaregiver": {
            "ID": "13e57a9f-fdb2-ed11-aab7-f9d10f0779ca",
            "CaregiverName": "Gianchandani, Roma Y",
            "Specialty": "",
            "Addresses": [],
            "ContactInfos": [],
            "Pcp": false
        },
        "Content": "<div class=\"fmtConv\" style=\"orphans: 1; widows: 1; line-height: normal; font-family: Arial;\">\r\n<div style=\"text-align: left; max-width: 100%; \"><span style=\"font-size: 11pt; font-family: Arial, monospace; color: #000000; \">This is a test of dictating later this is a test of dictating later this is a test of dictating later</span></div>\r\n<div style=\"text-align: left; max-width: 100%; \"><span style=\"font-size: 11pt; font-family: Arial, monospace; color: #000000; \">&nbsp;</span></div>\r\n<div style=\"text-align: left; max-width: 100%; \"><span style=\"font-size: 11pt; font-family: Arial, sans-serif; color: #000000; \">No results found for: HGBA1C</span><span style=\"font-size: 11pt; font-family: Arial, monospace; color: #000000; white-space: pre-wrap; \"> </span></div>\r\n<div style=\"text-align: left; max-width: 100%; \"><span style=\"font-size: 11pt; font-family: Arial, monospace; color: #000000; \">.uma</span></div>\r\n<div style=\"text-align: left; max-width: 100%; \"><span style=\"font-size: 11pt; font-family: Arial, monospace; color: #000000; \">&nbsp;</span></div>\r\n<div style=\"text-align: left; max-width: 100%; \"><span style=\"font-size: 11pt; font-family: Arial, monospace; color: #000000; \">&nbsp;</span></div></div>",
        "Location": "CSMG Internal Medicine"
    },
    "Patient": {
        "PatientID": "b990b7f0-a3ba-46d8-890d-ca18384a35e0",
        "PersonID": "22ab3e2c-6dc4-40f5-913d-163cbad9d96c",
        "PatientName": "",
        "RecordAuthority": "Cedars-Sinai Health System"
    }
};

export const immunizationEvent: EhrNewsFeedEventModel = {
    "Type": "Immunization",
    "Category": "Immunization",
    "ID": "2eb48143-41fe-ed11-aabb-e477137a3627",
    "Date": "2020-12-16T00:00:00-05:00",
    "Event": {
        "ID": "2eb48143-41fe-ed11-aabb-e477137a3627",
        "Date": "2020-12-16T00:00:00-05:00",
        "MedicationName": "COVID-19, MRNA, PFIZER, PRESERVATIVE FREE"
    },
    "Patient": {
        "PatientID": "b990b7f0-a3ba-46d8-890d-ca18384a35e0",
        "PersonID": "22ab3e2c-6dc4-40f5-913d-163cbad9d96c",
        "PatientName": "",
        "RecordAuthority": "Cedars-Sinai Health System"
    }
}

export const noTitleImmunizationEvent: EhrNewsFeedEventModel = {
    "Type": "Immunization",
    "Category": "Immunization",
    "ID": "2eb48143-41fe-ed11-aabb-e477137a3627",
    "Date": "2020-12-16T00:00:00-05:00",
    "Event": {
        "ID": "2eb48143-41fe-ed11-aabb-e477137a3627",
        "Date": "2020-12-11T00:00:00-05:00"
    },
    "Patient": {
        "PatientID": "b990b7f0-a3ba-46d8-890d-ca18384a35e0",
        "PersonID": "22ab3e2c-6dc4-40f5-913d-163cbad9d96c",
        "PatientName": "",
        "RecordAuthority": "Cedars-Sinai Health System"
    }
}

export const previewFeed: EhrNewsFeedEventModel[] = [
    procedureGroupEvent,
    claimServiceGroupEvent,
    claimProcedureGroupEvent,
    labReportEvent,
    reportEvent,
    immunizationEvent,
    noTitleImmunizationEvent
];