import React, { CSSProperties } from 'react';
import './DataSummary.css';
import { UnstyledButton } from '..';
import { ColorDefinition } from '../../../helpers/colors';

export interface DataSummaryProps {
    label: string;
    statusText?: string;
    statusColor?: ColorDefinition;
    value?: number;
    units?: string;
    onClick?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: DataSummaryProps) {
    const getDataSummaryContents = () => {
        return <>
            <div className="mdhui-data-summary-value-units">
                {!props.value &&
                    <div className="mdhui-data-summary-value">...</div>
                }
                {props.value &&
                    <div className="mdhui-data-summary-value">{props.value.toLocaleString()}</div>
                }
                {props.value && props.units &&
                    <div className="mdhui-data-summary-units">{props.units}</div>
                }
            </div>
            <div className="mdhui-data-summary-label">{props.label}</div>
            {props.statusText &&
                <div className="mdhui-data-summary-status" style={props.statusColor ? {color: props.statusColor} as CSSProperties : undefined}>{props.statusText}</div>
            }
        </>;
    };

    return <div className="mdhui-data-summary" ref={props.innerRef}>
        {props.onClick &&
            <UnstyledButton onClick={() => props.onClick!()}>
                {getDataSummaryContents()}
            </UnstyledButton>
        }
        {!props.onClick && getDataSummaryContents()}
    </div>;
}