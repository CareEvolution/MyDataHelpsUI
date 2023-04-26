import React from 'react'
import { fitbitDevicePreviewData } from './FitbitDevices.previewdata';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ConnectedDevices from '../ConnectedDevices';
import { ConnectedDevicesPreviewState } from '../ConnectedDevices/ConnectedDevices';

export interface FitbitDevicesProps {
	previewState?: ConnectedDevicesPreviewState;
}

export default function (props: FitbitDevicesProps) {
	return (<ConnectedDevices providerName="Fitbit" providerNamespace="Fitbit" previewData={fitbitDevicePreviewData} previewState={props.previewState}/>);
}
