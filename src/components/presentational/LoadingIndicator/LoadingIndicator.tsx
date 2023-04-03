import React from 'react';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh'
import "./LoadingIndicator.css"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { ProjectSupport } from '../../container';

export interface LoadingIndicatorProps {
	variant?: "default" | "inline";
	color?: string;
	className?: string;
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
		<div style={{ color: props.color }} className={classes.join(" ")}>
			<FontAwesomeSvgIcon icon={faRefresh} spin />
		</div>
	);
}

export default LoadingIndicator;