import React from 'react';
import "./LoadingIndicator.css"

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
		<div ref={props.innerRef} style={{ color: props.color }} className={classes.join(" ")} role="status">
			<svg className="mdhui-loading-indicator-spinner" viewBox="0 0 24 24" aria-hidden="true">
				<circle className="mdhui-loading-indicator-track" cx="12" cy="12" r="10" />
				<circle className="mdhui-loading-indicator-arc" cx="12" cy="12" r="10" />
			</svg>
		</div>
	);
}

export default LoadingIndicator;
