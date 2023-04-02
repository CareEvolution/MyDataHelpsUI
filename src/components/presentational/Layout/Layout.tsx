import React, { createContext } from 'react';
import MyDataHelps, { StatusBarStyle } from '@careevolution/mydatahelps-js';
import "./Layout.css"

export interface LayoutProps {
	children?: React.ReactNode;
	stylesheetPath?: string;
	bodyBackgroundColor?: string;
	statusBarStyle?: StatusBarStyle;
	className?: string;
	autoDarkMode?: boolean;
}

export interface LayoutContext {
	darkMode: boolean;
}

export const LayoutContext = createContext<LayoutContext>({ darkMode: false });

export default function (props: LayoutProps) {
	let className = "mdhui-layout";
	if (!props.autoDarkMode) {
		className += " mdhui-layout-auto-dark-mode";
	}
	if(props.className) {
		className += " " + props.className;
	}

	if (props.bodyBackgroundColor) {
		document.body.style.backgroundColor = props.bodyBackgroundColor;
	} else {
		document.body.style.removeProperty('background-color');
	}

	if (props.statusBarStyle) {
		MyDataHelps.setStatusBarStyle(props.statusBarStyle);
	}

	let context: LayoutContext = { darkMode: false };
	if (props.autoDarkMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		context.darkMode = true;
	}

	return (
		<LayoutContext.Provider value={context}>
			<div className={className}>
				{props.stylesheetPath &&
					<link rel="stylesheet" type="text/css" href={props.stylesheetPath} />
				}
				{props.children}
			</div>
		</LayoutContext.Provider>
	);
}