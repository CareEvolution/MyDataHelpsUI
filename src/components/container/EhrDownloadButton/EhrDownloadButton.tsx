import React, { Ref, RefObject, useEffect, useState } from 'react';
import { Button } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { buildHtmlReport, EhrNewsFeedEventType, EhrNewsFeedType, language, previewHtmlReport } from '../../../helpers';
import { faDownload, faRefresh } from '@fortawesome/free-solid-svg-icons';
import './EhrDownloadButton.css';
import renderPdf from '../../../helpers/renderPdf';
import MyDataHelps, { Guid } from '@careevolution/mydatahelps-js';

const fileNameOverrides: Partial<Record<EhrDownloadButtonConcept, string>> = {
    ClaimProcedureGroup: 'Procedures',
    ClaimServiceGroup: 'Procedures',
    Immunization: 'Immunizations',
    LabReport: 'LabReports',
    ProcedureGroup: 'Procedures',
    Report: 'Reports'
};

export type EhrDownloadButtonConcept = 'Allergies' | 'Medications' | 'Conditions' | EhrNewsFeedType | EhrNewsFeedEventType;

export interface EhrDownloadButtonProps {
    preview?: boolean;
    concept: EhrDownloadButtonConcept;
    reportRef: RefObject<HTMLDivElement>;
    hidden?: boolean;
    prepareForDownload?: () => Promise<void>;
    innerRef?: Ref<HTMLDivElement>;
}

export default function EhrDownloadButton(props: EhrDownloadButtonProps) {
    const [participantID, setParticipantID] = useState<Guid>();
    const [buildingReport, setBuildingReport] = useState<boolean>(false);

    useEffect(() => {
        if (props.preview) {
            setParticipantID("00000000-0000-0000-0000-000000000000");
            return;
        }
        MyDataHelps.getParticipantInfo().then(participantInfo => {
            setParticipantID(participantInfo.participantID);
        });
    }, []);

    const buildReport = async (): Promise<void> => {
        if (!props.reportRef.current || !participantID) return;

        setBuildingReport(true);
        if (props.prepareForDownload) {
            await props.prepareForDownload();
        }
        const classesToHide = [
            '.mdhui-ehr-download-button',
            '.mdhui-term-information-button',
            '.mdhui-action .indicator',
            '.mdhui-news-feed-search-bar'
        ];
        const html = buildHtmlReport(document, props.reportRef.current, [`${classesToHide.join(', ')} { display: none; }`]);
        const fileName = fileNameOverrides[props.concept] ?? props.concept;
        if (props.preview) {
            previewHtmlReport(window, document, html, fileName);
        } else {
            await renderPdf(html, participantID, fileName);
        }
        setBuildingReport(false);
    };

    return <div className="mdhui-ehr-download-button" ref={props.innerRef}>
        {participantID && !props.hidden &&
            <Button
                variant="subtle"
                disabled={buildingReport}
                onClick={buildReport}
                fullWidth={false}
            >
                {language('download')} <FontAwesomeSvgIcon icon={buildingReport ? faRefresh : faDownload} spin={buildingReport} />
            </Button>
        }
    </div>;

}