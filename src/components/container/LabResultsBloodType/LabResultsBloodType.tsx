import MyDataHelps from "@careevolution/mydatahelps-js";
import React, { useEffect, useState } from "react";
import { Action, LoadingIndicator } from "../../presentational";
import "./LabResultsBloodType.css";
import "../HealthPreviewSection/HealthPreviewSection.css"
import language from "../../../helpers/language";
import { bloodTypeLabs, singleLabs, manyLabs } from "./LabResultsBloodType.previewdata";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import iconBloodType from "./icon-bloodtype.svg";

export interface LabResultsBloodTypeProps {
    previewState?: "BloodTypeLabs" | "SingleLabs" | "ManyLabs" | "NoData"
    summaryResultsOnly?: true | false
    maximumResults?: number
    onClick?: any
    externalInfoLink?: true | false
    externalInfoLinkDefault?: string
    externalInfoLinkSpanish?: string
}

export default function (props: LabResultsBloodTypeProps) {
    const [model, setModel] = useState<any>(null);

    function getLabResultsSummary() {
        if (props.previewState == "BloodTypeLabs") {
            setModel(bloodTypeLabs);
            return;
        }
        if (props.previewState == "SingleLabs") {
            setModel(singleLabs);
            return;
        }
        if (props.previewState == "ManyLabs") {
            setModel(manyLabs);
            return;
        }
        if (props.previewState == "NoData") {
            setModel({
                bloodTypeLabs: []
            });
            return;
        }

        var endpoint = 'HealthAndWellnessApi.LabResultsBloodType';
        return MyDataHelps.invokeCustomApi(endpoint, 'GET', "", true)
            .then(function (response) {
                setModel(response);
            });
    }

    useEffect(() => {
        getLabResultsSummary();

        MyDataHelps.on("externalAccountSyncComplete", getLabResultsSummary);
        MyDataHelps.on("applicationDidBecomeVisible", getLabResultsSummary);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", getLabResultsSummary);
            MyDataHelps.off("applicationDidBecomeVisible", getLabResultsSummary);
        }
    }, []);

    if (!model) {
        return <div className="mdhui-health-preview-section"><LoadingIndicator /></div>
    }

    if (model && (!model.BloodTypeLabs || model.BloodTypeLabs.length == 0)) {
        return null;
    }

    // support any onClick function, or default to an english/spanish link
    function drilldown() {
        var linkTarget: string;
        if (!model) { return; }
        if (props.onClick) {
            props.onClick();
            return;
        }
        if (!props.externalInfoLink) { return; }
        if (!props.externalInfoLinkDefault) { return; }
        linkTarget = props.externalInfoLinkDefault;
        if (MyDataHelps.language == "es" && props.externalInfoLinkSpanish) linkTarget = props.externalInfoLinkSpanish;
        MyDataHelps.openEmbeddedUrl(linkTarget);
    }

    // Sometimes the data will only have either the type or the rH factor
    // Combine those into a unified value, if the first value doesn't contain both
    var summaryResults = function(bloodTypeLabs: any) {
        var type = "";
        var rH = "";
        for (const bloodTypeLab of bloodTypeLabs) {
            if (!bloodTypeLab?.MostRecentValue) continue;
            var mostRecentValue = bloodTypeLab.MostRecentValue.toString().toLowerCase();
            if (type == "") {
                if (mostRecentValue == "a" || mostRecentValue.startsWith("a ")) {
                    type = "A";
                } else if (mostRecentValue == "ab" || mostRecentValue.startsWith("ab ")) {
                    type = "AB";
                } else if (mostRecentValue == "b" || mostRecentValue.startsWith("b ")) {
                    type = "B";
                } else if (mostRecentValue == "o" || mostRecentValue.startsWith("o ")) {
                    type = "O";
                }
            }
            if (rH == "") {
                if (mostRecentValue.includes("pos")) {
                    rH = "Positive";
                } else if (mostRecentValue.includes("neg")) {
                    rH = "Negative";
                }
            }
        }
        return type + " " + rH;
    }

    return <Action
        bottomBorder
        title={ language ("blood-type") }
        titleIcon={<img className="mdhui-health-preview-icon" src={ iconBloodType} alt="Blood Type" />}
        onClick={ drilldown }
        indicatorIcon={ faInfoCircle }
        indicatorPosition= "topRight" 
        className="mdhui-lab-results-summary mdhui-health-preview-section">
        {!model &&
            <LoadingIndicator />
        }
        {model && !props.summaryResultsOnly &&
            <>
                {model.BloodTypeLabs && model.BloodTypeLabs.length &&
                    <div>
                        {model.BloodTypeLabs.slice(0, props.maximumResults ? props.maximumResults : model.BloodTypeLabs.length).map((item: any) => 
                            <div key={item.Type} className="mdhui-health-preview-item">{item.Type}: <b>{item.MostRecentValue}</b> ({item.MostRecentDate.substring(0,10)})</div>
                            )}
                    </div>
                }
            </>
        }
        {model && props.summaryResultsOnly &&
            <>
                {model.BloodTypeLabs && model.BloodTypeLabs.length &&
                    <div>
                        <div className="mdhui-health-preview-item">{summaryResults(model.BloodTypeLabs)}</div>
                    </div>
                }
            </>
        }
    </Action>
}