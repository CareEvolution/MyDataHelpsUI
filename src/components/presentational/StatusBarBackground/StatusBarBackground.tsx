import React from 'react';
import "./StatusBarBackground.css"

export default interface StatusBarBackgroundProps {
	color?: string
}

export default function (props: StatusBarBackgroundProps) {
	var style = {};
	if (props.color) {
		style = { backgroundColor: props.color };
	}

	return (
		<div className="mdhui-status-bar-background" style={style}>
		</div>
	);
}