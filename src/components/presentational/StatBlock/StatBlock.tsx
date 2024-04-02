import React, { ReactNode } from "react";
import "./StatBlock.css"

export interface StatBlockProps {
    labelWidth?: string;
    stats: Stat[];
    defaultMargin?: boolean;
    size?: "sm" | "lg"
    alternating?: boolean;
    style?: React.CSSProperties;
}

export interface Stat {
    label: string;
    value: ReactNode;
}

export default function (props: StatBlockProps) {
    let stats = props.stats?.filter(stat => !!stat.value);
    if (!stats || stats.length == 0) { return null; }

    let classes = ["mdhui-stat-block"];
    let size = props.size || "sm";
    classes.push("mdhui-stat-block-" + size);
    if (props.defaultMargin) {
        classes.push("mdhui-stat-block-default-margin");
    }
    if (props.alternating) {
        classes.push("mdhui-stat-block-alternating");
    }

    return <div style={props.style} className={classes.join(" ")}>
        <table cellPadding={0} cellSpacing={0} >
            <colgroup>
                <col style={{ width: props.labelWidth || "1%" }} />
            </colgroup>
            <tbody>
                {stats.map((stat, index) => <tr key={index}><th>{stat.label}</th><td>{stat.value}</td></tr>)}
            </tbody>
        </table>
    </div>;
}