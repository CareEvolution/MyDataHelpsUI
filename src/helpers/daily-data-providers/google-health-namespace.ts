import { DeviceDataV2Namespace, SupportedDeviceDataV2DataType } from '@careevolution/mydatahelps-js';

/*
 * BRIDGE — remove once the MyDataHelps.js SDK ships Google Health support.
 *
 * The pending @careevolution/mydatahelps-js release adds the "GoogleHealth" device data
 * V2 namespace and the googleHealthEnabled flag on DataCollectionSettings. Until it is
 * published we widen the V2 namespace locally so Google Health can be wired into the daily
 * data system (the googleHealthEnabled settings flag is declared ambiently in
 * src/components/@types/custom.d.ts). When the SDK includes these, delete this file and
 * replace DeviceDataV2NamespaceEx / SupportedDeviceDataV2DataTypeEx with the SDK's own
 * DeviceDataV2Namespace / SupportedDeviceDataV2DataType.
 */

export const googleHealthNamespace = 'GoogleHealth';

/** The V2 namespace string for Google Health data (not yet in the SDK's union). */
export type GoogleHealthNamespace = 'GoogleHealth';

/** DeviceDataV2Namespace widened to include Google Health until the SDK adds it. */
export type DeviceDataV2NamespaceEx = DeviceDataV2Namespace | GoogleHealthNamespace;

/** SupportedDeviceDataV2DataType widened to include the Google Health namespace. */
export type SupportedDeviceDataV2DataTypeEx = Omit<SupportedDeviceDataV2DataType, 'namespace'> & {
    namespace: DeviceDataV2NamespaceEx;
};
