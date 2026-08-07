import React, { createContext } from 'react';
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
	flex?: boolean;
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

export default function Layout(props: LayoutProps) {
	let className = "mdhui-layout";
	if (props.className) {
		className += " " + props.className;
	}
	if (props.flex) {
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

	let paddingBottom = props.flex ? "0" : "env(safe-area-inset-bottom)";

	// One Global for scheme + brand: Emotion orders tags by mount order, so a runtime
	// scheme toggle would land the scheme tag after a separate brand tag and clobber it.
	// -text gets the brand too, so a custom fill never pairs with the stock foreground.
	const schemeStyles = context.colorScheme == "dark" ? darkColorScheme : lightColorScheme;
	const brandStyles = props.primaryColor ? css`
	:root {
		--mdhui-color-primary: ${resolveColor(colorScheme, props.primaryColor)};
		--mdhui-color-primary-text: ${resolveColor(colorScheme, props.primaryColor)};
	}` : undefined;

	return (
		<LayoutContext.Provider value={context}>
			<EmotionGlobal styles={core} />
			<EmotionGlobal styles={brandStyles ? [schemeStyles, brandStyles] : schemeStyles} />
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