import MyDataHelps from '@careevolution/mydatahelps-js';
import React, { useContext } from 'react';
import { LayoutContext } from '../Layout/Layout';
import "./StatusBarBackground.css"

export default interface StatusBarBackgroundProps {
	color?: string
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: StatusBarBackgroundProps) {
	var context = useContext(LayoutContext);

	var style = {
		backgroundColor: context.bodyBackgroundColor
	};
	if (props.color) {
		style = { backgroundColor: props.color };
	}

	if (!props.color && context.colorScheme === "dark") {
		MyDataHelps.setStatusBarStyle("lightContent");
	}

	return (
		<div ref={props.innerRef} className="mdhui-status-bar-background" style={style}>
		</div>
	);
}