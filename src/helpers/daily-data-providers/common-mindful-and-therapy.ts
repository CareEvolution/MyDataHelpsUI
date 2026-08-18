import { DeviceDataV2Point } from '@careevolution/mydatahelps-js';

export function isSilverCloudCbtDataPoint(dataPoint: DeviceDataV2Point): boolean {
    if (dataPoint.properties?.['metadata_sub-type'] !== 'CBT') return false;
    return dataPoint.dataSource?.['sourceIdentifier'] === 'com.silvercloudhealth.SilverCloud';
}