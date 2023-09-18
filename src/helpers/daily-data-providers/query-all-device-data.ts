import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, Guid, } from '@careevolution/mydatahelps-js';

export default function queryAllDeviceData(parameters: DeviceDataPointQuery) {
	var allDeviceDataPoints: DeviceDataPoint[] = [];
	var queryPage = function (pageID?: Guid): Promise<DeviceDataPoint[]> {
		var queryParameters = { ...parameters };
		if (pageID) {
			queryParameters.pageID = pageID;
		}
		return MyDataHelps.queryDeviceData(queryParameters).then(function (result) {
			allDeviceDataPoints = allDeviceDataPoints.concat(result.deviceDataPoints);
			if (result.nextPageID) {
				return queryPage(result.nextPageID);
			} else {
				return allDeviceDataPoints;
			}
		}).catch(function (error) {
			return allDeviceDataPoints;
		});
	}
	return queryPage();
}