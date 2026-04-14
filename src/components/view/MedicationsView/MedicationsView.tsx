import React, { useRef, useState } from "react";
import { Card, Layout, MedicationsList, NavigationBar, Title } from "../..";
import { EhrDownloadButton, TermInformationReference } from "../../container";
import medicationIcon from "../../../assets/icon-medication.svg";
import { language } from "../../../helpers";

export interface MedicationsViewProps {
    presentation?: "Push" | "Modal";
    previewState?: "default";
    onViewTermInfo?: (termInfo: TermInformationReference) => void;
    colorScheme?: "auto" | "light" | "dark";
}

/**
 * This view shows a listing of medications pulled from the connected Providers and Health Plans.
 */
export default function MedicationsView(props: MedicationsViewProps) {
    const [loading, setLoading] = useState<boolean>(true);

    const reportRef = useRef<HTMLDivElement>(null);

    return <Layout colorScheme={props.colorScheme}>
        <NavigationBar showBackButton={props.presentation == "Push"} showCloseButton={props.presentation == "Modal"} />
        <div ref={reportRef}>
            <Title
                order={2}
                autosizeImage
                image={<img src={medicationIcon} alt="medication icon" />}
                imageAlignment="left"
                accessory={<EhrDownloadButton preview={!!props.previewState} concept="Medications" reportRef={reportRef} hidden={loading} />}
                defaultMargin
            >
                {language("medications-title")}
            </Title>
            <Card>
                <MedicationsList previewState={props.previewState} onLoadComplete={() => setLoading(false)} onViewTermInfo={props.onViewTermInfo} />
            </Card>
        </div>
    </Layout>;
}