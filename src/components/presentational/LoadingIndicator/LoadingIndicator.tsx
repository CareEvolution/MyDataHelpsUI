import React from 'react';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh'
import "./LoadingIndicator.css"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { ProjectSupport } from '../../container';

export interface LoadingIndicatorProps {
	variant?: "default" | "inline";
	color?: string;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
	return (
		<div style={{ color: props.color }} className={"mdhui-loading-indicator" + (props.variant == "inline" ? " mdhui-loading-indicator-inline" : "")}>
			<FontAwesomeSvgIcon icon={faRefresh} spin />
		</div>
	);
}

export default LoadingIndicator;