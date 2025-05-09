import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage, } from '@careevolution/mydatahelps-js';

export default async function queryAllDeviceData(query: DeviceDataPointQuery): Promise<DeviceDataPoint[]> {
    const queryParameters: DeviceDataPointQuery = { ...query };
    const allDataPoints: DeviceDataPoint[] = [];

    try {
        let page: DeviceDataPointsPage;
        do {
            page = await MyDataHelps.queryDeviceData(queryParameters);
            allDataPoints.push(...page.deviceDataPoints);
            queryParameters.pageID = page.nextPageID;
        } while (page.nextPageID);
    } catch {
        // ignore.
    }

    return allDataPoints;
}