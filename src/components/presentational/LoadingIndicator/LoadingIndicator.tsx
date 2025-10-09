import React from 'react';
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import "./LoadingIndicator.css"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface LoadingIndicatorProps {
	variant?: "default" | "inline";
	color?: string;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
	let classes = ["mdhui-loading-indicator"];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.variant == "inline") {
		classes.push("mdhui-loading-indicator-inline");
	}
	return (
		<div ref={props.innerRef} style={{ color: props.color }} className={classes.join(" ")}>
			<FontAwesomeSvgIcon icon={faRefresh} spin />
		</div>
	);
}

export default LoadingIndicator;