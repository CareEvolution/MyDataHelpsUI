import React from 'react';
import MyDataHelps, { StatusBarStyle } from '@careevolution/mydatahelps-js';
import "./Layout.css"

export interface LayoutProps {
	children?: React.ReactNode;
	stylesheetPath?: string;
	bodyBackgroundColor?: string;
	statusBarStyle?: StatusBarStyle;
	className?: string;
}

export default function (props: LayoutProps) {
	if (props.bodyBackgroundColor) {
		document.body.style.backgroundColor = props.bodyBackgroundColor;
	} else {
		document.body.style.removeProperty('background-color');
	}

	if (props.statusBarStyle) {
		MyDataHelps.setStatusBarStyle(props.statusBarStyle);
	}

	return (
		<div className={"mdhui-layout" + (props.className ? (" " + props.className) : "")}>
			{props.stylesheetPath &&
				<link rel="stylesheet" type="text/css" href={props.stylesheetPath} />
			}
			{props.children}
		</div>
	);
}