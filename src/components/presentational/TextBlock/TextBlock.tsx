import React from 'react';
import "./TextBlock.css"

export interface TextBlockProps {
	children?: React.ReactNode;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: TextBlockProps) {
	if (!props.children) {
		return null;
	}

	return (
		<div ref={props.innerRef} className={"mdhui-text-block " + (props.className || "")}>
			{props.children}
		</div>
	);
}