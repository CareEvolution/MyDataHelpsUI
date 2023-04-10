import React from 'react';
import ShinyOverlay from '../ShinyOverlay';
import "./Histogram.css"

export interface HistogramProps {
	entries: {
		label: string;
		color: string;
		value: number;
		onSelect?(): void;
	}[];
	className?: string;
}

export default function (props: HistogramProps) {
	let maxValue = 0;
	props.entries.forEach(function (e) {
		if (e.value > maxValue) {
			maxValue = e.value;
		}
	});

	var sortedEntries = [...props.entries].sort((a, b) => b.value - a.value || ((a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)));

	return (
		<div className={"mdhui-histogram " + (props.className || "")}>
			{sortedEntries.map((entry, index) => {
				return <div className={"mdhui-histogram-entry" + (entry.onSelect ? " mdhui-histogram-entry-clickable" : "")} key={index} onClick={() => entry.onSelect?.()}>
					<div className="mdhui-histogram-entry-bar-wrapper">
						<div className="mdhui-histogram-entry-bar" style={{ background: entry.color, width: ((entry.value / maxValue) * 100) + "%" }}>
							<ShinyOverlay />
						</div>
						<div className="mdhui-histogram-entry-value" style={{ width: (maxValue.toString().length * 8) + "px" }}>{entry.value}</div>
					</div>
					<div className="mdhui-histogram-entry-label">{entry.label}</div>
				</div>;
			})}
		</div>
	);
}