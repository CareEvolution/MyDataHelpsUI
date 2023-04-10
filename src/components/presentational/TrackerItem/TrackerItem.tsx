import React from 'react';
import ShinyOverlay from '../ShinyOverlay';
import UnstyledButton from '../UnstyledButton';
import "./TrackerItem.css"

export interface TrackerItemProps {
	selected: boolean;
	text?: string;
	color: string;
	bordered?: boolean;
	badge?: string;
	onClick?: Function;
	className?: string;
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

	if (props.className) {
		classes.push(props.className);
	}

	var style = {
		borderColor: props.color,
		color: props.color,
		backgroundColor: props.color
	};


	if (props.onClick) {
		return <UnstyledButton className={classes.join(" ")} style={style} onClick={() => props.onClick ? props.onClick() : null}>
			{props.text}
			{props.selected &&
				<ShinyOverlay />
			}
			{props.badge && props.selected &&
				<div className="badge">
					{props.badge}
				</div>
			}
		</UnstyledButton>
	}

	return <div className={classes.join(" ")} style={style} onClick={() => props.onClick ? props.onClick() : null}>
		{props.text}
		{props.selected &&
			<ShinyOverlay />
		}
		{props.badge && props.selected &&
			<div className="badge">
				{props.badge}
			</div>
		}
	</div>;
}