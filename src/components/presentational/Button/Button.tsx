import React from 'react';
import "./Button.css"

export interface ButtonProps {
	children?: React.ReactNode;
	/**
	 * Notification Type to display for the most recent notification
	 * @default Push
	 * */
	disabled?: boolean;
	onClick: Function;
}

export default function (props: ButtonProps) {
	return (
		<button className="mdhui-button" disabled={props.disabled ?? false} onClick={() => props.onClick()}>
			{props.children}
		</button>
	);
}