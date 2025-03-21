import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage, Guid, } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceData(query: DeviceDataPointQuery): Promise<DeviceDataPoint[]> {

    async function getDeviceData(): Promise<DeviceDataPoint[]> {
        const allDataPoints: DeviceDataPoint[] = [];

        try {
            let page = await getDeviceDataPage();
            allDataPoints.push(...page.deviceDataPoints);

            while (page.nextPageID) {
                page = await getDeviceDataPage(page.nextPageID);
                allDataPoints.push(...page.deviceDataPoints);
            }
        } catch {
            // ignore.
        }

        return allDataPoints;
    }

    function getDeviceDataPage(pageID?: Guid): Promise<DeviceDataPointsPage> {
        const queryParameters: DeviceDataPointQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return MyDataHelps.queryDeviceData(queryParameters);
    }

    return getDeviceData();
}