import { describe, expect, test } from '@jest/globals';
import { DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { isSilverCloudCbtDataPoint } from '../../../src/helpers/daily-data-providers/common-mindful-and-therapy';

describe('Daily Data Provider - Common Mindful Therapy', () => {
    describe('isSilverCloudCbtDataPoint', () => {
        test.each([
            { title: 'No Source Identifier, No Metadata Subtype', expected: false },
            { title: 'Correct Source Identifier, No Metadata Subtype', sourceIdentifier: 'com.silvercloudhealth.SilverCloud', expected: false },
            { title: 'Correct Source Identifier, Wrong Metadata Subtype', sourceIdentifier: 'com.silvercloudhealth.SilverCloud', metadataSubtype: 'Other', expected: false },
            { title: 'Correct Metadata Subtype, No Source Identifier', metadataSubtype: 'CBT', expected: false },
            { title: 'Correct Metadata Subtype, Wrong Source Identifier', sourceIdentifier: 'Other', metadataSubtype: 'CBT', expected: false },
            { title: 'Correct Source Identifier, Correct Metadata Subtype', sourceIdentifier: 'com.silvercloudhealth.SilverCloud', metadataSubtype: 'CBT', expected: true }
        ])('$title - Should return "$expected".', ({ sourceIdentifier, metadataSubtype, expected }) => {
            const dataPoint = {} as DeviceDataV2Point;
            if (sourceIdentifier) {
                dataPoint.dataSource = { 'sourceIdentifier': sourceIdentifier };
            }
            if (metadataSubtype) {
                dataPoint.properties = { 'metadata_sub-type': metadataSubtype };
            }
            expect(isSilverCloudCbtDataPoint(dataPoint)).toBe(expected);
        });
    });
});
