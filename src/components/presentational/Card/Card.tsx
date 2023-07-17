import React from 'react';
import "./Card.css"

export interface CardProps {
	className?: string;
	children?: React.ReactNode;
	allowOverflow?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
	autoHide?: boolean;
}

export default function (props: CardProps) {
	if (!props.children && (props.autoHide == undefined || props.autoHide)) {
		return null;
	}

	let classes = ["mdhui-card"];
	if (props.allowOverflow) {
		classes.push("allow-overflow");
	}
	if (props.className) {
		classes.push(props.className);
	}

	return (
		<div ref={props.innerRef} className={classes.join(" ")}>
			{props.children}
		</div>
	);
}