import "./ProgressBar.css";
import React, { ReactElement, useEffect } from "react";

export interface ProgressBarProps {
	background?: string;
	fill?: string;
	fillPercent: number;
	steps?: [
		{
			stepPercent: number;
			stepIcon: ReactElement;
		}
	]
}

ProgressBar.defaultProps = {
	background: "#d3d3d3",
	fill: "#00A862",
	fillPercent: 0
}

export default function ProgressBar(props: ProgressBarProps) {
	return (
		<div className="progress-bar">
			<div className="progress-bar-background" style={{ background: props.background }}>
				<div className="progress-bar-fill" style={{ width: props.fillPercent + "%", background: props.fill }} />
			</div>
			<div className="progress-steps">
				{props.steps &&
					<>
						{props.steps.map((step, i) =>
							<div key={`${i}-step`} className="step-icon" style={{ left: "calc(" + step.stepPercent + "%" + " - " + step.iconOffset + "px)" }}>
								{step.stepIcon}
							</div>
						)}
					</>
				}
			</div>
		</div>
	);
}