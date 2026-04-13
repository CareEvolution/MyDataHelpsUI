import React from 'react';
import { TermInformationReference } from '../../container';
import { UnstyledButton } from '../index';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface TermInformationButtonProps {
    termInformation?: TermInformationReference;
    onViewTermInfo?: (termInformation: TermInformationReference) => void;
    labObservationID?: string;
    onViewLabObservationTermInfo?: (labObservationID: string) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function TermInformationButton(props: TermInformationButtonProps) {
    const viewTermInfo = (): void => {
        if (!props.termInformation && !props.labObservationID) return;

        if (props.termInformation && props.onViewTermInfo) {
            props.onViewTermInfo(props.termInformation);
            return;
        }

        if (props.labObservationID && props.onViewLabObservationTermInfo) {
            props.onViewLabObservationTermInfo(props.labObservationID);
            return;
        }

        const queryParams = new URLSearchParams({ presentation: "Modal", lang: MyDataHelps.getCurrentLanguage() });
        if (props.termInformation) {
            queryParams.append('termFamily', props.termInformation.TermFamily);
            queryParams.append('termNamespace', props.termInformation.TermNamespace);
            queryParams.append('termCode', props.termInformation.TermCode);
        }
        if (props.labObservationID) {
            queryParams.append('labObservationID', props.labObservationID);
        }
        MyDataHelps.openApplication(`https://viewbuilder.careevolutionapps.com/library-views/hw/term-information?${queryParams}`, { modal: true });
    };

    return <div className="mdhui-term-information-button" ref={props.innerRef}>
        {(props.termInformation || props.labObservationID) &&
            <UnstyledButton onClick={viewTermInfo}>
                <FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} />
            </UnstyledButton>
        }
    </div>;
}