import React from 'react';
import "./TextBlock.css"

export interface TextBlockProps {
	children?: React.ReactNode;
	className?: string;
}

export default function (props: TextBlockProps) {
	if (!props.children) {
		return null;
	}

	return (
		<div className={"mdhui-text-block " + (props.className || "")}>
			{props.children}
		</div>
	);
}