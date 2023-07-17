import React from 'react';
import "./Section.css"

export interface SectionProps {
	children?: React.ReactNode;
	className?: string;
	noTopMargin?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
	autoHide?: boolean;
}

export default function (props: SectionProps) {
	let autoHide = props.autoHide == undefined || props.autoHide;
	if (!props.children && autoHide) {
		return null;
	}

	let classes = ["mdhui-section"];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.noTopMargin) {
		classes.push("mdhui-section-no-top-margin");
	}
	if (autoHide) {
		classes.push("mdhui-section-auto-hide");
	}

	return (
		<div ref={props.innerRef} className={classes.join(" ")}>
			{props.children}
		</div>
	);
}