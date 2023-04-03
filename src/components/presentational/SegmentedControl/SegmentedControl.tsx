import React from 'react';
import ShinyOverlay from '../ShinyOverlay';
import "./SegmentedControl.css"

export interface SegmentedControlProps {
	segments: { key: string, title: string }[];
	selectedSegment: string;
	onSegmentSelected: Function;
	className?: string;
	color?: string;
}

export default function (props: SegmentedControlProps) {
	var width = 100 / props.segments.length;
	return (
		<div style={{ borderColor: props.color }} className={"mdhui-segmented-control " + (props.className || "")}>
			{props.segments.map((s) =>
				<button className={"mdhui-segment " + (s.key == props.selectedSegment ? "mdhui-segment-selected" : "")}
					key={s.key}
					onClick={() => props.onSegmentSelected(s.key)}
					style={{
						width: width + "%",
						color: s.key == props.selectedSegment ? undefined : props.color,
						backgroundColor: s.key == props.selectedSegment ? props.color : undefined
					}}>
					{s.key == props.selectedSegment &&
						<ShinyOverlay />
					}
					{s.title}
				</button>
			)}
		</div>
	);
}