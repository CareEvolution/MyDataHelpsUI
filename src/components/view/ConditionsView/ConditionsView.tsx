import React, { useRef, useState } from 'react';
import { Card, ConditionsList, Layout, NavigationBar, Title } from "../..";
import { EhrDownloadButton, TermInformationReference } from "../../container";
import conditionIcon from "../../../assets/icon-problem.svg";
import { language } from '../../../helpers';

export interface ConditionsViewProps {
    presentation?: "Push" | "Modal";
    previewState?: "default";
    onViewTermInfo?: (termInfo: TermInformationReference) => void;
    colorScheme?: "auto" | "light" | "dark";
}

/**
 * This view shows a listing of conditions pulled from the connected Providers and Health Plans.
 */
export default function ConditionsView(props: ConditionsViewProps) {
    const [loading, setLoading] = useState<boolean>(true);

    const reportRef = useRef<HTMLDivElement>(null);

    return <Layout colorScheme={props.colorScheme}>
        <NavigationBar showBackButton={props.presentation == "Push"} showCloseButton={props.presentation == "Modal"} />
        <div ref={reportRef}>
            <Title
                order={2}
                autosizeImage
                image={<img src={conditionIcon} alt="condition icon" />}
                imageAlignment="left"
                accessory={<EhrDownloadButton preview={!!props.previewState} fileName="Conditions" reportRef={reportRef} hidden={loading} />}
                defaultMargin
            >
                {language("conditions-title")}
            </Title>
            <Card>
                <ConditionsList previewState={props.previewState} onLoadComplete={() => setLoading(false)} onViewTermInfo={props.onViewTermInfo} />
            </Card>
        </div>
    </Layout>;
}