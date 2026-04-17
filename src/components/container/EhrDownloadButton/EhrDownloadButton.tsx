import React, { Ref, RefObject, useEffect, useState } from 'react';
import { Button } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { buildHtmlReport, language, previewHtmlReport } from '../../../helpers';
import { faDownload, faRefresh } from '@fortawesome/free-solid-svg-icons';
import './EhrDownloadButton.css';
import renderPdf from '../../../helpers/renderPdf';
import MyDataHelps, { Guid } from '@careevolution/mydatahelps-js';
import { ButtonVariant } from '../../presentational/Button/Button';

export interface EhrDownloadButtonProps {
    preview?: boolean;
    variant?: ButtonVariant;
    text?: string;
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

    // Syncs live DOM properties back to HTML attributes on a cloned element before serialization.
    // Non-visible checkboxes/radio buttons, hidden inputs, and details elements are synced as they are
    // typically used as collapsible section toggles. Visible inputs are intentionally excluded so that
    // user-modified values do not appear in the exported report.
    const syncCollapsibleState = (source: HTMLElement, target: HTMLElement): void => {
        const query = <T extends HTMLElement>(selector: string) => ({
            live: Array.from(source.querySelectorAll<T>(selector)),
            clone: Array.from(target.querySelectorAll<T>(selector))
        });

        const checkableInputs = query<HTMLInputElement>('input[type="checkbox"], input[type="radio"]');
        checkableInputs.live.forEach((element, index) => {
            const computedStyle = element.ownerDocument.defaultView?.getComputedStyle(element);

            const isDisplayed = element.offsetParent !== null || computedStyle?.position === 'fixed';
            const isVisible = computedStyle?.visibility !== 'hidden';
            if (isDisplayed && isVisible) return;

            if (element.checked) {
                checkableInputs.clone[index].setAttribute('checked', '');
            } else {
                checkableInputs.clone[index].removeAttribute('checked');
            }
        });

        const hiddenInputs = query<HTMLInputElement>('input[type="hidden"]');
        hiddenInputs.live.forEach((element, index) => {
            hiddenInputs.clone[index].setAttribute('value', element.value);
        });

        const details = query<HTMLDetailsElement>('details');
        details.live.forEach((element, index) => {
            if (element.open) {
                details.clone[index].setAttribute('open', '');
            } else {
                details.clone[index].removeAttribute('open');
            }
        });
    };

    const buildReport = async (): Promise<void> => {
        if ((!props.reportHtml && !props.reportRef?.current) || !participantID) return;

        setBuildingReport(true);

        try {
            if (props.prepareForDownload) {
                await props.prepareForDownload();
            }

            let htmlReport: string;
            if (props.reportRef?.current) {
                const element = props.reportRef.current;
                const clone = element.cloneNode(true) as HTMLElement;
                syncCollapsibleState(element, clone);

                const styleElements: HTMLStyleElement[] = Array.from(element.ownerDocument.head.getElementsByTagName('style'));
                const classesToHide: string[] = ['.mdhui-ehr-download-button', '.mdhui-term-information-button', '.mdhui-action .indicator', '.mdhui-news-feed-search-bar'];
                const additionalCssRules = [`${classesToHide.join(', ')} { display: none; }`, 'html, body { height: unset; }'];
                htmlReport = buildHtmlReport(clone.innerHTML, styleElements, additionalCssRules);
            } else {
                htmlReport = buildHtmlReport(props.reportHtml ?? '');
            }

            if (props.preview) {
                previewHtmlReport(htmlReport, props.fileName);
            } else {
                await renderPdf(htmlReport, participantID, { fileName: props.fileName, pageNumbers: true });
            }
        } finally {
            setBuildingReport(false);
        }
    };

    return <div className="mdhui-ehr-download-button" ref={props.innerRef}>
        {(props.reportHtml || props.reportRef?.current) && participantID && !props.hidden &&
            <Button
                variant={props.variant ?? 'subtle'}
                disabled={buildingReport}
                onClick={buildReport}
                fullWidth={false}
                title={props.text ?? language('download-pdf-report')}
            >
                {props.text} <FontAwesomeSvgIcon icon={buildingReport ? faRefresh : faDownload} spin={buildingReport} />
            </Button>
        }
    </div>;

}