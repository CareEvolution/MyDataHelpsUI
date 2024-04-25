import React, { useState } from "react";
import { checkDailyDataAvailability } from "../../../helpers/query-daily-data";
import { startOfDay } from "date-fns";
import { DateRangeContext } from "../../presentational";
import RelativeActivityWeekNavigator from "../RelativeActivityWeekNavigator";
import { WeeklyRelativeActivityDataType } from "../RelativeActivityWeekNavigator/RelativeActivityWeekNavigator";
import { useInitializeView } from "../../../helpers/Initialization";

export interface RelativeActivityWeekCoordinatorProps {
    innerRef?: React.Ref<HTMLDivElement>;
    dataTypes: WeeklyRelativeActivityDataType[];
    previewState?: "default";
    children?: React.ReactNode;
}

export default function RelativeActivityDateRangeCoordinator(props: RelativeActivityWeekCoordinatorProps) {
    const [availableDataTypes, setAvailableDataTypes] = useState<WeeklyRelativeActivityDataType[]>([]);
    const [currentContext, setCurrentContext] = useState<DateRangeContext>({
        intervalStart: startOfDay(new Date()),
        intervalType: "Day"
    });

    function checkAvailableDataTypes() {
        if (props.previewState === "default") {
            setAvailableDataTypes(props.dataTypes);
            return;
        }

        let promises = props.dataTypes.map(dataType => checkDailyDataAvailability(dataType.dailyDataType));
        Promise.all(promises).then(results => {
            let availableDataTypes = props.dataTypes.filter((dataType, index) => results[index]);
            setAvailableDataTypes(availableDataTypes);
        });
    }

    useInitializeView(() => {
        checkAvailableDataTypes();
    }, ['externalAccountSyncComplete'], [props.dataTypes, props.previewState]);

    return (
        <DateRangeContext.Provider value={currentContext}>
            <RelativeActivityWeekNavigator
                selectedDate={currentContext.intervalStart}
                onDateSelected={(d) => setCurrentContext({ ...currentContext, intervalStart: d })}
                dataTypes={availableDataTypes}
                previewState={props.previewState} />
            {props.children}
        </DateRangeContext.Provider>
    );
}