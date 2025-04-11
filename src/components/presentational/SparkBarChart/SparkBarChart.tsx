﻿import React, { useContext } from 'react';
import { LayoutContext, ShinyOverlay } from '..';
import "./SparkBarChart.css";
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export interface SparkBarChartProps {
	averageFillPercent?: number;
	bars: SparkBarChartBar[];
	innerRef?: React.Ref<HTMLDivElement>;
	style?: React.CSSProperties
	gap?: number;
}

export interface SparkBarChartBar {
	color: ColorDefinition;
	barFillPercent: number;
	opacity?: number;
}

export default function SparkBarChart(props: SparkBarChartProps) {
	var width = (100 / props.bars.length);
	let context = useContext(LayoutContext);

	function calculateBarWidth() {
		if (props.gap) {
			return width - props.gap;
		}
		return width;
	}

	return <div ref={props.innerRef} className="mdhui-spark-bar-chart" style={props.style}>
		{props.averageFillPercent !== undefined &&
			<div className="mdhui-spark-bar-chart-average" style={{ bottom: props.averageFillPercent * 100 + "%" }}></div>
		}
		<div className="mdhui-spark-bar-chart-bars">
			{props.bars.map((b, index) =>
				<div key={index} className="mdhui-spark-bar-chart-bar" style={{ backgroundColor: resolveColor(context.colorScheme, b.color), height: (b.barFillPercent * 100) + "%", width: width + "%", left: width * index + "%", opacity: b.opacity }}>
					<ShinyOverlay />
				</div>
			)}
		</div>
	</div>;
}
