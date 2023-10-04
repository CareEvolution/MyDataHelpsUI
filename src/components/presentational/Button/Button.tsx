import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import "./Button.css"

export interface ButtonProps {
	children?: React.ReactNode;
	disabled?: boolean;
	onClick: Function;
	className?: string;
	color?: string;
	loading?: boolean;
	variant?: "default" | "subtle" | "light";
	innerRef?: React.Ref<HTMLButtonElement>
}

export default function (props: ButtonProps) {
	let classes = ["mdhui-button"];
	if (props.className) {
		classes.push(props.className);
	}

	let backgroundColor = props.color;
	let textColor = "#FFF";
	if (props.variant === "subtle") {
		textColor = props.color ? props.color : "var(--mdhui-color-primary)";
		backgroundColor = "transparent";
	}
	else if (props.variant === "light") {
		textColor = props.color ? props.color : "var(--mdhui-color-primary)";
		backgroundColor = "var(--mdhui-background-color-1)";
	}

	return (
		<button ref={props.innerRef} style={{ backgroundColor: props.disabled ? undefined : backgroundColor, color: props.disabled ? undefined : textColor }}
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