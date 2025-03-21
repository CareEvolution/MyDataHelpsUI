import MyDataHelps, { DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceDataV2(query: DeviceDataV2Query): Promise<DeviceDataV2Point[]> {
    const queryParameters: DeviceDataV2Query = { ...query };

    async function getDeviceDataV2(): Promise<DeviceDataV2Point[]> {
        const allDataPoints: DeviceDataV2Point[] = [];

        try {
            let page = await MyDataHelps.queryDeviceDataV2(queryParameters);
            allDataPoints.push(...page.deviceDataPoints);

            while (page.nextPageID) {
                queryParameters.pageID = page.nextPageID;
                page = await MyDataHelps.queryDeviceDataV2(queryParameters);
                allDataPoints.push(...page.deviceDataPoints);
            }
        } catch {
            // ignore.
        }

        return allDataPoints;
    }

    return getDeviceDataV2();
}
