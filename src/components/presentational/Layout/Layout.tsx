import React, { createContext } from 'react';
import MyDataHelps, { StatusBarStyle } from '@careevolution/mydatahelps-js';
import { Global as EmotionGlobal, css } from '@emotion/react';
import "./Layout.css"
import { darkColorScheme, lightColorScheme, global, coreCss } from '../../../helpers/globalCss';

export interface LayoutProps {
	children?: React.ReactNode;
	bodyBackgroundColor?: string;
	primaryColor?: string;
	statusBarStyle?: StatusBarStyle;
	className?: string;
	autoDarkMode?: boolean;
	noGlobalStyles?: boolean;
	colorScheme?: "light" | "dark" | "auto";

	//Deprecated
	stylesheetPath?: string;
}

export interface LayoutContext {
	darkMode: boolean;
	bodyBackgroundColor: string;
}

export const LayoutContext = createContext<LayoutContext>({ darkMode: false, bodyBackgroundColor: "var(--mdhui-background-color-1)" });

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

	let context: LayoutContext = { darkMode: false, bodyBackgroundColor: props.bodyBackgroundColor || "var(--mdhui-background-color-1)" };
	if (props.autoDarkMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		context.darkMode = true;
	}

	return (
		<LayoutContext.Provider value={context}>
			<EmotionGlobal styles={coreCss} />
			{props.primaryColor &&
				<EmotionGlobal styles={css`
				:root {
					--mdhui-color-primary: ${props.primaryColor};
				}`
				} />
			}
			{context.darkMode &&
				<EmotionGlobal styles={darkColorScheme} />
			}
			{!context.darkMode &&
				<EmotionGlobal styles={lightColorScheme} />
			}
			{!props.noGlobalStyles &&
				<EmotionGlobal styles={global} />
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