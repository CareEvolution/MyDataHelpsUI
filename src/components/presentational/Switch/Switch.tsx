import React from 'react'
import "./Switch.css"

export interface SwitchProps {
	enabled: Boolean;
	enabledBackgroundColor?: string;
	onClick(): void;
}

export default function (props: SwitchProps) {
	return (
		<div
			onClick={() => props.onClick()}
			className={"mdhui-switch" + (props.enabled ? " mdhui-switch-enabled" : "")}
			style={{ backgroundColor: props.enabled ? props.enabledBackgroundColor : "#eee" }}>
			<div className="mdhui-switch-circle"></div>
		</div>
	)
}