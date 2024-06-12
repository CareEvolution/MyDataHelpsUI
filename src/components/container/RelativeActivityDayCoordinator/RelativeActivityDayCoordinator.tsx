import React, { createContext, useState } from "react";
import { checkDailyDataAvailability } from "../../../helpers/query-daily-data";
import { startOfDay } from "date-fns";
import { DateRangeContext, LoadingIndicator } from "../../presentational";
import RelativeActivityDayNavigator from "../RelativeActivityDayNavigator";
import { useInitializeView } from "../../../helpers/Initialization";
import { RelativeActivityDataType, RelativeActivityQueryResult } from "../../../helpers";

export interface RelativeActivityDayCoordinatorProps {
    innerRef?: React.Ref<HTMLDivElement>;
    dataTypes: RelativeActivityDataType[];
    previewState?: "default";
    children?: React.ReactNode;
    keyType?: RelativeActivityDataType;
    keyTypeIcon?: React.ReactNode;
}

export interface RelativeActivityContext {
    dataTypes: RelativeActivityDataType[];
    data?: { [key: string]: { [key: string]: RelativeActivityQueryResult } };
}

export const RelativeActivityContext = createContext<RelativeActivityContext | null>(null);

export default function RelativeActivityDateRangeCoordinator(props: RelativeActivityDayCoordinatorProps) {
    const [availableDataTypes, setAvailableDataTypes] = useState<RelativeActivityDataType[] | null>(null);
    const [relativeActivityData, setRelativeActivityData] = useState<{ [key: string]: { [key: string]: RelativeActivityQueryResult } } | undefined>(undefined);
    const [currentDateContext, setCurrentContext] = useState<DateRangeContext>({
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
            {availableDataTypes === null && <LoadingIndicator />}
            {availableDataTypes !== null &&
                <RelativeActivityContext.Provider value={{ dataTypes: availableDataTypes, data: relativeActivityData }}>
                    <DateRangeContext.Provider value={currentDateContext}>
                        <RelativeActivityDayNavigator
                            selectedDate={currentDateContext.intervalStart}
                            onDateSelected={(d) => setCurrentContext({ ...currentDateContext, intervalStart: d })}
                            dataTypes={availableDataTypes}
                            previewState={props.previewState}
                            onDataLoaded={(d) => setRelativeActivityData(d)}
                            keyType={props.keyType}
                            keyTypeIcon={props.keyTypeIcon} />
                        {relativeActivityData && props.children}
                    </DateRangeContext.Provider>
                </RelativeActivityContext.Provider>
            }
        </div>
    );
}