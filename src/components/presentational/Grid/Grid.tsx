import React, { createContext } from 'react';
import "./Grid.css"
import Card from '../Card';

export interface GridProps {
    children?: React.ReactNode;
    gap?: number;
    style?: React.CSSProperties;
    className?: string;
    defaultMargin?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface GridColumnProps {
    children?: React.ReactNode;
    span: number;
    variant?: "default" | "card";
    innerRef?: React.Ref<HTMLDivElement>;
    style?: React.CSSProperties;
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

    const style = { ...props.style };
    const gap = (props.gap || props.gap === 0) ? props.gap : 16;
    style.gap = `${gap}px`;
    return <GridContext.Provider value={{ gap: gap }}>
        <div ref={props.innerRef} className={classes.join(" ")} style={style}>{props.children}</div>
    </GridContext.Provider>
}

Grid.Column = function (props: GridColumnProps) {
    if (!props.children) {
        return null;
    }

    const widthPercent = props.span / 12 * 100;
    const gridContext = React.useContext(GridContext);
    const width = `calc(${widthPercent}% - ${gridContext.gap}px)`;
    const style = { ...props.style, width: width };

    if (props.variant === "card") {
        return <Card innerRef={props.innerRef} className="mdhui-grid-column" style={style}>{props.children}</Card>
    } else {
        return <div ref={props.innerRef} className="mdhui-grid-column" style={style}>{props.children}</div>
    }
}