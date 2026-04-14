import React from 'react';
import { TermInformationReference } from '../../container';
import { UnstyledButton } from '../index';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface TermInformationButtonProps {
    termInformation?: TermInformationReference;
    onViewTermInfo?: (termInformation: TermInformationReference) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function TermInformationButton(props: TermInformationButtonProps) {
    const viewTermInfo = (): void => {
        if (!props.termInformation) return;

        if (props.onViewTermInfo) {
            props.onViewTermInfo(props.termInformation);
            return;
        }

        const queryParams = new URLSearchParams({
            termFamily: props.termInformation.TermFamily,
            termNamespace: props.termInformation.TermNamespace,
            termCode: props.termInformation.TermCode,
            presentation: "Modal",
            lang: MyDataHelps.getCurrentLanguage()
        });
        const url = `https://viewbuilder.careevolutionapps.com/library-views/hw/term-information?${queryParams}`;
        MyDataHelps.openApplication(url, { modal: true });
    };

    return <div className="mdhui-term-information-button" ref={props.innerRef}>
        {props.termInformation &&
            <UnstyledButton onClick={viewTermInfo}>
                <FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} />
            </UnstyledButton>
        }
    </div>;
}