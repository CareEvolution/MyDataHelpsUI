import React, { useContext } from 'react';
import { LayoutContext, ShinyOverlay } from '..';
import "./SparkBarChart.css";
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export interface SparkBarChartProps {
	averageFillPercent?: number;
	bars: SparkBarChartBar[];
	innerRef?: React.Ref<HTMLDivElement>;
	style?: React.CSSProperties
	gap?: number;
	variant?: "square" | "rounded";
}

export interface SparkBarChartBar {
	color: ColorDefinition;
	barFillPercent: number;
	opacity?: number;
}

export default function SparkBarChart(props: SparkBarChartProps) {
	let context = useContext(LayoutContext);

	var barWidth = (100 / props.bars.length);
	function calculateBarWidth() {
		if (props.gap) {
			return `calc(${barWidth}% - ${props.gap}px)`;
		}
		return barWidth + "%";
	}

	function calculateOffset(index: number) {
		if (props.gap) {
			return `calc(${barWidth * index}% + ${props.gap / 2}px)`;
		}
		return `${barWidth * index}%`;
	}

	let classes = ["mdhui-spark-bar-chart"];
	if (props.variant === "rounded") {
		classes.push("mdhui-spark-bar-chart-rounded");
	}

	return <div ref={props.innerRef} className={classes.join(" ")} style={props.style}>
		{props.averageFillPercent !== undefined &&
			<div className="mdhui-spark-bar-chart-average" style={{ bottom: props.averageFillPercent * 100 + "%" }}></div>
		}
		<div className="mdhui-spark-bar-chart-bars">
			{props.bars.map((b, index) =>
				<div key={index} className="mdhui-spark-bar-chart-bar" style={{ backgroundColor: resolveColor(context.colorScheme, b.color), height: (b.barFillPercent * 100) + "%", width: calculateBarWidth(), left: calculateOffset(index), opacity: b.opacity }}>
					<ShinyOverlay />
				</div>
			)}
		</div>
	</div>;
}
