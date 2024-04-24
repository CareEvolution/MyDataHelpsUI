import React, { useContext } from "react";
import Title from "../Title";
import { TitleProps } from "../Title/Title";
import { ColorDefinition } from "../../../helpers/colors";
import { DateRangeContext } from "../DateRangeCoordinator";
import { titleForDateRange } from "../../../helpers/date-helpers";
import { startOfDay } from "date-fns";

export interface DateRangeTitleProps extends TitleProps {
    color?: ColorDefinition
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    style?: React.CSSProperties;
    defaultMargin?: boolean
}

export default function DateRangeTitle(props: DateRangeTitleProps) {
    let context = useContext(DateRangeContext);
    if (!context) {
        context = {
            intervalStart: startOfDay(new Date()),
            intervalType: "Day"
        };
    };

    return <Title defaultMargin={props.defaultMargin} order={props.order || 3} color={props.color} style={props.style}>
        {titleForDateRange(context.intervalType, context.intervalStart, "long")}
    </Title>
}