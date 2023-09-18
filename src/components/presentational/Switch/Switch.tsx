import React from 'react'
import UnstyledButton from '../UnstyledButton';
import "./Switch.css"

export interface SwitchProps {
	isOn: Boolean;
	onBackgroundColor?: string;
	onValueChanged(value: boolean): void;
	className?: string;
    innerRef?: React.Ref<HTMLButtonElement>;
}

export default function (props: SwitchProps) {
	return (
		<UnstyledButton innerRef={props.innerRef}
			onClick={() => props.onValueChanged(!props.isOn)}
			className={"mdhui-switch" + (props.isOn ? " mdhui-switch-on" : "") + (props.className ? " " + props.className : "")}
			style={{ backgroundColor: props.isOn ? props.onBackgroundColor : "var(--mdhui-background-color-2)" }}>
			<div className="mdhui-switch-circle"></div>
		</UnstyledButton>
	)
}