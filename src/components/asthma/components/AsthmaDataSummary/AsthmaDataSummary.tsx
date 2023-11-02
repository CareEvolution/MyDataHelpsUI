import React from 'react';
import './AsthmaDataSummary.css';
import { AsthmaDataStatus } from '../../model';
import { getAsthmaDataStatusText } from '../../helpers';

export interface AsthmaDataSummaryProps {
    label: string;
    status: AsthmaDataStatus;
    statusText?: string;
    value?: number;
    units?: string;
    onClick?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaDataSummaryProps) {

    const onClick = (): void => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return <div className="mdhui-asthma-data-summary" ref={props.innerRef} onClick={() => onClick()}>
        <div className="mdhui-asthma-data-summary-value-units">
            {!props.value &&
                <div className="mdhui-asthma-data-summary-value">...</div>
            }
            {props.value &&
                <div className="mdhui-asthma-data-summary-value">{props.value.toLocaleString()}</div>
            }
            {props.value && props.units &&
                <div className="mdhui-asthma-data-summary-units">{props.units}</div>
            }
        </div>
        <div className="mdhui-asthma-data-summary-label">{props.label}</div>
        <div className={`mdhui-asthma-data-summary-status mdhui-asthma-data-summary-status-${props.status}`}>{props.statusText ?? getAsthmaDataStatusText(props.status)}</div>
    </div>;
}