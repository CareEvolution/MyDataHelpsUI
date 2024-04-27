import MyDataHelps, { DeviceDataNamespace, DeviceDataPointQuery } from "@careevolution/mydatahelps-js";

export function simpleAvailabilityCheck(namespace: DeviceDataNamespace, type: string | string[]) {
	return function (modifiedAfter?: Date) {
		var parameters: DeviceDataPointQuery = { namespace: namespace, type: type, limit: 1 };
		if (modifiedAfter) {
			parameters.modifiedAfter = modifiedAfter.toISOString();
		}
		return MyDataHelps.queryDeviceData(parameters).then(function (result) {
			return result.deviceDataPoints.length > 0;
		}).catch(function () {
			return false;
		});
	}
}