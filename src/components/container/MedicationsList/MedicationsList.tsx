import React, { useState } from "react"
import { TermInformation } from "../../presentational/LabResultWithSparkline/LabResultWithSparkline"
import MyDataHelps from "@careevolution/mydatahelps-js"
import { useMyDataHelps } from "../../../helpers/useMyDataHelps"
import { Action, LoadingIndicator, UnstyledButton } from "../../presentational"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"

export interface MedicationsListProps {
    previewState?: "default"
    onViewTermInfo(termInfo: TermInformation): void
    innerRef?: React.Ref<HTMLDivElement>
}

interface Medication {
    DisplayName: string;
    OrderText?: string;
    TermInformation?: TermInformation;
}

export default function (props: MedicationsListProps) {
    const [medications, setMedications] = useState<Medication[] | null>(null);

    function load() {
        if (props.previewState == "default") {
            setMedications([
                {
                    "DisplayName": "Ibuprofen 600 MG Oral Tablet",
                    "OrderText": "Not taking: Reported on 10/31/2022",
                    "TermInformation": {
                        "TermNamespace": "RxNorm",
                        "TermCode": "197806",
                        "TermFamily": "Reference"
                    }
                },
                {
                    "DisplayName": "Metformin hydrochloride 500 MG Oral Tablet",
                    "TermInformation": {
                        "TermNamespace": "RxNorm",
                        "TermCode": "861007",
                        "TermFamily": "Reference"
                    }
                },
                {
                    "DisplayName": "Prevacid",
                    "TermInformation": {
                        "TermNamespace": "RxNorm",
                        "TermCode": "83156",
                        "TermFamily": "Reference"
                    }
                },
            ]);
            return;
        }

        MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Medications", "GET", "", true).then(function (response) {
            setMedications(response);
        });
    }

    useMyDataHelps(load, ["externalAccountSyncComplete", "applicationDidBecomeVisible"]);

    return <div ref={props.innerRef}>
        {!medications &&
            <LoadingIndicator />
        }
        {medications && medications.map(c => <Action key={c.DisplayName} renderAs="div" bottomBorder title={c.DisplayName} indicator={
            c.TermInformation ? <UnstyledButton onClick={() => props.onViewTermInfo(c.TermInformation!)}><FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} /></UnstyledButton> : <></>
        } />)}
    </div>
}