import MyDataHelps, { DeviceDataV2Aggregate, DeviceDataV2AggregatePage, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';

export default async function queryAllDeviceDataV2Aggregates(query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> {
    const queryParameters: DeviceDataV2AggregateQuery = { ...query };
    const allAggregates: DeviceDataV2Aggregate[] = [];

    try {
        let page: DeviceDataV2AggregatePage;
        do {
            page = await MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
            allAggregates.push(...page.intervals);
            queryParameters.pageID = page.nextPageID;
        } while (page.nextPageID);
    } catch {
        // ignore.
    }

    return allAggregates;
}
