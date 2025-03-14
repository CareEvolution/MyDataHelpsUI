import MyDataHelps, { DeviceDataV2Page, DeviceDataV2Point, DeviceDataV2Query, Guid } from '@careevolution/mydatahelps-js';

export default async function (query: DeviceDataV2Query): Promise<DeviceDataV2Point[]> {

    async function getDeviceDataV2(): Promise<DeviceDataV2Point[]> {
        let page = await getDeviceDataV2Page();
        let allDataPoints = page.deviceDataPoints;

        while (page.nextPageID) {
            page = await getDeviceDataV2Page(page.nextPageID);
            allDataPoints = allDataPoints.concat(page.deviceDataPoints);
        }

        return allDataPoints;
    }

    async function getDeviceDataV2Page(pageID?: Guid): Promise<DeviceDataV2Page> {
        let queryParameters: DeviceDataV2Query = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return await MyDataHelps.queryDeviceDataV2(queryParameters);
    }

    return getDeviceDataV2();
}
