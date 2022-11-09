import React from 'react'
import "./Switch.css"

export interface SwitchProps {
	isOn: Boolean;
	onBackgroundColor?: string;
	onValueChanged(value: boolean): void;
}

export default function (props: SwitchProps) {
	return (
		<button
			onClick={() => props.onValueChanged(!props.isOn)}
			className={"mdhui-switch" + (props.isOn ? " mdhui-switch-on" : "")}
			style={{ backgroundColor: props.isOn ? props.onBackgroundColor : "#eee" }}>
			<div className="mdhui-switch-circle"></div>
		</button>
	)
}