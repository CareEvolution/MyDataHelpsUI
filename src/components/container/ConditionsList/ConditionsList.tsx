import React, { useState } from "react"
import { TermInformation } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline"
import MyDataHelps from "@careevolution/mydatahelps-js"
import { useMyDataHelps } from "../../../helpers/useMyDataHelps"
import { Action, LoadingIndicator, UnstyledButton } from "../../presentational"
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
    const [conditions, setConditions] = useState<Condition[] | null>(null);

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

    return <div ref={props.innerRef}>
        {!conditions &&
            <LoadingIndicator />
        }
        {conditions && conditions.map(c => <Action key={c.DisplayName} renderAs="div" bottomBorder title={c.DisplayName} indicator={
            c.TermInformation ? <UnstyledButton onClick={() => props.onViewTermInfo(c.TermInformation!)}><FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} /></UnstyledButton> : <></>
        } />)}
    </div>
}