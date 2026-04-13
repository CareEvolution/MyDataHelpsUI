import React, { useEffect, useRef, useState } from 'react';
import { AllergiesList, Card, Layout, NavigationBar, Title } from "../..";
import { TermInformationReference } from "../../container";
import MyDataHelps, { Guid } from '@careevolution/mydatahelps-js';
import allergiesIcon from "../../../assets/icon-allergies.png";
import language from '../../../helpers/language';
import EhrDownloadButton from '../../container/EhrDownloadButton/EhrDownloadButton';
import renderPdf from '../../../helpers/renderPdf';
import { buildHtmlReport, previewHtmlReport } from '../../../helpers/html-report';

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
                image={<img src={allergiesIcon} alt="allergies icon" />}
                imageAlignment="left"
                accessory={<EhrDownloadButton concept="Allergies" disabled={loading || buildingReport} onClick={buildReport} />}
                defaultMargin
            >
                {language("allergies-title")}
            </Title>
            <Card>
                <AllergiesList previewState={props.previewState} onViewTermInfo={(t) => viewTermInfo(t)} />
            </Card>
        </div>
    </Layout>;
}