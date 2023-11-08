import React, { ReactNode } from "react";
import "./StatBlock.css"

export interface StatBlockProps {
    labelWidth?: string;
    stats: Stat[];
    defaultMargin?: boolean;
}

export interface Stat {
    label: string;
    value: ReactNode;
}

export default function (props: StatBlockProps) {
    let stats = props.stats?.filter(stat => !!stat.value);
    if (!stats || stats.length == 0) { return; }

    return <table cellPadding={0} cellSpacing={0} className={"mdhui-stat-block" + (props.defaultMargin ? " mdhui-stat-block-default-margin" : "")}>
        <colgroup>
            <col style={{ width: props.labelWidth || "1%" }} />
        </colgroup>
        <tbody>
            {stats.map((stat, index) => <tr><th>{stat.label}</th><td>{stat.value}</td></tr>)}
        </tbody>
    </table>
}