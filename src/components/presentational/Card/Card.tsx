import React from 'react';
import "./Card.css"

export interface CardProps {
	className?: string;
	children?: React.ReactNode;
	allowOverflow?: boolean;
}

export default function (props: CardProps) {
	if (!props.children) {
		return null;
	}

	return (
		<div className={(props.allowOverflow ? "allow-overflow " : "") + (props.className || "") + " mdhui-card"}>
			{props.children}
		</div>
	);
}