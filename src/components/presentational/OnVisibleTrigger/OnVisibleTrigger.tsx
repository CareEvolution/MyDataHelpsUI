import React, { useRef, useState } from 'react'
import { useInterval } from '../../../hooks';

export interface OnVisibleTriggerProps {
	onTrigger: Function;
	enabled: boolean;
}

export default function (props: OnVisibleTriggerProps) {
	const loader = useRef<HTMLDivElement>(null);

	function elementIsVisible(elm: HTMLElement) {
		var rect = elm.getBoundingClientRect();
		var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	}
	
	useInterval(() => {
		if (loader.current && elementIsVisible(loader.current as HTMLElement)) {
			props.onTrigger();
		}
	}, !props.enabled ? null : 1000);

	return (
		<div>
			{props.enabled &&
				<div style={{ height: "0px" }} ref={loader} />
			}
		</div>
	);
}