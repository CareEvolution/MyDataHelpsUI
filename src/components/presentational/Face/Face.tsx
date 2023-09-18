import React, { MouseEventHandler, useContext } from 'react';
import "./Face.css"
import face1 from './face-1.svg';
import face2 from './face-2.svg';
import face3 from './face-3.svg';
import face4 from './face-4.svg';
import face5 from './face-5.svg';
import { ShinyOverlay, UnstyledButton } from '..';
import { LayoutContext } from '../Layout/Layout';

export interface FaceProps {
	faceValue?: number;
	selected?: boolean;
	onClick?: MouseEventHandler;
	className?: string;
    innerRef?: React.Ref<HTMLButtonElement>;
}

export default function (props: FaceProps) {
	let layoutContext = useContext(LayoutContext);
	let imageStyle: React.CSSProperties = {};
	if (layoutContext.colorScheme == "dark" && !props.selected) {
		imageStyle.filter = "invert(1)";
	}

	var className = "mdhui-face";
	if (props.selected) {
		className += " mdhui-face-selected";
	}
	if (props.className) {
		className += " " + props.className;
	}

	function getFace() {
		if (props.faceValue == 1) { return face1; }
		if (props.faceValue == 2) { return face2; }
		if (props.faceValue == 3) { return face3; }
		if (props.faceValue == 4) { return face4; }
		if (props.faceValue == 5) { return face5; }
	}

	if (props.onClick) {
		return <UnstyledButton innerRef={props.innerRef} className={className} onClick={props.onClick}>
			<img src={getFace()} style={imageStyle} />
			<ShinyOverlay />
		</UnstyledButton>
	}

	return (
		<div className={className}>
			<img src={getFace()} style={imageStyle} />
			<ShinyOverlay />
		</div>
	);
}