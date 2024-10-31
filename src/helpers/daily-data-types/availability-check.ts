import MyDataHelps, { DeviceDataNamespace, DeviceDataPointQuery, DeviceDataV2AggregateQuery, DeviceDataV2Namespace, DeviceDataV2Query } from "@careevolution/mydatahelps-js";

export function simpleAvailabilityCheck(namespace: DeviceDataNamespace, type: string | string[]): (modifiedAfter?: Date) => Promise<boolean> {
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

// todo: test
export function simpleAvailabilityCheckV2(namespace: DeviceDataV2Namespace, type: string): (modifiedAfter?: Date) => Promise<boolean> {
	return function (modifiedAfter?: Date) {
		var parameters: DeviceDataV2Query = { 
			namespace: namespace, 
			type: type, 
			limit: 1 
		};
		if (modifiedAfter) {
			parameters.modifiedAfter = modifiedAfter.toISOString();
		}
		
		return MyDataHelps.queryDeviceDataV2(parameters).then(function (result) {
			return result.deviceDataPoints.length > 0;
		}).catch(function () {
			return false;
		});
	}
}

// todo: test
export function simpleAvailabilityCheckV2Aggregate(namespace: DeviceDataV2Namespace, type: string, aggregateFunctions: string | string[]): (modifiedAfter?: Date) => Promise<boolean> {
	return function (modifiedAfter?: Date) {
		var parameters: DeviceDataV2AggregateQuery = { 
			namespace: namespace, 
			type: type, 
			limit: 1,
			intervalAmount: 1,
			intervalType: "Days",
			aggregateFunctions: aggregateFunctions
		};
		if (modifiedAfter) {
			parameters.modifiedAfter = modifiedAfter.toISOString();
		}
		
		return MyDataHelps.queryDeviceDataV2Aggregate(parameters).then(function (result) {
			return result.intervals.length > 0;
		}).catch(function () {
			return false;
		});
	}
}

export function combinedAvailabilityCheck(
			parameters?: { namespace: DeviceDataNamespace, type: string | string[] }[], 
			v2AggregateParameters?: { namespace: DeviceDataV2Namespace, type: string, aggregateFunctions: string | string[] }[],
			v2Parameters?: { namespace: DeviceDataV2Namespace, type: string }[]): (modifiedAfter?: Date) => Promise<boolean> {
	return function(modifiedAfter?: Date) {
		var checks: any[] = [];
		if (parameters) {
			checks.concat( parameters.map(param => simpleAvailabilityCheck(param.namespace, param.type)) );
		} 
		if (v2AggregateParameters) {
			checks.concat( v2AggregateParameters.map(param => simpleAvailabilityCheckV2Aggregate(param.namespace, param.type, param.aggregateFunctions)) );
		}
		if (v2Parameters) {
			checks.concat( v2Parameters.map(param => simpleAvailabilityCheckV2(param.namespace, param.type)) );
		}
		
		return Promise.allSettled(checks.map(check => check(modifiedAfter))).then(function (results) {
			return results.some(result => result.status === 'fulfilled' && result.value === true); 
		});
	}
};

		