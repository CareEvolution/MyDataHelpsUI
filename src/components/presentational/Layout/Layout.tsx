import React, { createContext, useState, useEffect } from 'react';
import MyDataHelps, { StatusBarStyle } from '@careevolution/mydatahelps-js';
import { Global as EmotionGlobal, css } from '@emotion/react';
import "./Layout.css"
import { darkColorScheme, lightColorScheme, global, core } from '../../../helpers/globalCss';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export interface LayoutProps {
	children?: React.ReactNode;
	bodyBackgroundColor?: ColorDefinition;
	primaryColor?: ColorDefinition;
	statusBarStyle?: StatusBarStyle;
	className?: string;
	noGlobalStyles?: boolean;
	colorScheme?: "light" | "dark" | "auto";
	isFlex?: boolean;
	/**
	  * @deprecated 
	  */
	stylesheetPath?: string;
	innerRef?: React.Ref<HTMLDivElement>;
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
	if (props.isFlex) {
		className += " mdhui-layout-flex";
	}

	let colorScheme: "light" | "dark" = "light";
	if (props.colorScheme === "auto" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		colorScheme = "dark";
	} else if (props.colorScheme === "dark" || props.colorScheme === "light") {
		colorScheme = props.colorScheme;
	}

	let backgroundColor = resolveColor(colorScheme, props.bodyBackgroundColor);
	if (backgroundColor) {
		document.body.style.backgroundColor = backgroundColor;
	} else {
		document.body.style.removeProperty('background-color');
	}
	let context: LayoutContext = { colorScheme: colorScheme, bodyBackgroundColor: backgroundColor || "var(--mdhui-background-color-1)" };

	if (props.statusBarStyle) {
		MyDataHelps.setStatusBarStyle(props.statusBarStyle);
	}

	const [windowHeight, setWindowHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight);
		};

		window.visualViewport?.addEventListener('resize', handleResize);

		return () => {
			window.visualViewport?.removeEventListener('resize', handleResize);
		};
	}, []);

	const isKeyboardOpen = window.innerHeight < document.documentElement.clientHeight;
	let paddingBottom = props.isFlex ? "0" : "env(safe-area-inset-bottom)";

	return (
		<LayoutContext.Provider value={context}>
			<EmotionGlobal styles={core} />
			{props.primaryColor &&
				<EmotionGlobal styles={css`
				:root {
					--mdhui-color-primary: ${resolveColor(colorScheme, props.primaryColor)};
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
			<div ref={props.innerRef} className={className} style={{ backgroundColor, paddingBottom }}>
				{props.stylesheetPath &&
					<link rel="stylesheet" type="text/css" href={props.stylesheetPath} />
				}
				{props.children}
			</div>
		</LayoutContext.Provider>
	);
}