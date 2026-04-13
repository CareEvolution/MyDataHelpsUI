import React, { useEffect, useRef, useState } from 'react';
import { Card, Layout, MedicationsList, NavigationBar, Title } from "../..";
import MyDataHelps, { Guid } from '@careevolution/mydatahelps-js';
import medicationIcon from "../../../assets/icon-medication.svg";
import language from '../../../helpers/language';
import { TermInformationReference } from "../../container";
import EhrDownloadButton from '../../container/EhrDownloadButton/EhrDownloadButton';
import renderPdf from '../../../helpers/renderPdf';
import { buildHtmlReport, previewHtmlReport } from '../../../helpers/html-report';

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
    const [participantID, setParticipantID] = useState<Guid>();
    const [buildingReport, setBuildingReport] = useState<boolean>(false);

    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.previewState) {
            setParticipantID("00000000-0000-0000-0000-000000000000");
            setLoading(false);
            return;
        }
        MyDataHelps.getParticipantInfo().then(participantInfo => {
            setParticipantID(participantInfo.participantID);
            setLoading(false);
        });
    }, []);

    const buildReport = async (): Promise<void> => {
        if (!reportRef.current || !participantID) return;
        setBuildingReport(true);
        const html = buildHtmlReport(document, reportRef.current, ['.mdhui-ehr-download-button, .mdhui-term-information-button { display: none; }']);
        if (props.previewState) {
            previewHtmlReport(window, document, html);
        } else {
            await renderPdf(html, participantID);
        }
        setBuildingReport(false);
    };

    const viewTermInfo = (termInfo: TermInformationReference): void => {
        if (props.onViewTermInfo) {
            props.onViewTermInfo(termInfo);
            return;
        }
        const queryString = new URLSearchParams({
            termFamily: termInfo.TermFamily,
            termNamespace: termInfo.TermNamespace,
            termCode: termInfo.TermCode,
            presentation: 'Modal',
            lang: MyDataHelps.getCurrentLanguage()
        }).toString();
        MyDataHelps.openApplication('https://viewbuilder.careevolutionapps.com/library-views/hw/term-information?' + queryString, { modal: true });
    };

    return <Layout colorScheme={props.colorScheme}>
        <NavigationBar showBackButton={props.presentation == "Push"} showCloseButton={props.presentation == "Modal"} />
        <div ref={reportRef}>
            <Title
                order={2}
                autosizeImage
                image={<img src={medicationIcon} alt="medication icon" />}
                imageAlignment="left"
                accessory={<EhrDownloadButton concept="Medications" disabled={loading || buildingReport} onClick={buildReport} />}
                defaultMargin
            >
                {language("medications-title")}
            </Title>
            <Card>
                <MedicationsList previewState={props.previewState} onViewTermInfo={viewTermInfo} />
            </Card>
        </div>
    </Layout>;
}