import MyDataHelps from "@careevolution/mydatahelps-js";
import React, { useEffect, useState } from "react";
import language from "../../../helpers/language";
import { LoadingIndicator } from "../../presentational";
import Action from "../../presentational/Action";
import allergiesIcon from "./icon-allergies.png";
import medicationIcon from "./icon-medication.svg";
import reportIcon from "./icon-report.svg";
import problemIcon from "./icon-problem.svg";
import procedureIcon from "./icon-procedure.svg";
import immunizationIcon from "./icon-immunization.svg";
import "./HealthPreviewSection.css"

export interface HealthPreviewSectionProps {
    concept: "Medications" | "Immunizations" | "Reports" | "Allergies" | "Conditions" | "Procedures";
    onClick(): void
}

export default function (props: HealthPreviewSectionProps) {
    const [model, setModel] = useState<any>();

    function loadData() {
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
    }, []);

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
                return language["medications-title"];
            case "Immunizations":
                return language["immunizations-title"];
            case "Reports":
                return language["reports-title"];
            case "Allergies":
                return language["allergies-title"];
            case "Conditions":
                return language["conditions-title"];
            case "Procedures":
                return language["procedures-title"];
        }
    }

    if (!model) {
        return <div className="mdhui-health-preview-section"><LoadingIndicator /></div>
    }

    return <Action indicatorValue={model.Count} className="mdhui-health-preview-section" title={getTitle()} titleIcon={<img className="mdhui-health-preview-icon" src={getIconUrl()} />} onClick={() => props.onClick()}>
        <div>
            {model.PreviewValues.map((item: any) => <div key={item} className="mdhui-health-preview-item">{item}</div>)}
        </div>
    </Action>
}