import { faCaretUp, faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import Action from '../Action';
import './BloodPressureReading.css'
import { formatDateForLocale } from '../../../helpers';

export type BloodPressureClassification = 'low' | 'normal' | 'elevated' | 'hypertension-stage-1' | 'hypertension-stage-2' | 'hypertensive-crisis';

export interface BloodPressureReadingProps {
    systolic: number;
    diastolic: number;
    date: Date;
    onClick?: () => void;
    indicator?: ReactElement;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component can be used to render a single blood pressure reading.
 */
export default function BloodPressureReading(props: BloodPressureReadingProps) {

    let classification: BloodPressureClassification = 'normal';
    if (props.systolic > 180 || props.diastolic > 120) {
        classification = 'hypertensive-crisis';
    } else if (props.systolic > 140 || props.diastolic > 90) {
        classification = 'hypertension-stage-2';
    } else if (props.systolic > 130 || props.diastolic > 80) {
        classification = 'hypertension-stage-1';
    } else if (props.systolic > 120) {
        classification = 'elevated';
    } else if (props.systolic < 90 || props.systolic < 60) {
        classification = 'low';
    }

    return <Action
        className="mdhui-blood-pressure-reading"
        indicatorPosition="topRight"
        indicator={props.indicator ?? <FontAwesomeSvgIcon icon={faInfoCircle} />}
        onClick={props.onClick}
        innerRef={props.innerRef}
    >
        <div className="mdhui-blood-pressure-reading-title"><FontAwesomeSvgIcon icon={faHeart} /> Blood Pressure</div>
        <div className="mdhui-blood-pressure-reading-value-wrapper">
            <div className="mdhui-blood-pressure-reading-value">
                {props.systolic} / {props.diastolic} mmHg
            </div>
            <div className={`mdhui-blood-pressure-reading-classification ${classification}`}>
                {classification.replace(/-/g, ' ').replace(/\b\w/g, match => match.toUpperCase())}
            </div>
        </div>
        <div className="mdhui-blood-pressure-reading-date">
            {formatDateForLocale(props.date, 'PPP p')}
        </div>

        <div className="mdhui-blood-pressure-reading-classification-indicator">
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar normal">
                {(classification === 'normal' || classification == 'low') && <FontAwesomeSvgIcon icon={faCaretUp} />}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar elevated">
                {classification === 'elevated' && <FontAwesomeSvgIcon icon={faCaretUp} />}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar hypertension-stage-1">
                {classification === 'hypertension-stage-1' && <FontAwesomeSvgIcon icon={faCaretUp} />}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar hypertension-stage-2">
                {classification === 'hypertension-stage-2' && <FontAwesomeSvgIcon icon={faCaretUp} />}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar hypertensive-crisis">
                {classification === 'hypertensive-crisis' && <FontAwesomeSvgIcon icon={faCaretUp} />}
            </div>
        </div>
    </Action>;
}