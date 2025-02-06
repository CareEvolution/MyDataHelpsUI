import React, { createContext } from 'react';
import "./Grid.css"

export interface GridProps {
    children?: React.ReactNode;
    gap?: number;
    style?: React.CSSProperties;
    className?: string;
    defaultMargin?: boolean;
}

export interface GridColumnProps {
    children?: React.ReactNode;
    span: number;
}

export interface GridContext {
    gap: number;
}

export const GridContext = createContext<GridContext>({ gap: 16 });

// Can't export as default because of https://github.com/storybookjs/storybook/issues/24665
export function Grid(props: GridProps) {
    let classes = ["mdhui-grid"];
    if (props.className) {
        classes.push(props.className);
    }
    if (props.defaultMargin) {
        classes.push("mdhui-grid-default-margin");
    }

    let style = { ...props.style };
    let gap = (props.gap || props.gap === 0) ? props.gap : 16;
    style.gap = `${gap}px`;
    return <GridContext.Provider value={{ gap: gap }}>
        <div className={classes.join(" ")} style={style}>{props.children}</div>
    </GridContext.Provider>
}

Grid.Column = function (props: GridColumnProps) {
    let widthPercent = props.span / 12 * 100;
    let gridContext = React.useContext(GridContext);
    let width = `calc(${widthPercent}% - ${gridContext.gap}px)`;
    return <div className="mdhui-grid-column" style={{ width: width }}>{props.children}</div>
}