import React, { useEffect, useState } from "react"
import { TermInformation } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline"
import MyDataHelps from "@careevolution/mydatahelps-js"
import { useMyDataHelps } from "../../../helpers/useMyDataHelps"
import { Action } from "../../presentational"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"

export interface ConditionsListProps {
    previewState?: "default"
    onViewTermInfo(termInfo: TermInformation): void
    innerRef?: React.Ref<HTMLDivElement>
}

interface Condition {
    DisplayName: string;
    TermInformation?: TermInformation;
}

export default function (props: ConditionsListProps) {
    const [conditions, setConditions] = useState<Condition[]>([]);

    function load() {
        if (props.previewState == "default") {
            setConditions([
                {
                    DisplayName: "Asthma",
                    TermInformation: {
                        TermCode: "195967001",
                        TermNamespace: "SNOMED",
                        TermFamily: "Problem"
                    }
                },
                {
                    DisplayName: "Diabetes"
                },
                {
                    DisplayName: "Influenza"
                },
            ]);
            return;
        }

        MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Conditions", "GET", "", true).then(function (response) {
            setConditions(response);
        });
    }

    useMyDataHelps(load, ["externalAccountSyncComplete", "applicationDidBecomeVisible"]);

    return <>
        {conditions.map(c => <Action title={c.DisplayName} indicator={<FontAwesomeSvgIcon icon={faQuestionCircle} />} >{c.DisplayName}</Action>)}
    </>
}