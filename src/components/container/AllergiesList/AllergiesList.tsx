import React, { useState } from "react"
import { TermInformationReference } from "../TermInformation/TermInformation";
import MyDataHelps from "@careevolution/mydatahelps-js"
import { useMyDataHelps } from "../../../helpers/useMyDataHelps"
import { Action, LoadingIndicator, UnstyledButton } from "../../presentational"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"
import language from "../../../helpers/language";
import { downloadAndStoreFHIRData, getAllergies } from "../../../helpers/fhir";

export interface AllergiesListProps {
    previewState?: "default"
    onViewTermInfo(termInfo: TermInformationReference): void
    innerRef?: React.Ref<HTMLDivElement>
}

interface Allergy {
    Substance: string;
    TermInformation?: TermInformationReference;
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

        MyDataHelps.getParticipantInfo().then(function (participantInfo) {
            //getPersonID(participantInfo.participantID).then(function (personID) {
                downloadAndStoreFHIRData().then(function (response) {
                });
            //});
        });

    }

    useMyDataHelps(load, ["externalAccountSyncComplete", "applicationDidBecomeVisible"]);

    return <div ref={props.innerRef}>
        {!allergies &&
            <LoadingIndicator />
        }
        {allergies && allergies.map(c =>
            <Action key={c.Substance}
                subtitle={c.Reactions.length > 0 ? `${language('allergylist-reactions')}: ${c.Reactions.join(", ")}` : undefined}
                renderAs="div"
                bottomBorder
                title={c.Substance} indicator={
                    c.TermInformation ? <UnstyledButton onClick={() => props.onViewTermInfo(c.TermInformation!)}><FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} /></UnstyledButton> : <></>
                } />
        )}
    </div>
}

