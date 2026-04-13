import React, { useRef, useState } from "react";
import { AllergiesList, Card, Layout, NavigationBar, Title } from "../..";
import { EhrDownloadButton, TermInformationReference } from "../../container";
import allergiesIcon from "../../../assets/icon-allergies.png";
import { language } from "../../../helpers";

export interface AllergiesViewProps {
    presentation?: "Push" | "Modal";
    previewState?: "default";
    onViewTermInfo?: (termInfo: TermInformationReference) => void;
    colorScheme?: "auto" | "light" | "dark";
}

/**
 * This view shows a listing of allergies pulled from the connected Providers and Health Plans.
 */
export default function AllergiesView(props: AllergiesViewProps) {
    const [loading, setLoading] = useState<boolean>(true);

    const reportRef = useRef<HTMLDivElement>(null);

    return <Layout colorScheme={props.colorScheme}>
        <NavigationBar showBackButton={props.presentation == "Push"} showCloseButton={props.presentation == "Modal"} />
        <div ref={reportRef}>
            <Title
                order={2}
                autosizeImage
                image={<img src={allergiesIcon} alt="allergies icon" />}
                imageAlignment="left"
                accessory={<EhrDownloadButton preview={!!props.previewState} reportRef={reportRef} fileName="Allergies" hidden={loading} />}
                defaultMargin
            >
                {language("allergies-title")}
            </Title>
            <Card>
                <AllergiesList previewState={props.previewState} onLoadComplete={() => setLoading(false)} onViewTermInfo={props.onViewTermInfo} />
            </Card>
        </div>
    </Layout>;
}