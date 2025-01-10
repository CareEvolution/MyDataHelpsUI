import React from 'react';
import ShinyOverlay from '../ShinyOverlay';
import UnstyledButton from '../UnstyledButton';
import "./SegmentedControl.css"

export interface SegmentedControlProps {
	segments: { key: string, title: string }[];
	selectedSegment?: string;
	onSegmentSelected(segmentKey: string): void;
	className?: string;
	color?: string;
	variant?: "default" | "optionsHorizontal" | "optionsVertical";
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function SegmentedControl(props: SegmentedControlProps) {
	var width = 100 / props.segments.length;

	let classes = ["mdhui-segmented-control"];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.variant == "optionsHorizontal") {
		classes.push("mdhui-segmented-control-options-horizontal");
	}
	if (props.variant == "optionsVertical") {
		classes.push("mdhui-segmented-control-options-vertical");
	}

	return (
		<div ref={props.innerRef} style={{ borderColor: props.color }} className={classes.join(" ")}>
			{props.segments.map((s) =>
				<UnstyledButton className={"mdhui-segment " + (s.key == props.selectedSegment ? "mdhui-segment-selected" : "")}
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
				</UnstyledButton>
			)}
		</div>
	);
}