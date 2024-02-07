import React, { useContext } from 'react';
import "./Section.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface SectionProps {
	children?: React.ReactNode;
	className?: string;
	noTopMargin?: boolean;
	noBottomMargin?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
	backgroundColor?: ColorDefinition;
	style?: React.CSSProperties;
}

export default function (props: SectionProps) {
	if (!props.children) {
		return null;
	}

	let layoutContext = useContext(LayoutContext);
	let backgroundColor = resolveColor(layoutContext?.colorScheme, props.backgroundColor);
	return (
		<div ref={props.innerRef}
			style={{ ...props.style, backgroundColor: backgroundColor }}
			className={"mdhui-section " + (props.className || "") + (props.noTopMargin ? " mdhui-section-no-top-margin" : "") + (props.noBottomMargin ? " mdhui-section-no-bottom-margin" : "")}>
			{props.children}
		</div>
	);
}