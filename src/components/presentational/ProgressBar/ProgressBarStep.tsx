import React, { useContext } from "react";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import { LayoutContext } from "../Layout";

export interface ProgressBarStepProps {
	borderColor?: ColorDefinition;
	backgroundColor?: ColorDefinition;
	children?: React.ReactNode;
	height: string;
}

export default function ProgressBarStep(props: ProgressBarStepProps) {
	let layoutContext = useContext(LayoutContext);
	let calcTopMargin = "calc( var(--icon_size) / 2 - "+props.height+" / 2 - 4px)";
	return (
		<span style={{ border: "2px solid", borderColor: resolveColor(layoutContext?.colorScheme,props.borderColor), borderRadius: props.height, height: props.height, width: props.height, marginTop: calcTopMargin, backgroundColor: resolveColor(layoutContext?.colorScheme, props.backgroundColor), padding: "4px 4px" }}>
			{props.children}
		</span>
	)
}