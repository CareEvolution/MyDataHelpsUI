import React from 'react';
import ShinyOverlay from '../ShinyOverlay';
import "./TrackerItem.css"

export interface TrackerItemProps {
	selected: boolean;
	text?: string;
	color: string;
	bordered?: boolean;
	badge?: string;
	onClick?: Function;
}

export default function (props: TrackerItemProps) {
	var classes = ["mdhui-tracker-item"];
	if (props.onClick) {
		classes.push("selectable");
	}

	if (props.selected) {
		classes.push("selected");
	} else {
		classes.push("unselected");
	}

	if (props.bordered) {
		classes.push("bordered");
	}

	var style = {
		borderColor: props.color,
		color: props.color,
		backgroundColor: props.color
	};

	return (
		<div className={classes.join(" ")} style={style} onClick={() => props.onClick ? props.onClick() : null}>
			{props.text}
			<ShinyOverlay />
			{props.badge && props.selected &&
				<div className="badge">
					{props.badge}
				</div>
			}
		</div>
	);
}