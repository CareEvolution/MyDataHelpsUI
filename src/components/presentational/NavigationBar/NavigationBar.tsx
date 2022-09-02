import React, { useRef, useLayoutEffect } from 'react'
import "./NavigationBar.css"
import MyDataHelps from "@careevolution/mydatahelps-js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import language from "../../../helpers/language"

export interface NavigationBarProps {
	title: string;
	showBackButton?: boolean;
	showCloseButton?: boolean;
	children?: React.ReactNode;
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

	return (
		<div className="mdhui-navigation-bar" ref={navBar}>
			{props.showBackButton &&
				<a className="back-button" onClick={() => back()}>
					<FontAwesomeIcon icon={faChevronLeft} /> {language["back"]}
				</a>
			}
			{props.title &&
				<div className="title">
					<span>{props.title}</span>
				</div>
			}
			{props.showCloseButton &&
				<a className="close-button" onClick={() => close()}>
					{language["close"]}
				</a>
			}
			{props.children}
		</div>
	);
}