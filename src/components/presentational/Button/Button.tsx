import React, { useContext } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import "./Button.css"
import { LayoutContext } from '../Layout';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export type ButtonVariant = "default" | "subtle" | "light";

export interface ButtonProps {
	children?: React.ReactNode;
	disabled?: boolean;
	onClick: Function;
	className?: string;
	color?: ColorDefinition;
	loading?: boolean;
	variant?: ButtonVariant;
	innerRef?: React.Ref<HTMLButtonElement>;
	defaultMargin?: boolean;
	fullWidth?: boolean;
}

export default function (props: ButtonProps) {
	let classes = ["mdhui-button"];
	if (props.className) {
		classes.push(props.className);
	}
	if(props.fullWidth ?? true){
		classes.push("mdhui-button-full-width");
	}
	if (props.defaultMargin) {
		classes.push("mdhui-button-default-margin");
	}


	let context = useContext(LayoutContext);

	let backgroundColor = resolveColor(context?.colorScheme, props.color);
	let textColor = "#FFF";
	if (props.variant === "subtle") {
		textColor = resolveColor(context?.colorScheme, props.color) || "var(--mdhui-color-primary)";
		backgroundColor = "transparent";
	}
	else if (props.variant === "light") {
		textColor = resolveColor(context?.colorScheme, props.color) || "var(--mdhui-color-primary)";
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