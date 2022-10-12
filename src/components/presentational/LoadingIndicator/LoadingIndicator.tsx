import React from 'react';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh'
import "./LoadingIndicator.css"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

function LoadingIndicator() {
	return (
		<div className="mdhui-loading-indicator">
			<FontAwesomeSvgIcon icon={faRefresh} spin />
		</div>
	);
}

export default LoadingIndicator;