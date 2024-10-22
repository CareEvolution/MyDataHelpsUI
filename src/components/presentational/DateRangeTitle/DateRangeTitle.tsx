import React, { useContext } from "react";
import Title, { TitleProps } from "../Title/Title";
import { ColorDefinition } from "../../../helpers";
import { DateRangeContext } from "../DateRangeCoordinator";
import { titleForDateRange } from "../../../helpers/date-helpers";
import { startOfDay } from "date-fns";
import { noop } from "../../../helpers/functions";

export interface DateRangeTitleProps extends TitleProps {
    color?: ColorDefinition
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    style?: React.CSSProperties;
    defaultMargin?: boolean
    innerRef?: React.Ref<HTMLDivElement>
}

export default function DateRangeTitle(props: DateRangeTitleProps) {
    let context = useContext(DateRangeContext);
    if (!context) {
        context = {
            intervalStart: startOfDay(new Date()),
            intervalType: "Day",
            update: noop
        };
    }

    return <Title defaultMargin={props.defaultMargin} order={props.order || 3} color={props.color} style={props.style} innerRef={props.innerRef}>
        {titleForDateRange(context.intervalType, context.intervalStart, "long")}
    </Title>
}