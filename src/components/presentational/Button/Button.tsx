import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import "./Button.css"

export interface ButtonProps {
	children?: React.ReactNode;
	/**
	 * Notification Type to display for the most recent notification
	 * @default Push
	 * */
	disabled?: boolean;
	onClick: Function;
	className?: string;
	color?: string;
	loading?: boolean;
	variant?: "default" | "subtle";
}

export default function (props: ButtonProps) {
	let classes = ["mdhui-button"];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.variant === "subtle") {
		classes.push("mdhui-button-subtle");
	}

	return (
		<button style={{ backgroundColor: props.disabled ? undefined : props.color }}
			className={classes.join(" ")}
			disabled={(props.disabled || props.loading) ?? false}
			onClick={() => {
				if (props.disabled || props.loading) {
					return;
				}
				props.onClick();
			}}>
			{props.loading &&
				<>
					<LoadingIndicator variant='inline' color="inherit" />&nbsp;
				</>
			}
			{props.children}
		</button>
	);
}