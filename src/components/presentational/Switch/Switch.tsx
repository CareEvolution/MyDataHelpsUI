import React from 'react'
import "./Switch.css"

export interface SwitchProps {
	isOn: Boolean;
	onBackgroundColor?: string;
	onValueChanged(value: boolean): void;
	className?: string;
}

export default function (props: SwitchProps) {
	return (
		<button
			onClick={() => props.onValueChanged(!props.isOn)}
			className={"mdhui-switch" + (props.isOn ? " mdhui-switch-on" : "") + (props.className ? " " + props.className : "")}
			style={{ backgroundColor: props.isOn ? props.onBackgroundColor : "#eee" }}>
			<div className="mdhui-switch-circle"></div>
		</button>
	)
}