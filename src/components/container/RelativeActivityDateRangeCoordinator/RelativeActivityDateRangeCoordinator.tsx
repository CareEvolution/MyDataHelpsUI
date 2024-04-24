import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { DailyDataType } from "../../../helpers/query-daily-data";
import { ColorDefinition } from "../../../helpers/colors";
import { startOfDay } from "date-fns";
import { DateRangeContext } from "../../presentational";

export interface RelativeActivityDateRangeCoordinatorProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface RelativeActivityCoordinatorDataType {
    dataType: DailyDataType;
    threshold: number;
    color: ColorDefinition;
    overthresholdColor: ColorDefinition;
}

export default function RelativeActivityDateRangeCoordinator(props: RelativeActivityDateRangeCoordinatorProps) {
    let [selectedDay, setSelectedDay] = useState<Date>(startOfDay(new Date()));

    const [currentContext, setCurrentContext] = useState<DateRangeContext>({
        intervalStart: selectedDay,
        intervalType: "Day"
    });

    return (
        <DateRangeContext.Provider value={currentContext}>
            RelativeActivityDateRangeCoordinator
        </DateRangeContext.Provider>
    );
}