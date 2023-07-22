import React from 'react';
import "./Section.css"

export interface SectionProps {
	children?: React.ReactNode;
	className?: string;
	noTopMargin?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SectionProps) {
	if (!props.children) {
		return null;
	}

	return (
		<div ref={props.innerRef} className={"mdhui-section " + (props.className || "") + (props.noTopMargin ? " mdhui-section-no-top-margin" : "")}>
			{props.children}
		</div>
	);
}