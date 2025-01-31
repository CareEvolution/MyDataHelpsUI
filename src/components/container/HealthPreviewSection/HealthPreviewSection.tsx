import MyDataHelps from "@careevolution/mydatahelps-js";
import React, { useEffect, useState } from "react";
import language from "../../../helpers/language";
import { LoadingIndicator } from "../../presentational";
import Action from "../../presentational/Action";
import allergiesIcon from "../../../assets/icon-allergies.png";
import medicationIcon from "../../../assets/icon-medication.svg";
import reportIcon from "../../../assets/icon-report.svg";
import problemIcon from "../../../assets/icon-problem.svg";
import procedureIcon from "../../../assets/icon-procedure.svg";
import immunizationIcon from "../../../assets/icon-immunization.svg";
import "./HealthPreviewSection.css"
import getHealthPreviewSectionData from "./HealthPreviewSection.previewdata";

export type HealthPreviewSectionConcept = "Medications" | "Immunizations" | "Reports" | "Allergies" | "Conditions" | "Procedures";

export interface HealthPreviewSectionProps {
    concept: HealthPreviewSectionConcept;
    onClick(): void;
    previewState?: "NoData" | "Default";
    indicatorPosition?: "default" | "topRight";
    innerRef?: React.Ref<HTMLDivElement>
}

/**
 * Display a preview of EHR data for one of the following concepts: Medications, Immunizations, Reports, Allergies, Conditions, Procedures
 * A connection to your EHR provider is required to display the data.
 * Supports an onClick event for customizing when clicking on the arrow indicator
 */
export default function HealthPreviewSection(props: HealthPreviewSectionProps) {
    const [model, setModel] = useState<any>();

    function loadData() {
        if (props.previewState == "NoData") {
            setModel({
                "PreviewValues": [],
                "Count": 0
            });
            return;
        }

        if (props.previewState == "Default") {
            setModel(getHealthPreviewSectionData(props.concept));
            return;
        }

        var queryString = new URLSearchParams({ View: props.concept }).toString();
        var endpoint = 'HealthAndWellnessApi.PatientEventsPreview';
        return MyDataHelps.invokeCustomApi(endpoint, 'GET', queryString, true)
            .then(function (response) {
                setModel(response);
            });
    }

    useEffect(() => {
        loadData();
        MyDataHelps.on("externalAccountSyncComplete", loadData);
        MyDataHelps.on("applicationDidBecomeVisible", loadData);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", loadData);
            MyDataHelps.off("applicationDidBecomeVisible", loadData);
        }
    }, [props.concept]);

    function getIconUrl() {
        switch (props.concept) {
            case "Medications":
                return medicationIcon;
            case "Immunizations":
                return immunizationIcon;
            case "Reports":
                return reportIcon;
            case "Allergies":
                return allergiesIcon;
            case "Conditions":
                return problemIcon;
            case "Procedures":
                return procedureIcon;
        }
    }

    function getTitle() {
        switch (props.concept) {
            case "Medications":
                return language("medications-title");
            case "Immunizations":
                return language("immunizations-title");
            case "Reports":
                return language("reports-title");
            case "Allergies":
                return language("allergies-title");
            case "Conditions":
                return language("conditions-title");
            case "Procedures":
                return language("procedures-title");
        }
    }

    if (!model) {
        return <div ref={props.innerRef} className="mdhui-health-preview-section"><LoadingIndicator /></div>
    }

    if (!model.PreviewValues.length) {
        return null;
    }

    return <div ref={props.innerRef}>
        <Action className="mdhui-health-preview-section" indicatorPosition={props.indicatorPosition} bottomBorder indicatorValue={model.Count} title={getTitle()} titleIcon={<img className="mdhui-health-preview-icon" src={getIconUrl()} />} onClick={() => props.onClick() ?? {}}>
            <div>
                {model.PreviewValues.map((item: any) => <div key={item} className="mdhui-health-preview-item">{item}</div>)}
            </div>
        </Action>
    </div>
}