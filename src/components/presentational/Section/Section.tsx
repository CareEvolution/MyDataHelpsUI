import React from 'react';
import "./Section.css"

export interface SectionProps {
	children?: React.ReactNode;
	className?: string;
	noTopMargin?: boolean;
	ref?: React.Ref<HTMLDivElement>;
	autoHide?: boolean;
}

export default function (props: SectionProps) {
	if (!props.children && props.autoHide == undefined || props.autoHide) {
		return null;
	}

	return (
		<div ref={props.ref} className={"mdhui-section " + (props.className || "") + (props.noTopMargin ? " mdhui-section-no-top-margin" : "")}>
			{props.children}
		</div>
	);
}