import MyDataHelps, {
  DeviceDataNamespace,
  DeviceDataPointQuery,
  DeviceDataV2Namespace,
  DeviceDataV2Query,
} from "@careevolution/mydatahelps-js";

export function simpleAvailabilityCheck(
  namespace: DeviceDataNamespace,
  type: string | string[]
) {
  return function (modifiedAfter?: Date) {
    var parameters: DeviceDataPointQuery = {
      namespace: namespace,
      type: type,
      limit: 1,
    };
    if (modifiedAfter) {
      parameters.modifiedAfter = modifiedAfter.toISOString();
    }
    return MyDataHelps.queryDeviceData(parameters)
      .then(function (result) {
        return result.deviceDataPoints.length > 0;
      })
      .catch(function () {
        return false;
      });
  };
}

export function simpleAvailabilityCheckV2(
  namespace: DeviceDataV2Namespace,
  type: string | string[]
) {
  return async function (modifiedAfter?: Date) {
    const parameters: DeviceDataV2Query = {
      namespace: namespace,
      type: Array.isArray(type) ? type.join(",") : type,
      limit: 1,
      ...(modifiedAfter && { modifiedAfter: modifiedAfter.toISOString() }),
    };
    try {
      const result = await MyDataHelps.queryDeviceDataV2(parameters);
      return result.deviceDataPoints.length > 0;
    } catch {
      return false;
    }
  };
}
