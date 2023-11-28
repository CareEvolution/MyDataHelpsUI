import React from 'react'
import { garminDevicePreviewData } from './GarminDevices.previewdata';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ConnectedDevices, { ConnectedDevicesPreviewState } from '../ConnectedDevices/ConnectedDevices';

export interface GarminDevicesProps {
	previewState?: ConnectedDevicesPreviewState;
	innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: GarminDevicesProps) {
	return (<ConnectedDevices innerRef={props.innerRef} providerName="Garmin" providerNamespace="Garmin" previewData={garminDevicePreviewData} previewState={props.previewState}/>);
}
