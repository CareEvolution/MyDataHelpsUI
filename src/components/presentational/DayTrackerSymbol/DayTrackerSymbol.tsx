import React from 'react';
import "./DayTrackerSymbol.css"

export interface DayTrackerSymbolProps {
	primaryColors: string[]
	secondaryColors: string[]
	className?: string
}

export default function (props: DayTrackerSymbolProps) {
	//calculate background gradient
	var chunkPercent = 100 / props.primaryColors.length;
	var background = "conic-gradient(";
	var currentPercent = 0;
	for (var i = 0; i < props.primaryColors.length; i++) {
		background = background + props.primaryColors[i] + " " + currentPercent + "%, ";
		currentPercent += chunkPercent;
		background = background + props.primaryColors[i] + " " + currentPercent + "%";
		if (i != props.primaryColors.length - 1) {
			background += ", ";
		}
	}
	background += ")";

	var style = { background: background };

	return (
		<div className="mdhui-day-tracker-symbol">
			<div className="day-circle" style={style}>
				{props.secondaryColors.slice(0, 3).map((color, index) =>
					<div key={index} className="secondary-color" style={{ background: color }}></div>
				)}
				{props.secondaryColors.length > 3 &&
					<div className="more-items">+</div>
				}
			</div>
		</div>
	);
}