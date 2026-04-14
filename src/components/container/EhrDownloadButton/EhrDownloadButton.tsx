import React from 'react';
import { Button } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { EhrNewsFeedType, language } from '../../../helpers';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './EhrDownloadButton.css';

export interface EhrDownloadButtonProps {
    concept: 'Allergies' | 'Medications' | 'Conditions' | EhrNewsFeedType;
    hidden?: boolean;
    disabled?: boolean;
    onClick: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function EhrDownloadButton(props: EhrDownloadButtonProps) {
    return <div ref={props.innerRef} className="mdhui-ehr-download-button">
        {!props.hidden &&
            <Button
                variant="subtle"
                disabled={props.disabled}
                onClick={props.onClick}
                fullWidth={false}
            >
                {language('download')} <FontAwesomeSvgIcon icon={faDownload} />
            </Button>
        }
    </div>;

}