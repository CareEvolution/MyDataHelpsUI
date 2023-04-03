import React, { useRef, useLayoutEffect } from 'react'
import "./NavigationBar.css"
import MyDataHelps from "@careevolution/mydatahelps-js"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import language from "../../../helpers/language"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'

export interface NavigationBarProps {
	title: string;
	showBackButton?: boolean;
	showCloseButton?: boolean;
	children?: React.ReactNode;
	closeButtonText?: string;
	backButtonText?: string;
	className?: string;
	variant?: "default" | "compressed";
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

	return (
		<div className={classes.join(" ")} ref={navBar}>
			{props.showBackButton &&
				<a className="back-button" href="javascript:{}" onClick={() => back()}>
					<FontAwesomeSvgIcon icon={faChevronLeft} />
					{props.backButtonText ? props.backButtonText : language["back"]}
				</a>
			}
			{props.title &&
				<div className="title">
					<span>{props.title}</span>
				</div>
			}
			{props.showCloseButton &&
				<a className="close-button" href="javascript:{}" onClick={() => close()}>
					{props.closeButtonText ? props.closeButtonText : language["close"]}
				</a>
			}
			{props.children}
		</div>
	);
}