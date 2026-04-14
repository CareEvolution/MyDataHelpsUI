import { TermInformationReference } from '../../container';
import { UnstyledButton } from '../index';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export interface TermInformationButtonProps {
    termInformation?: TermInformationReference;
    onViewTermInfo?: (termInformation: TermInformationReference) => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function TermInformationButton(props: TermInformationButtonProps) {
    return <div ref={props.innerRef} className="mdhui-term-information-button">
        {props.termInformation &&
            <UnstyledButton onClick={() => props.onViewTermInfo?.(props.termInformation!)}>
                <FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} />
            </UnstyledButton>
        }
    </div>;
}