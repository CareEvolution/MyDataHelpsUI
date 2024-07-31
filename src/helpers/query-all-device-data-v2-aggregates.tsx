import MyDataHelps, { DeviceDataV2Aggregate, DeviceDataV2AggregatePage, DeviceDataV2AggregateQuery, Guid } from '@careevolution/mydatahelps-js';

export default async function (query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> {

    async function getDeviceDataV2Aggregates(): Promise<DeviceDataV2Aggregate[]> {
        let page = await getDeviceDataV2AggregatesPage();
        let allAggregates = page.intervals;

        while (page.nextPageID) {
            page = await getDeviceDataV2AggregatesPage(page.nextPageID);
            allAggregates = allAggregates.concat(page.intervals);
        }

        return allAggregates;
    }

    async function getDeviceDataV2AggregatesPage(pageID?: Guid): Promise<DeviceDataV2AggregatePage> {
        let queryParameters: DeviceDataV2AggregateQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return await MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
    }

    return getDeviceDataV2Aggregates();
}
