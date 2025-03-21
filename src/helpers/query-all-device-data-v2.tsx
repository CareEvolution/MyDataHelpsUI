import MyDataHelps, { DeviceDataV2Page, DeviceDataV2Point, DeviceDataV2Query, Guid } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceDataV2(query: DeviceDataV2Query): Promise<DeviceDataV2Point[]> {

    async function getDeviceDataV2(): Promise<DeviceDataV2Point[]> {
        const allDataPoints: DeviceDataV2Point[] = [];

        try {
            let page = await getDeviceDataV2Page();
            allDataPoints.push(...page.deviceDataPoints);

            while (page.nextPageID) {
                page = await getDeviceDataV2Page(page.nextPageID);
                allDataPoints.push(...page.deviceDataPoints);
            }
        } catch {
            // ignore.
        }

        return allDataPoints;
    }

    function getDeviceDataV2Page(pageID?: Guid): Promise<DeviceDataV2Page> {
        const queryParameters: DeviceDataV2Query = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return MyDataHelps.queryDeviceDataV2(queryParameters);
    }

    return getDeviceDataV2();
}
