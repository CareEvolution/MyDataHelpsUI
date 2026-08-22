import React, { useContext } from "react";
import { LayoutContext } from "..";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import "./ContrastChart.css";

export interface ContrastChartGroup {
    label: string;
    average: number;
    formattedAverage: string;
    /** Individual day values, shown as dots in the dotColumns variant. */
    values?: number[];
    color?: ColorDefinition;
}

export interface ContrastChartProps {
    /** "bars" renders a compact horizontal bar per group; "dotColumns" renders each group's
     * individual values as dots around an average tick. */
    variant?: "bars" | "dotColumns";
    groups: ContrastChartGroup[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function ContrastChart(props: ContrastChartProps) {
    const context = useContext(LayoutContext);
    const variant = props.variant ?? "bars";

    function groupColor(group: ContrastChartGroup, index: number) {
        return resolveColor(context.colorScheme, group.color) ?? (index === 0 ? "var(--mdhui-color-primary)" : "var(--mdhui-border-color-2)");
    }

    if (variant === "bars") {
        const maxAverage = Math.max(...props.groups.map(g => g.average), 0);
        return <div ref={props.innerRef} className="mdhui-contrast-chart">
            {props.groups.map((group, index) =>
                <div key={index} className="mdhui-contrast-chart-row">
                    <div className="mdhui-contrast-chart-row-label">{group.label}</div>
                    <div className="mdhui-contrast-chart-row-bar-area">
                        <div className="mdhui-contrast-chart-row-bar" style={{
                            width: maxAverage > 0 ? Math.max(2, (group.average / maxAverage) * 100) + "%" : "2%",
                            backgroundColor: groupColor(group, index)
                        }} />
                    </div>
                    <div className="mdhui-contrast-chart-row-value">{group.formattedAverage}</div>
                </div>
            )}
        </div>;
    }

    const allValues = props.groups.flatMap(g => g.values ?? []);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue;
    // pad the scale so dots at the extremes are not clipped
    const scaleMin = minValue - range * 0.05;
    const scaleMax = maxValue + range * 0.05;
    const positionPercent = (value: number) => scaleMax === scaleMin ? 50 : ((scaleMax - value) / (scaleMax - scaleMin)) * 100;

    return <div ref={props.innerRef} className="mdhui-contrast-chart mdhui-contrast-chart-dot-columns">
        {props.groups.map((group, index) =>
            <div key={index} className="mdhui-contrast-chart-column">
                <div className="mdhui-contrast-chart-column-plot">
                    {(group.values ?? []).map((value, valueIndex) =>
                        <div key={valueIndex} className="mdhui-contrast-chart-dot" style={{
                            top: positionPercent(value) + "%",
                            // deterministic jitter spreads overlapping dots without using randomness
                            left: 20 + ((valueIndex * 0.618034) % 1) * 60 + "%",
                            backgroundColor: groupColor(group, index)
                        }} />
                    )}
                    <div className="mdhui-contrast-chart-average-tick" style={{ top: positionPercent(group.average) + "%" }} />
                </div>
                <div className="mdhui-contrast-chart-column-value">{group.formattedAverage}</div>
                <div className="mdhui-contrast-chart-column-label">{group.label}</div>
            </div>
        )}
    </div>;
}
