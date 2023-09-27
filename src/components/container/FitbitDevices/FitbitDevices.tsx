import React from 'react'
import { fitbitDevicePreviewData } from './FitbitDevices.previewdata';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ConnectedDevices from '../ConnectedDevices';
import { ConnectedDevicesPreviewState } from '../ConnectedDevices/ConnectedDevices';

export interface FitbitDevicesProps {
	previewState?: ConnectedDevicesPreviewState;
	innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: FitbitDevicesProps) {
	return (<ConnectedDevices innerRef={props.innerRef} providerName="Fitbit" providerNamespace="Fitbit" previewData={fitbitDevicePreviewData} previewState={props.previewState} />);
}
