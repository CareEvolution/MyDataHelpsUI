import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import UnstyledButton from '../UnstyledButton';
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
	variant?: "default" | "subtle" | "inverted";
}

export default function (props: ButtonProps) {
	let classes = ["mdhui-button"];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.variant === "subtle") {
		classes.push("mdhui-button-subtle");
	}

	let backgroundColor = props.color;
	let textColor = "#FFF";

	if (props.variant === "inverted") {
		backgroundColor = "var(--mdhui-background-color-1)";
		textColor = props.color ? props.color : "var(--mdhui-color-primary)";
	}

	return (
		<button style={{ backgroundColor: props.disabled ? undefined : backgroundColor, color: props.disabled ? undefined : textColor }}
			className={classes.join(" ")}
			disabled={(props.disabled || props.loading)}
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