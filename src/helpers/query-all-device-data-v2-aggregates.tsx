import MyDataHelps, { DeviceDataV2Aggregate, DeviceDataV2AggregatePage, DeviceDataV2AggregateQuery, Guid } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceDataV2Aggregates(query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> {

    async function getDeviceDataV2Aggregates(): Promise<DeviceDataV2Aggregate[]> {
        const allAggregates: DeviceDataV2Aggregate[] = [];

        try {
            let page = await getDeviceDataV2AggregatesPage();
            allAggregates.push(...page.intervals);

            while (page.nextPageID) {
                page = await getDeviceDataV2AggregatesPage(page.nextPageID);
                allAggregates.push(...page.intervals);
            }
        } catch {
            // ignore.
        }

        return allAggregates;
    }

    function getDeviceDataV2AggregatesPage(pageID?: Guid): Promise<DeviceDataV2AggregatePage> {
        const queryParameters: DeviceDataV2AggregateQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return MyDataHelps.queryDeviceDataV2Aggregate(queryParameters);
    }

    return getDeviceDataV2Aggregates();
}
