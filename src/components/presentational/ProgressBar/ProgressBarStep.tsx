import React, { useContext } from "react";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import { LayoutContext } from "../Layout";

export interface ProgressBarStepsProps {
	borderColor?: ColorDefinition;
	backgroundColor?: ColorDefinition;
	children: React.ReactNode;
	height: string;
}

export function ProgressBarSteps(props: ProgressBarStepsProps) {
	let layoutContext = useContext(LayoutContext);
	let calcTopMargin = "0px";
	console.log(calcTopMargin);
	return (
		<span style={{ border: "2px solid", borderColor: resolveColor(layoutContext?.colorScheme,props.borderColor), borderRadius: props.height, height: props.height, width: props.height, marginTop: calcTopMargin, backgroundColor: resolveColor(layoutContext?.colorScheme, props.backgroundColor), padding: "4px 4px" }}>
			{props.children}
		</span>
	)
}