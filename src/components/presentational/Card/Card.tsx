import React, { useContext } from 'react';
import "./Card.css"
import ShinyOverlay from '../ShinyOverlay/ShinyOverlay';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface CardProps {
	className?: string;
	children?: React.ReactNode;
	allowOverflow?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
	variant?: "default" | "subtle" | "highlight";
	backgroundColor?: ColorDefinition
}

export default function (props: CardProps) {
	if (!props.children) {
		return null;
	}

	let classes = ["mdhui-card"];
	if (props.allowOverflow) {
		classes.push("allow-overflow");
	}
	if (props.className) {
		classes.push(props.className);
	}
	let variant = props.variant || "default";
	classes.push(`mdhui-card-${variant}`);
	if (variant == "highlight") {
		classes.push("mdhui-color-scheme-dark");
	}

	let layoutContext = useContext(LayoutContext);
	let backgroundColor = resolveColor(layoutContext.colorScheme, props.backgroundColor);

	return (
		<div style={{backgroundColor:backgroundColor}} ref={props.innerRef} className={classes.join(" ")}>
			{props.children}
			{props.children && variant === "highlight" && <ShinyOverlay />}
		</div>
	);
}