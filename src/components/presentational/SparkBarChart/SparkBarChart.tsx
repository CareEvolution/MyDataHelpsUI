import React from 'react';
import { ShinyOverlay } from '..';
import "./SparkBarChart.css"

export interface SparkBarChartProps {
	averageFillPercent: number;
	bars: SparkBarChartBar[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface SparkBarChartBar {
	color: string;
	barFillPercent: number;
}

export default function (props: SparkBarChartProps) {
	var width = (100 / props.bars.length);

	return <div ref={props.innerRef} className="mdhui-spark-bar-chart">
		<div className="mdhui-spark-bar-chart-average" style={{ bottom: props.averageFillPercent * 100 + "%" }}></div>
		<div className="mdhui-spark-bar-chart-bars">
			{props.bars.map((b, index) =>
				<div key={index} className="mdhui-spark-bar-chart-bar" style={{ backgroundColor: b.color, height: (b.barFillPercent * 100) + "%", width: width + "%", left: width * index + "%" }}>
					<ShinyOverlay />
				</div>
			)}
		</div>
	</div>;
}
