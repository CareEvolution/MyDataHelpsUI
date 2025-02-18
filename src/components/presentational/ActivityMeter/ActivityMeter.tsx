﻿import React, { ReactElement, useContext } from 'react';
import { LayoutContext, ShinyOverlay } from '..';
import "./ActivityMeter.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface ActivityMeterProps {
	label: string;
	value: string;
	icon: ReactElement;
	fillPercent: number;
	averageFillPercent: number;
	color: ColorDefinition;
	message?: string;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>
	thresholdLabel?: string;
}

export default function ActivityMeter(props: ActivityMeterProps) {
	let context = useContext(LayoutContext);

	return <div ref={props.innerRef} className={"mdhui-activity-meter " + (props.className || "")}>
		<div className="mdhui-activity-meter-label">
			{props.label}
		</div>
		<span className="mdhui-activity-meter-value"><span style={{ color: resolveColor(context.colorScheme, props.color) }}>{props.icon}</span> {props.value}</span>
		<div className="mdhui-activity-meter-meter">
			<div className="mdhui-activity-meter-fill" style={{ width: (props.fillPercent * 100) + "%", backgroundColor: resolveColor(context.colorScheme, props.color) }}>
				<ShinyOverlay />
			</div>
			<div className="mdhui-activity-meter-average-marker" style={{ left: props.averageFillPercent * 100 + "%" }} />
		</div>
		{props.message != undefined &&
			<div style={{ color: resolveColor(context.colorScheme, props.color) }} className="mdhui-activity-meter-message">
				{!props.message &&
					<>&nbsp;</>
				}
				{props.message}
			</div>
		}
		{props.thresholdLabel != undefined &&
			<div className="mdhui-activity-meter-threshold">
				{props.thresholdLabel}
				<div>
					<FontAwesomeSvgIcon icon={faChevronDown} />
				</div>
			</div>
		}
	</div>;
}