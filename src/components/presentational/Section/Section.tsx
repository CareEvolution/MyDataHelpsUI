import React from 'react';
import "./Section.css"

export interface SectionProps {
	children?: React.ReactNode;
	className?: string;
	noTopMargin?: boolean;
}

export default function (props: SectionProps) {
	if (!props.children) {
		return null;
	}

	return (
		<div className={"mdhui-section " + (props.className || "") + (props.noTopMargin ? " mdhui-section-no-top-margin" : "")}>
			{props.children}
		</div>
	);
}