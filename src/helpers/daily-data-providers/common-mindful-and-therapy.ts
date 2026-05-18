import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';

export function isSilverCloudCbtDataPoint(dataPoint: DeviceDataPoint | DeviceDataV2Point): boolean {
    if (dataPoint.properties?.['Metadata_sub-type'] !== 'CBT') return false;

    if ("dataSource" in dataPoint) {
        return dataPoint.dataSource?.['SourceIdentifier'] === 'com.silvercloudhealth.SilverCloud';
    }

    if ("source" in dataPoint) {
        return dataPoint.source?.properties?.['SourceIdentifier'] === 'com.silvercloudhealth.SilverCloud';
    }

    return false;
}