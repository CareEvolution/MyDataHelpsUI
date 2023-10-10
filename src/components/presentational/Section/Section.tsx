import React, { useContext } from 'react';
import "./Section.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface SectionProps {
	children?: React.ReactNode;
	className?: string;
	noTopMargin?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
	backgroundColor?: ColorDefinition;
}

export default function (props: SectionProps) {
	if (!props.children) {
		return null;
	}

	let layoutContext = useContext(LayoutContext);
	let backgroundColor = resolveColor(layoutContext.colorScheme, props.backgroundColor);
	return (
		<div ref={props.innerRef}
			style={{ backgroundColor: backgroundColor }}
			className={"mdhui-section " + (props.className || "") + (props.noTopMargin ? " mdhui-section-no-top-margin" : "")}>
			{props.children}
		</div>
	);
}