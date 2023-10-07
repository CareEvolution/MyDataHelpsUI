﻿import React from 'react'
import { ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import ConnectDevice from '../ConnectDevice';
import { getGarminProviderID } from '../../../helpers/providerIDs';
import LibraryImage from '../../presentational/LibraryImage/LibraryImage';

export interface ConnectGarminProps {
	title?: string,
	garminProviderID?: number,
	previewState?: ConnectGarminPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
}

export type ConnectGarminPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function(props: ConnectGarminProps) {
	function getInternalGarminProviderID() {
		return props.garminProviderID || getGarminProviderID();
	}
	
	return (<ConnectDevice innerRef={props.innerRef}  headerImage={<LibraryImage image="GarminLogo" width={30} />} title="Garmin" providerName="Garmin" dataCollectionProperty='garminEnabled' providerID={getInternalGarminProviderID()} previewState={props.previewState} disabledBehavior={props.disabledBehavior} />);
  }
