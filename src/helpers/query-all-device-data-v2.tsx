import MyDataHelps, { DeviceDataV2Page, DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';

export default async function queryAllDeviceDataV2(query: DeviceDataV2Query): Promise<DeviceDataV2Point[]> {
    const queryParameters: DeviceDataV2Query = { ...query };
    const allDataPoints: DeviceDataV2Point[] = [];

    try {
        let page: DeviceDataV2Page;
        do {
            page = await MyDataHelps.queryDeviceDataV2(queryParameters);
            allDataPoints.push(...page.deviceDataPoints);
            queryParameters.pageID = page.nextPageID;
        } while (page.nextPageID);
    } catch {
        // ignore.
    }

    return allDataPoints;
}
