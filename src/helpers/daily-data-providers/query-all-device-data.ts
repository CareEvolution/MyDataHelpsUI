import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceData(query: DeviceDataPointQuery): Promise<DeviceDataPoint[]> {
    const queryParameters: DeviceDataPointQuery = { ...query };

    async function getDeviceData(): Promise<DeviceDataPoint[]> {
        const allDataPoints: DeviceDataPoint[] = [];

        try {
            let page = await MyDataHelps.queryDeviceData(queryParameters);
            allDataPoints.push(...page.deviceDataPoints);

            while (page.nextPageID) {
                queryParameters.pageID = page.nextPageID;
                page = await MyDataHelps.queryDeviceData(queryParameters);
                allDataPoints.push(...page.deviceDataPoints);
            }
        } catch {
            // ignore.
        }

        return allDataPoints;
    }

    return getDeviceData();
}