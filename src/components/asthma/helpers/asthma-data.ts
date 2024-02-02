import MyDataHelps, { DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import { AsthmaLogEntry } from '../model';

export interface AsthmaDataService {
    loadLogEntries(fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]>;
}

const service: AsthmaDataService = {
    loadLogEntries: async function (fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]> {
        let params: DeviceDataPointQuery = {
            namespace: 'Project',
            type: ['Asthma-LogEntry']
        };
        if (fromDate) {
            params.observedAfter = fromDate.toISOString();
        }
        if (toDate) {
            params.observedBefore = toDate.toISOString();
        }
        let result = await MyDataHelps.queryDeviceData(params);
        return result.deviceDataPoints.map(dp => JSON.parse(dp.value) as AsthmaLogEntry);
    }
};

export default service;