import React, { CSSProperties } from 'react';
import './SingleDataPoint.css';
import { UnstyledButton } from '..';
import { ColorDefinition } from '../../../helpers/colors';

export interface SingleDataPointProps {
    label: string;
    statusText?: string;
    statusColor?: ColorDefinition;
    value?: number;
    units?: string;
    onClick?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SingleDataPointProps) {
    const getContents = () => {
        return <>
            <div className="mdhui-single-data-point-value-units">
                {!props.value &&
                    <div className="mdhui-single-data-point-value">...</div>
                }
                {props.value &&
                    <div className="mdhui-single-data-point-value">{props.value.toLocaleString()}</div>
                }
                {props.value && props.units &&
                    <div className="mdhui-single-data-point-units">{props.units}</div>
                }
            </div>
            <div className="mdhui-single-data-point-label">{props.label}</div>
            {props.statusText &&
                <div className="mdhui-single-data-point-status" style={props.statusColor ? {color: props.statusColor} as CSSProperties : undefined}>{props.statusText}</div>
            }
        </>;
    };

    return <div ref={props.innerRef}>
        {props.onClick &&
            <UnstyledButton className="mdhui-single-data-point" onClick={() => props.onClick!()}>
                {getContents()}
            </UnstyledButton>
        }
        {!props.onClick &&
            <div className="mdhui-single-data-point">
                {getContents()}
            </div>
        }
    </div>;
}