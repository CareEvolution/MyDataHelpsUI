import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./IncentiveBar.css";
import React, { useEffect, useState } from "react";
import { faStar } from '@fortawesome/free-solid-svg-icons';

export interface IncentiveBarProps {
	primaryColorString?: string;
	secondaryColorString?: string;
	increments: number;
	totalAvailable: number;
	earned: number;
	showDetail: boolean;
}

export default function IncentiveBar(props: IncentiveBarProps) {
	const [mainColor, setMainColor] = useState<string>('#00A862');
	const [secondaryColor, setSecondaryColor] = useState<string>('#80D4B0');
	const [calculatedWidth, setCalculatedWidth] = useState<string>("0px");
	const containerRef = React.createRef<HTMLDivElement>();

	function getStarStyle(earned: number, threshold: number) {
		return {
			color: earned >= threshold ? '#fff' : mainColor,
			backgroundColor: earned >= threshold ? mainColor : '#fff',
			borderColor: secondaryColor
		}
	}

	useEffect(() => {
		if (props.primaryColorString) {
			setMainColor(props.primaryColorString);
		}
		if (props.secondaryColorString) {
			setSecondaryColor(props.secondaryColorString);
		}
	}, [props.primaryColorString, props.secondaryColorString]);

	function getWidthStyle(style: string) {
		const starWidthStr = containerRef != null ? window.getComputedStyle(containerRef!.current!).getPropertyValue(style) : "0px";
		return parseInt(starWidthStr.substring(0, starWidthStr.length - 2));		
	}

	useEffect(() => {
		if (props.totalAvailable % props.increments != 0) {
			console.error("IncentiveBar increments must be a factor of totalAvailable");
		}
		const totalStars = props.totalAvailable / props.increments + 1;
		const earned = props.earned / props.increments;
		const starWidth = getWidthStyle('--star_size');
		const containerWidth = getWidthStyle('width');
		const spaceBetweenStars = (containerWidth - (totalStars * starWidth)) / (totalStars - 1);
		setCalculatedWidth((earned * (spaceBetweenStars + starWidth) + starWidth / 2) + "px");
	}, [props.totalAvailable, props.increments, props.earned]);

	return (
		<div className="incentive-bar" ref={containerRef}>
			<div className="incentive-bar-background" style={{ borderColor: mainColor }}>
				<div className="incentive-stars">
					{props.showDetail &&
						<>
							{[...Array(props.totalAvailable % props.increments == 0 ? props.totalAvailable / props.increments : 1)].map((_e, i) =>
								<div key={`${i}-star`} className={`incentive-star ${props.earned >= i * props.increments ? "reward-earned" : "reward-waiting"} ${props.earned == i * props.increments ? 'incentive-text' : ''}`} style={getStarStyle(props.earned, i * props.increments)}>
									{props.earned == i * props.increments &&
										<span>{props.earned}</span>
									}
									{props.earned != i * props.increments &&

										<span><FontAwesomeIcon icon={faStar} /></span>
									}
								</div>
							)}

							<div className={`incentive-star incentive-text ${props.earned >= props.totalAvailable ? "reward-earned" : "reward-waiting"}`} style={getStarStyle(props.earned, props.totalAvailable)}>

								<span style={{ position: 'relative', top: '1px' }}>{props.totalAvailable}</span>
							</div>
						</>
					}
					{!props.showDetail &&
						<span>&nbsp;</span>
					}
				</div>
				<div className="incentive-bar-earned" style={{ width: calculatedWidth, backgroundColor: mainColor }}>
				</div>
			</div>
		</div>
	);
}