import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import "./ProgressBar.css";
import React, { ReactElement, useContext, useEffect } from "react";
import { LayoutContext } from '../Layout';
import ShinyOverlay from "../ShinyOverlay";

export interface ProgressBarProps {
	backgroundColor?: ColorDefinition;
	borderColor?: ColorDefinition;
	fillColor?: ColorDefinition;
	fillPercent: number;
	steps?: 
		{
			percent: number;
			icon: ReactElement;
		}[]
	,
	innerRef?: React.Ref<HTMLDivElement>;
	defaultMargin?: boolean
}

ProgressBar.defaultProps = {
	backgroundColor: "var(--mdhui-background-color-0)",
	fillColor: "var(--mdhui-color-primary)",
	fillPercent: 0
}

export default function ProgressBar(props: ProgressBarProps) {
	let layoutContext = useContext(LayoutContext);
	let classes = ["mdhui-progress-bar"];
	if (props.defaultMargin) {
		classes.push("mdhui-progress-bar-default-margin");
	}

	return (
		<div className={classes.join(" ")} ref={props.innerRef}>
			<div className="mdhui-progress-bar-background" style={{ background: resolveColor(layoutContext?.colorScheme, props.backgroundColor) }}>
				<div className="mdhui-progress-bar-fill" style={{ width: Math.trunc(props.fillPercent) + "%", background: resolveColor(layoutContext?.colorScheme, props.fillColor) }} />
				<ShinyOverlay/>
			</div>
			<div className="mdhui-progress-steps">
				{props.steps &&
					<>
						{props.steps.map((step, i) =>
							<div key={`${i}-step`} className="step-icon" style={{ left: Math.trunc(step.percent) + "%" }}>
								{step.icon}
							</div>
						)}
					</>
				}
			</div>
		</div>
	);
}