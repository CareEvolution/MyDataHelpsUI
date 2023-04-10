import React, { ReactElement } from 'react';
import { ShinyOverlay } from '..';
import "./ActivityMeter.css"

export interface ActivityMeterProps {
	label: string;
	value: string;
	icon: ReactElement;
	fillPercent: number;
	averageFillPercent: number;
	color: string;
	message?: string;
	className?: string;
}

export default function (props: ActivityMeterProps) {
	return <div className={"mdhui-activity-meter " + (props.className || "")}>
		<div className="mdhui-activity-meter-label">
			{props.label}
		</div>
		<span className="mdhui-activity-meter-value"><span style={{ color: props.color }}>{props.icon}</span> {props.value}</span>
		<div className="mdhui-activity-meter-meter">
			<div className="mdhui-activity-meter-fill" style={{ width: (props.fillPercent * 100) + "%", backgroundColor: props.color }}>
				<ShinyOverlay />
			</div>
			<div className="mdhui-activity-meter-average-marker" style={{ left: props.averageFillPercent * 100 + "%" }} />
		</div>
		{props.message != undefined &&
			<div style={{ color: props.color }} className="mdhui-activity-meter-message">
				{!props.message &&
					<>&nbsp;</>
				}
				{props.message}
			</div>
		}
	</div>;
}