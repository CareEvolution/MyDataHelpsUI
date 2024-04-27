import React, { createContext, useState } from "react";
import { checkDailyDataAvailability } from "../../../helpers/query-daily-data";
import { startOfDay } from "date-fns";
import { DateRangeContext } from "../../presentational";
import RelativeActivityWeekNavigator from "../RelativeActivityWeekNavigator";
import { useInitializeView } from "../../../helpers/Initialization";
import { RelativeActivityDataType } from "../RelativeActivity/RelativeActivity";

export interface RelativeActivityWeekCoordinatorProps {
    innerRef?: React.Ref<HTMLDivElement>;
    dataTypes: RelativeActivityDataType[];
    previewState?: "default";
    children?: React.ReactNode;
}

export interface RelativeActivityContext {
    dataTypes: RelativeActivityDataType[];
}

export const RelativeActivityContext = createContext<RelativeActivityContext | null>(null);

export default function RelativeActivityDateRangeCoordinator(props: RelativeActivityWeekCoordinatorProps) {
    const [availableDataTypes, setAvailableDataTypes] = useState<RelativeActivityDataType[]>([]);
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
        <div ref={props.innerRef}>
            <RelativeActivityContext.Provider value={{ dataTypes: availableDataTypes }}>
                <DateRangeContext.Provider value={currentContext}>
                    <RelativeActivityWeekNavigator
                        selectedDate={currentContext.intervalStart}
                        onDateSelected={(d) => setCurrentContext({ ...currentContext, intervalStart: d })}
                        dataTypes={availableDataTypes}
                        previewState={props.previewState} />
                    {props.children}
                </DateRangeContext.Provider>
            </RelativeActivityContext.Provider>
        </div>
    );
}