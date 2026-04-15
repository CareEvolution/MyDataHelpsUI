import React, { Ref, RefObject, useEffect, useState } from 'react';
import { Button } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { buildHtmlReport, language, previewHtmlReport } from '../../../helpers';
import { faDownload, faRefresh } from '@fortawesome/free-solid-svg-icons';
import './EhrDownloadButton.css';
import renderPdf from '../../../helpers/renderPdf';
import MyDataHelps, { Guid } from '@careevolution/mydatahelps-js';
import { ButtonVariant } from '../../presentational/Button/Button';

const fileNameOverrides: Partial<Record<string, string>> = {
    ClaimProcedureGroup: 'Procedures',
    ClaimServiceGroup: 'Procedures',
    Immunization: 'Immunizations',
    LabReport: 'LabReports',
    ProcedureGroup: 'Procedures',
    Report: 'Reports'
};

export interface EhrDownloadButtonProps {
    preview?: boolean;
    variant?: ButtonVariant;
    styleElements?: HTMLStyleElement[];
    reportHtml?: string;
    reportRef?: RefObject<HTMLElement>;
    fileName: string;
    hidden?: boolean;
    prepareForDownload?: () => Promise<void>;
    innerRef?: Ref<HTMLDivElement>;
}

export default function EhrDownloadButton(props: EhrDownloadButtonProps) {
    const [participantID, setParticipantID] = useState<Guid>();
    const [buildingReport, setBuildingReport] = useState<boolean>(false);

    useEffect(() => {
        if (props.preview) {
            setParticipantID('00000000-0000-0000-0000-000000000000');
            return;
        }
        MyDataHelps.getParticipantInfo().then(participantInfo => {
            setParticipantID(participantInfo.participantID);
        });
    }, []);

    const buildReport = async (): Promise<void> => {
        if ((!props.reportHtml && !props.reportRef?.current) || !participantID) return;

        setBuildingReport(true);
        if (props.prepareForDownload) {
            await props.prepareForDownload();
        }

        const styleElements = props.styleElements ?? Array.from(document.head.getElementsByTagName('style'));
        const classesToHide = ['.mdhui-ehr-download-button', '.mdhui-term-information-button', '.mdhui-action .indicator', '.mdhui-news-feed-search-bar'];
        const additionalCssRules = [`${classesToHide.join(', ')} { display: none; }`, 'html, body { height: unset; }'];
        const reportHtml = props.reportHtml ?? props.reportRef?.current?.innerHTML ?? '';

        const htmlReport = buildHtmlReport(styleElements, additionalCssRules, reportHtml);

        const fileName = fileNameOverrides[props.fileName] ?? props.fileName;
        if (props.preview) {
            previewHtmlReport(window, htmlReport, fileName);
        } else {
            await renderPdf(htmlReport, participantID, { fileName, pageNumbers: true });
        }
        setBuildingReport(false);
    };

    return <div className="mdhui-ehr-download-button" ref={props.innerRef}>
        {(props.reportHtml || props.reportRef?.current) && participantID && !props.hidden &&
            <Button
                variant={props.variant ?? 'subtle'}
                disabled={buildingReport}
                onClick={buildReport}
                fullWidth={false}
            >
                {language('download')} <FontAwesomeSvgIcon icon={buildingReport ? faRefresh : faDownload} spin={buildingReport} />
            </Button>
        }
    </div>;

}