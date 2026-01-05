import { DeviceDataNamespace, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import { CombinedDataCollectionSettings } from '../daily-data-providers/combined-data-collection-settings';
import { getSupportedApis, hasV1Data, hasV2Data, SupportedAPIsQuery } from '../daily-data-providers/data-collection-helper';
import { DailyDataAvailabilityCheck } from '../query-daily-data';

export interface AvailabilityCheckOptions {
    requireAllTypes?: boolean;
}

export type DataSource = {
    namespace: DeviceDataNamespace | DeviceDataV2Namespace;
    type: string[];
    options?: AvailabilityCheckOptions;
};

export function sources(...sources: Array<[DeviceDataNamespace | DeviceDataV2Namespace, string | string[], AvailabilityCheckOptions?]>): DataSource[] {
    return sources.map(([namespace, type, options]) => ({
        namespace: namespace,
        type: Array.isArray(type) ? type : [type],
        options: options
    }));
}

export function simpleAvailabilityCheck(namespace: DeviceDataNamespace | DeviceDataV2Namespace, type: string | string[], options?: AvailabilityCheckOptions): DailyDataAvailabilityCheck {
    return async (combinedSettings: CombinedDataCollectionSettings, modifiedAfter?: Date): Promise<boolean> => {
        return await checkSourceAvailability(combinedSettings, sources([namespace, type, options]), modifiedAfter);
    };
}

export function combinedAvailabilityCheck(sources: DataSource[]): DailyDataAvailabilityCheck {
    return async (combinedSettings: CombinedDataCollectionSettings, modifiedAfter?: Date): Promise<boolean> => {
        return await checkSourceAvailability(combinedSettings, sources, modifiedAfter);
    };
}

async function checkSourceAvailability(combinedSettings: CombinedDataCollectionSettings, sources: DataSource[], modifiedAfter?: Date): Promise<boolean> {
    const availabilityChecks = sources.map(async source => {
        const supportedApisQuery: SupportedAPIsQuery = { namespace: source.namespace, types: source.type, requireAllTypes: source.options?.requireAllTypes ?? false };
        const supportedApisResult = getSupportedApis(combinedSettings, supportedApisQuery);

        if (!supportedApisResult.v1.enabled && !supportedApisResult.v2.enabled) {
            return Promise.reject(false);
        }

        const typePromises: Promise<true>[] = [];
        if (supportedApisResult.v1.enabled) {
            typePromises.push(hasV1Data(source.namespace as DeviceDataNamespace, supportedApisResult.v1.types, modifiedAfter));
        }
        if (supportedApisResult.v2.enabled) {
            typePromises.push(hasV2Data(source.namespace as DeviceDataV2Namespace, supportedApisResult.v2.types, modifiedAfter));
        }
        return Promise.any(typePromises);
    });

    return Promise.any(availabilityChecks).catch(() => false);
}
