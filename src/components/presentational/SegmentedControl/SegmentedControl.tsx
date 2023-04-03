import React from 'react';
import ShinyOverlay from '../ShinyOverlay';
import "./SegmentedControl.css"

export interface SegmentedControlProps {
	segments: { key: string, title: string }[];
	selectedSegment: string;
	onSegmentSelected: Function;
	className?: string;
}

export default function (props: SegmentedControlProps) {
	var width = 100 / props.segments.length;
	return (
		<div className={"mdhui-segmented-control " + (props.className || "")}>
			{props.segments.map((s) =>
				<button className={"mdhui-segment " + (s.key == props.selectedSegment ? "mdhui-segment-selected" : "")}
					key={s.key}
					onClick={() => props.onSegmentSelected(s.key)}
					style={{ width: width + "%" }}>
					{s.key == props.selectedSegment &&
						<ShinyOverlay />
					}
					{s.title}
				</button>
			)}
		</div>
	);
}