import MyDataHelps from "@careevolution/mydatahelps-js";
import React, { useEffect, useState } from "react";
import { Action, LoadingIndicator } from "../../presentational";
import "../HealthPreviewSection/HealthPreviewSection.css"
import language from "../../../helpers/language";
import { bloodTypeLabs, singleLabs, manyLabs } from "./LabResultsBloodType.previewdata";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import iconBloodType from "./icon-bloodtype.svg";

export interface LabResultsBloodTypeProps {
    previewState?: "BloodTypeLabs" | "SingleLabs" | "ManyLabs" | "NoData"
    showDetailedResults?: true | false
    maximumResults?: number
    onClick?: () => void
    innerRef?: React.Ref<HTMLDivElement>
}

interface BloodTypeLab {
    Type: string,
    MostRecentValue: string,
    MostRecentDate: string,
}

interface LabResultBloodTypeData {
    ImportantLabs?: any[],
    RecentLabs?: any[],
    BloodTypeLabs?: BloodTypeLab[],
}

export default function (props: LabResultsBloodTypeProps) {
    const [model, setModel] = useState<LabResultBloodTypeData | null>(null);

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
                BloodTypeLabs: []
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
        return <div ref={props.innerRef} className="mdhui-health-preview-section"><LoadingIndicator /></div>
    }

    if (model && (!model.BloodTypeLabs || model.BloodTypeLabs.length == 0)) {
        return null;
    }

    // support any onClick function, or default to an english/spanish link
    function drilldown() {
        if (props.onClick) {
            props.onClick();
            return;
        }
        var linkTarget: string;
        linkTarget = "https://medlineplus.gov/ency/article/003345.htm";
        if (MyDataHelps.language === "es") linkTarget = "https://medlineplus.gov/spanish/ency/article/003345.htm";
        MyDataHelps.openEmbeddedUrl(linkTarget);
    }

    // Sometimes the data will only have either the ABO type or the rH factor
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

    return <div ref={props.innerRef} >
        <Action
        bottomBorder
        title={ language ("blood-type") }
        titleIcon={<img className="mdhui-health-preview-icon" src={ iconBloodType } alt="Blood Type" />}
        onClick={ model ? drilldown: undefined }
        indicatorIcon={ faInfoCircle }
        indicatorPosition= "topRight" 
        className="mdhui-health-preview-section">
        {!model &&
            <LoadingIndicator />
        }
        {model && props.showDetailedResults &&
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
        {model && !props.showDetailedResults &&
            <>
                {model.BloodTypeLabs && model.BloodTypeLabs.length &&
                    <div>
                        <div className="mdhui-health-preview-item">{summaryResults(model.BloodTypeLabs)}</div>
                    </div>
                }
            </>
        }
        </Action>
    </div>
}