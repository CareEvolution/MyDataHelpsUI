import React, { CSSProperties, useContext } from 'react';
import { ColorDefinition, resolveColor } from '../../../helpers';
import { LayoutContext } from '../Layout';
import './DiscreteScale.css';
import UnstyledButton from "../UnstyledButton";

export interface DiscreteScaleProps {
    tickCount: number;
    minLabel?: string;
    maxLabel?: string;
    value?: number;
    onChange?: (value: number) => void;
    sliderColor?: ColorDefinition;
    innerRef?: React.RefObject<HTMLDivElement>;
}

export default function (props: DiscreteScaleProps) {
    const layoutContext = useContext(LayoutContext);

    const values = [...Array(props.tickCount).keys()];

    let selectedValue = props.value ?? 0;
    if (selectedValue < 0) selectedValue = 0;
    if (selectedValue >= props.tickCount) selectedValue = props.tickCount - 1;

    let sliderColor = props.sliderColor ? resolveColor(layoutContext.colorScheme, props.sliderColor) : 'var(--mdhui-color-primary)';
    let sliderStop = `calc((((100% - 16px) / ${(props.tickCount - 1)}) * ${selectedValue}) + 8px)`;
    let sliderStyle = {
        background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${sliderStop}, var(--mdhui-background-color-2) ${sliderStop}, var(--mdhui-background-color-2) 100%)`
    } as CSSProperties;

    let ticksStyle = {
        gridTemplateColumns: values.slice(0, -1).map(v => '1fr').join(' ')
    } as CSSProperties;

    let buttonStyle = {
        background: sliderColor
    } as CSSProperties;

    const onClick = (value: number) => {
        if (props.onChange) {
            props.onChange(value);
        }
    };

    return <div className="mdhui-discrete-scale" ref={props.innerRef}>
        <div className="mdhui-discrete-scale-slider" style={sliderStyle}>&nbsp;</div>
        <div className="mdhui-discrete-scale-ticks" style={ticksStyle}>
            {values.slice(0, -1).map((value, index) => {
                return <div key={index} className="mdhui-discrete-scale-ticks-section">
                    <UnstyledButton
                        className="mdhui-discrete-scale-ticks-section-button"
                        onClick={() => onClick(value)}
                    >
                        <div
                            className="mdhui-discrete-scale-ticks-section-marker"
                            style={{
                                background: value === selectedValue ? sliderColor : 'transparent',
                            }}
                        >&nbsp;</div>
                    </UnstyledButton>
                    {index === props.tickCount - 2 &&
                        <UnstyledButton
                            className="mdhui-discrete-scale-ticks-section-button"
                            onClick={() => onClick(value + 1)}
                            style={{
                                left: 'calc(50% + 2px)'
                            }}
                        >
                            <div
                                className="mdhui-discrete-scale-ticks-section-marker"
                                style={{
                                    background: value + 1 === selectedValue ? sliderColor : 'transparent',
                                }}
                            >&nbsp;</div>
                        </UnstyledButton>
                    }
                </div>;
            })}
        </div>
        <div className="mdhui-discrete-scale-labels">
            <div className="mdhui-discrete-scale-labels-min">{props.minLabel}</div>
            <div className="mdhui-discrete-scale-labels-max">{props.maxLabel}</div>
        </div>
    </div>;
}