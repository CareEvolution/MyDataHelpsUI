import React from 'react';
import { Button } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { EhrNewsFeedType, language } from '../../../helpers';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './EhrDownloadButton.css';

export interface EhrDownloadButtonProps {
    concept: 'Allergies' | 'Medications' | 'Conditions' | EhrNewsFeedType;
    disabled?: boolean;
    onClick: () => void;
}

export default function EhrDownloadButton(props: EhrDownloadButtonProps) {
    return <Button
        className="mdhui-ehr-download-button"
        disabled={props.disabled}
        onClick={props.onClick}
        fullWidth={false}
    >
        {language('download')} <FontAwesomeSvgIcon icon={faDownload} />
    </Button>;

}