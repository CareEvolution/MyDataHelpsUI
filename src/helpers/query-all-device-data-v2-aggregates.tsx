import MyDataHelps, { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceDataV2Aggregates(query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> {
    const queryParameters: DeviceDataV2AggregateQuery = { ...query };

    async function getDeviceDataV2Aggregates(): Promise<DeviceDataV2Aggregate[]> {
        const allAggregates: DeviceDataV2Aggregate[] = [];

        try {
            let page = await MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
            allAggregates.push(...page.intervals);

            while (page.nextPageID) {
                queryParameters.pageID = page.nextPageID;
                page = await MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
                allAggregates.push(...page.intervals);
            }
        } catch {
            // ignore.
        }

        return allAggregates;
    }

    return getDeviceDataV2Aggregates();
}
