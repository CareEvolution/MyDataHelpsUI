import React, { useState } from "react";
import { TermInformationReference } from "../TermInformation";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { Action, LoadingIndicator, TermInformationButton } from "../../presentational";
import { previewMedications } from './MedicationsList.previewData';
import { useInitializeView } from '../../../helpers';

export interface MedicationsListProps {
    previewState?: "default";
    onLoadComplete?: () => void;
    onViewTermInfo?: (termInfo: TermInformationReference) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

interface Medication {
    DisplayName: string;
    OrderText?: string;
    TermInformation?: TermInformationReference;
}

export default function MedicationsList(props: MedicationsListProps) {
    const [medications, setMedications] = useState<Medication[]>();

    useInitializeView(async () => {
        if (props.previewState == "default") {
            setMedications(previewMedications);
            props.onLoadComplete?.();
            return;
        }
        const medications = await MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Medications", "GET", "", true) as Medication[];
        setMedications(medications);
        props.onLoadComplete?.();
    }, ["externalAccountSyncComplete"]);

    return <div ref={props.innerRef}>
        {!medications && <LoadingIndicator />}
        {medications?.map(medication =>
            <Action
                key={medication.DisplayName}
                renderAs="div"
                bottomBorder
                title={medication.DisplayName}
                indicator={<TermInformationButton termInformation={medication.TermInformation} onViewTermInfo={props.onViewTermInfo} />}
            />
        )}
    </div>;
}