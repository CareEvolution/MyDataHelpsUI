import MyDataHelps, { Guid, DeviceDataV2AggregateQuery, DeviceDataV2AggregatePage, DeviceDataV2Aggregate } from "@careevolution/mydatahelps-js";

export default async function (query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> {

    async function getDeviceDataV2AggregateData(): Promise<DeviceDataV2Aggregate[]> {
        let dataPage = await getDeviceDataV2AggregateDataPage();
        let allData = dataPage.intervals;

        while (dataPage.nextPageID) {
            dataPage = await getDeviceDataV2AggregateDataPage(dataPage.nextPageID);
            allData = allData.concat(dataPage.intervals);
        }

        return allData;
    }

    async function getDeviceDataV2AggregateDataPage(pageID?: Guid): Promise<DeviceDataV2AggregatePage> {
        let queryParameters: DeviceDataV2AggregateQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }

        return await MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
    }

    return getDeviceDataV2AggregateData();
}