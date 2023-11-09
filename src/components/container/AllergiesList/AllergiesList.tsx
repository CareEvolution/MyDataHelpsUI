import React, { useState } from "react"
import { TermInformation } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline"
import MyDataHelps from "@careevolution/mydatahelps-js"
import { useMyDataHelps } from "../../../helpers/useMyDataHelps"
import { Action, LoadingIndicator, UnstyledButton } from "../../presentational"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"

export interface AllergiesListProps {
    previewState?: "default"
    onViewTermInfo(termInfo: TermInformation): void
    innerRef?: React.Ref<HTMLDivElement>
}

interface Allergy {
    Substance: string;
    TermInformation?: TermInformation;
    Reactions: string[];
}

export default function (props: AllergiesListProps) {
    const [allergies, setAllergies] = useState<Allergy[] | null>(null);

    function load() {
        if (props.previewState == "default") {
            setAllergies([
                {
                    "Substance": "COVID-19 VACCINE, MRNA, BNT162B2, LNP-S (PFIZER)",
                    "Reactions": [
                        "Anaphylaxis"
                    ],
                    "TermInformation": {
                        TermCode: "195967001",
                        TermNamespace: "SNOMED",
                        TermFamily: "Problem"
                    }
                },
                {
                    "Substance": "EGGS",
                    "Reactions": [
                        "Coughing", "Rash"
                    ]
                },
                {
                    "Substance": "IBUPROFEN",
                    "Reactions": []
                }]);
            return;
        }

        MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Allergies", "GET", "", true).then(function (response) {
            setAllergies(response);
        });
    }

    useMyDataHelps(load, ["externalAccountSyncComplete", "applicationDidBecomeVisible"]);

    return <div ref={props.innerRef}>
        {!allergies &&
            <LoadingIndicator />
        }
        {allergies && allergies.map(c =>
            <Action key={c.Substance}
                subtitle={c.Reactions.length > 0 ? `Reactions: ${c.Reactions.join(", ")}` : undefined}
                renderAs="div"
                bottomBorder
                title={c.Substance} indicator={
                    c.TermInformation ? <UnstyledButton onClick={() => props.onViewTermInfo(c.TermInformation!)}><FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} /></UnstyledButton> : <></>
                } />
        )}
    </div>
}