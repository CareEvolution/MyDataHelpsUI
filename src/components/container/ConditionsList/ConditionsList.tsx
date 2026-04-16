import React, { Ref, useState } from "react";
import { TermInformationReference } from "../TermInformation";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { Action, LoadingIndicator, TermInformationButton } from "../../presentational";
import { previewConditions } from "./ConditionsList.previewData";
import { useInitializeView } from "../../../helpers";

export interface ConditionsListProps {
    previewState?: "default";
    onLoadComplete?: () => void;
    onViewTermInfo?: (termInfo: TermInformationReference) => void;
    innerRef?: Ref<HTMLDivElement>;
}

interface Condition {
    DisplayName: string;
    TermInformation?: TermInformationReference;
}

export default function ConditionsList(props: ConditionsListProps) {
    const [conditions, setConditions] = useState<Condition[]>();

    useInitializeView(async () => {
        if (props.previewState) {
            setConditions(previewConditions);
            props.onLoadComplete?.();
            return;
        }
        const conditions = await MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Conditions", "GET", "", true) as Condition[];
        setConditions(conditions);
        props.onLoadComplete?.();
    }, ["externalAccountSyncComplete"]);

    return <div ref={props.innerRef}>
        {!conditions && <LoadingIndicator />}
        {conditions?.map(condition =>
            <Action
                key={condition.DisplayName}
                title={condition.DisplayName}
                indicator={<TermInformationButton termInformation={condition.TermInformation} onViewTermInfo={props.onViewTermInfo} />}
                renderAs="div"
                bottomBorder
            />
        )}
    </div>;
}