import "./ProgressBar.css";
import React from "react";
import ProgressBarStepIcon from "./ProgressBarStepIcon/ProgressBarStepIcon";

export interface ProgressBarProps {
	background?: string;
	fill?: string;
	fillPercent: number;
	steps?: [
		{
			stepPercent: number;
			stepIcon: React.ReactNode;
		}
	]
}

ProgressBar.defaultProps = {
	background: "#00A862",
	fill: "#BFE9D8",
	fillPercent: 0,
}

export default function ProgressBar(props: ProgressBarProps) {

	return (
		<div className="progress-bar">
			<div className="progress-bar-background" style={{ background: props.background }}>
				<div className="progress-steps">
					{props.steps &&
						<>
							{props.steps.map((step, i) =>
								<div key={`${i}-step`} className="step-icon" style={{ left: step.stepPercent + "%" }}>
									{step.stepIcon}
								</div>
							)}
						</>
					}
					{!props.steps &&
						<span>&nbsp;</span>
					}
				</div>
				<div className="progress-bar-fill" style={{ width: props.fillPercent + "%", background: props.fill }}>
					&nbsp;
				</div>
			</div>
		</div>
	);
}