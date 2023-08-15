import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import "./ProgressBarStepIcon.css"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import React from "react";

export interface ProgressBarStepIconProps {
	background?: string;
	fill: string;
	label?: string;
	icon?: IconDefinition
}

ProgressBarStepIcon.defaultProps = {
	fill: "#00A862"
}

export default function ProgressBarStepIcon(props: ProgressBarStepIconProps) {
	return (
		<span style={{background: props.background, color: props.fill}}>
			{props.icon &&
				<FontAwesomeSvgIcon icon={props.icon}/>
			}
			{props.label &&
				<span className="step-label">
					{props.label}
				</span>
			}
		</span>	
	)

}