import React, { useContext } from 'react';
import "./TextBlock.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface TextBlockProps {
	children?: React.ReactNode;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>;
	color?: ColorDefinition
}

export default function (props: TextBlockProps) {
	if (!props.children) {
		return null;
	}

	let context = useContext(LayoutContext);
	let color = resolveColor(context?.colorScheme, props.color);
	return (
		<div style={{color:color}} ref={props.innerRef} className={"mdhui-text-block " + (props.className || "")}>
			{props.children}
		</div>
	);
}