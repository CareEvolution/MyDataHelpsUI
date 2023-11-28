import React, { useRef, useLayoutEffect, useContext } from 'react'
import "./NavigationBar.css"
import MyDataHelps from "@careevolution/mydatahelps-js"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import language from "../../../helpers/language"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface NavigationBarProps {
	title?: string;
	subtitle?: string;
	showBackButton?: boolean;
	showCloseButton?: boolean;
	children?: React.ReactNode;
	closeButtonText?: string;
	backButtonText?: string;
	className?: string;
	variant?: "default" | "compressed";
	titleColor?: ColorDefinition;
	subtitleColor?: ColorDefinition;
	buttonColor?: ColorDefinition;
}

export default function (props: NavigationBarProps) {
	const navBar = useRef<HTMLDivElement>(null);

	function back() {
		MyDataHelps.back();
	}

	function close() {
		MyDataHelps.dismiss();
	}

	useLayoutEffect(() => {
		const { current } = navBar;

		function scrollListener() {
			if (window.scrollY > 0) {
				current?.classList.add("scroll-shadow");
			} else {
				current?.classList.remove("scroll-shadow");
			}
		}

		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		}
	})

	let classes = ["mdhui-navigation-bar"];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.variant == "compressed") {
		classes.push("mdhui-navigation-bar-compressed");
	}

	let layoutContext = useContext(LayoutContext);

	return (
		<div className={classes.join(" ")} ref={navBar}>
			{props.showBackButton &&
				<a className="back-button" href="javascript:{}" onClick={() => back()} style={{color:resolveColor(layoutContext?.colorScheme, props.buttonColor)}}>
					<FontAwesomeSvgIcon icon={faChevronLeft} />
					{props.backButtonText ? props.backButtonText : language("back")}
				</a>
			}
			{props.title &&
				<div className="title" style={{color:resolveColor(layoutContext?.colorScheme, props.titleColor)}}>
					<span>{props.title}</span>
				</div>
			}
			{props.subtitle &&
				<div className="subtitle" style={{color:resolveColor(layoutContext?.colorScheme, props.subtitleColor)}}>
					<span>{props.subtitle}</span>
				</div>
			}
			{props.showCloseButton &&
				<a className="close-button" href="javascript:{}" onClick={() => close()} style={{color:resolveColor(layoutContext?.colorScheme, props.buttonColor)}}>
					{props.closeButtonText ? props.closeButtonText : language("close")}
				</a>
			}
			{props.children}
		</div>
	);
}