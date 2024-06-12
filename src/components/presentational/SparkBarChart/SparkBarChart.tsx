import React, { useContext } from 'react';
import { LayoutContext, ShinyOverlay } from '..';
import "./SparkBarChart.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';

export interface SparkBarChartProps {
	averageFillPercent?: number;
	bars: SparkBarChartBar[];
	innerRef?: React.Ref<HTMLDivElement>;
	horizontal?: boolean;
	barSpacing?: number;
}

export interface SparkBarChartBar {
	color: ColorDefinition;
	barFillPercent: number;
}

export default function (props: SparkBarChartProps) {
	var width = (100 / props.bars.length);
	let context = useContext(LayoutContext);

	let classes = ["mdhui-spark-bar-chart"];
	if (props.horizontal) {
		classes.push("mdhui-spark-bar-chart-horizontal");
	}

	return <div ref={props.innerRef} className={classes.join(" ")}>
		{props.averageFillPercent !== undefined && !props.horizontal &&
			<div className="mdhui-spark-bar-chart-average" style={{ bottom: props.averageFillPercent * 100 + "%" }}></div>
		}
		<div className="mdhui-spark-bar-chart-bars">
			{props.bars.map((b, index) => !props.horizontal ?

				<div key={index} className="mdhui-spark-bar-chart-bar" style={{
					backgroundColor: resolveColor(context.colorScheme, b.color),
					height: (b.barFillPercent * 100) + "%",
					width: width + "%",
					left: width * index + "%"
				}}>
					<ShinyOverlay />
				</div> :
				<div key={index} className="mdhui-spark-bar-chart-bar" style={{
					backgroundColor: resolveColor(context.colorScheme, b.color),
					width: (b.barFillPercent * 100) + "%",
					height: width + "%",
					bottom: width * index + "%"
				}}>
					<ShinyOverlay />
				</div>
			)}
		</div>
	</div>;
}
