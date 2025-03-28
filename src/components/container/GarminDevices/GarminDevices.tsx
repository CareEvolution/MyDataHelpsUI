import React from 'react'
import { garminDevicePreviewData } from './GarminDevices.previewdata';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ConnectedDevices, { ConnectedDevicesPreviewState } from '../ConnectedDevices/ConnectedDevices';

export interface GarminDevicesProps {
	previewState?: ConnectedDevicesPreviewState;
	innerRef?: React.Ref<HTMLDivElement>
}

/**
 * This component displays the list of Garmin devices connected to the participant's account.
 */
export default function GarminDevices(props: GarminDevicesProps) {
	return (<ConnectedDevices innerRef={props.innerRef} providerName="Garmin" providerNamespace="Garmin" previewData={garminDevicePreviewData} previewState={props.previewState} />);
}
