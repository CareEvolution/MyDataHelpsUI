import React, { Ref, useState } from "react";
import { TermInformationReference } from "../TermInformation";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { Action, LoadingIndicator, TermInformationButton } from "../../presentational";
import { previewAllergies } from "./AllergiesList.previewData";
import { language, useInitializeView } from "../../../helpers";

export interface AllergiesListProps {
    previewState?: "default";
    onLoadComplete?: () => void;
    onViewTermInfo?: (termInfo: TermInformationReference) => void;
    innerRef?: Ref<HTMLDivElement>;
}

interface Allergy {
    Substance: string;
    TermInformation?: TermInformationReference;
    Reactions: string[];
}

export default function AllergiesList(props: AllergiesListProps) {
    const [allergies, setAllergies] = useState<Allergy[]>();

    useInitializeView(async () => {
        if (props.previewState) {
            setAllergies(previewAllergies);
            props.onLoadComplete?.();
            return;
        }
        const allergies = await MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Allergies", "GET", "", true) as Allergy[];
        setAllergies(allergies);
        props.onLoadComplete?.();
    }, ["externalAccountSyncComplete"]);

    return <div ref={props.innerRef}>
        {!allergies && <LoadingIndicator />}
        {allergies?.map(allergy =>
            <Action
                key={allergy.Substance}
                title={allergy.Substance}
                subtitle={allergy.Reactions.length > 0 ? `${language("allergylist-reactions")}: ${allergy.Reactions.join(", ")}` : undefined}
                indicator={<TermInformationButton termInformation={allergy.TermInformation} onViewTermInfo={props.onViewTermInfo} />}
                renderAs="div"
                bottomBorder
            />
        )}
    </div>;
}