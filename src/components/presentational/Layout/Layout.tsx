import React, { createContext } from 'react';
import MyDataHelps, { StatusBarStyle } from '@careevolution/mydatahelps-js';
import { Global as EmotionGlobal, css } from '@emotion/react';
import "./Layout.css"
import { darkMode, global, defaultVariables } from '../../../helpers/globalCss';

export interface LayoutProps {
	children?: React.ReactNode;
	bodyBackgroundColor?: string;
	statusBarStyle?: StatusBarStyle;
	className?: string;
	autoDarkMode?: boolean;
	noGlobalStyles?: boolean;
	
	//Deprecated
	stylesheetPath?: string;
}

export interface LayoutContext {
	darkMode: boolean;
}

export const LayoutContext = createContext<LayoutContext>({ darkMode: false });

export default function (props: LayoutProps) {
	let className = "mdhui-layout";
	if (props.className) {
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
			<EmotionGlobal styles={defaultVariables} />
			{!props.noGlobalStyles &&
				<EmotionGlobal styles={global} />
			}
			{props.autoDarkMode &&
				<EmotionGlobal styles={darkMode} />
			}
			<div className={className}>
				{props.stylesheetPath &&
					<link rel="stylesheet" type="text/css" href={props.stylesheetPath} />
				}
				{props.children}
			</div>
		</LayoutContext.Provider>
	);
}