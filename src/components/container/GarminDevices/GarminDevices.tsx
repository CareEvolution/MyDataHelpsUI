import React from 'react'
import { garminDevicePreviewData } from './GarminDevices.previewdata';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ConnectedDevices, { ConnectedDevicesPreviewState } from '../ConnectedDevices/ConnectedDevices';

export interface GarminDevicesProps {
	previewState?: ConnectedDevicesPreviewState;
}

export default function (props: GarminDevicesProps) {
	return (<ConnectedDevices providerName="Garmin" providerNamespace="Garmin" previewData={garminDevicePreviewData} previewState={props.previewState}/>);
}
