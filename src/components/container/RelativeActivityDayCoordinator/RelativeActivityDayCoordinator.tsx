import React, { createContext, useState } from "react";
import { checkDailyDataAvailability } from "../../../helpers/query-daily-data";
import { startOfDay } from "date-fns";
import { DateRangeContext } from "../../presentational";
import RelativeActivityDayNavigator from "../RelativeActivityDayNavigator";
import { useInitializeView } from "../../../helpers/Initialization";
import { RelativeActivityDataType, RelativeActivityQueryResult } from "../../../helpers";

export interface RelativeActivityDayCoordinatorProps {
    innerRef?: React.Ref<HTMLDivElement>;
    dataTypes: RelativeActivityDataType[];
    previewState?: "default";
    children?: React.ReactNode;
}

export interface RelativeActivityContext {
    dataTypes: RelativeActivityDataType[];
    data?: { [key: string]: { [key: string]: RelativeActivityQueryResult } };
}

export const RelativeActivityContext = createContext<RelativeActivityContext | null>(null);

export default function RelativeActivityDateRangeCoordinator(props: RelativeActivityDayCoordinatorProps) {
    const [availableDataTypes, setAvailableDataTypes] = useState<RelativeActivityDataType[]>([]);
    const [relativeActivityData, setRelativeActivityData] = useState<{ [key: string]: { [key: string]: RelativeActivityQueryResult } } | undefined>(undefined);
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
            <RelativeActivityContext.Provider value={{ dataTypes: availableDataTypes, data: relativeActivityData }}>
                <DateRangeContext.Provider value={currentContext}>
                    <RelativeActivityDayNavigator
                        selectedDate={currentContext.intervalStart}
                        onDateSelected={(d) => setCurrentContext({ ...currentContext, intervalStart: d })}
                        dataTypes={availableDataTypes}
                        previewState={props.previewState}
                        onDataLoaded={(d) => setRelativeActivityData(d)} />
                    {props.children}
                </DateRangeContext.Provider>
            </RelativeActivityContext.Provider>
        </div>
    );
}