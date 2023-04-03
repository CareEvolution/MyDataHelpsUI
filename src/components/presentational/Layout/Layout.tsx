import React, { createContext } from 'react';
import MyDataHelps, { StatusBarStyle } from '@careevolution/mydatahelps-js';
import { Global as EmotionGlobal, css } from '@emotion/react';
import "./Layout.css"
import { darkColorScheme, lightColorScheme, global, core } from '../../../helpers/globalCss';

export interface LayoutProps {
	children?: React.ReactNode;
	bodyBackgroundColor?: string;
	primaryColor?: string;
	statusBarStyle?: StatusBarStyle;
	className?: string;
	noGlobalStyles?: boolean;
	colorScheme?: "light" | "dark" | "auto";
	/**
 	* @deprecated 
 	*/
	stylesheetPath?: string;
}

export interface LayoutContext {
	colorScheme: "light" | "dark";
	bodyBackgroundColor: string;
}

export const LayoutContext = createContext<LayoutContext>({ colorScheme: "light", bodyBackgroundColor: "var(--mdhui-background-color-1)" });

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

	let colorScheme: "light" | "dark" = "light";
	if (props.colorScheme === "auto" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		colorScheme = "dark";
	} else if (props.colorScheme === "dark" || props.colorScheme === "light") {
		colorScheme = props.colorScheme;
	}
	console.log(props.colorScheme);
	console.log(colorScheme);
	let context: LayoutContext = { colorScheme: colorScheme, bodyBackgroundColor: props.bodyBackgroundColor || "var(--mdhui-background-color-1)" };

	return (
		<LayoutContext.Provider value={context}>
			<EmotionGlobal styles={core} />
			{props.primaryColor &&
				<EmotionGlobal styles={css`
				:root {
					--mdhui-color-primary: ${props.primaryColor};
				}`
				} />
			}
			{context.colorScheme == "dark" &&
				<EmotionGlobal styles={darkColorScheme} />
			}
			{context.colorScheme == "light" &&
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