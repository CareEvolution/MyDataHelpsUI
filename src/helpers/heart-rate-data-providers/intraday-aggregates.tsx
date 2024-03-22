import MyDataHelps, { Guid, DeviceDataV2AggregateQuery, DeviceDataV2AggregatePage, DeviceDataV2Aggregate } from "@careevolution/mydatahelps-js";
import { parseISO } from "date-fns";

export interface DeviceDataV2AggregateReduced {
    date: Date,
    statisticValue: number
};


export default async function (query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2AggregateReduced[]> {

    async function getDeviceDataV2AggregateData(): Promise<DeviceDataV2AggregateReduced[]> {
        let dataPage = await getDeviceDataV2AggregateDataPage();
        let allData = dataPage.intervals.map(transformToDeviceDataV2AggregateReduced);

        while (dataPage.nextPageID) {
            dataPage = await getDeviceDataV2AggregateDataPage(dataPage.nextPageID);
            allData = allData.concat(dataPage.intervals.map(transformToDeviceDataV2AggregateReduced));
        }
        return allData.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    async function getDeviceDataV2AggregateDataPage(pageID?: Guid): Promise<DeviceDataV2AggregatePage> {
        let queryParameters: DeviceDataV2AggregateQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }

        return await MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
    }

    function transformToDeviceDataV2AggregateReduced( data: DeviceDataV2Aggregate){
        return { date: parseISO(data.date), statisticValue: data.statistics[query.aggregateFunctions[0]] }
    }

    return getDeviceDataV2AggregateData();
}


