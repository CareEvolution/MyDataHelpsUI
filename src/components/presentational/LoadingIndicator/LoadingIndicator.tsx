import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import "./LoadingIndicator.css"

function LoadingIndicator() {
	return (
		<div className="mdhui-loading-indicator">
			<FontAwesomeIcon icon={faRefresh} spin />
		</div>
	);
}

export default LoadingIndicator;