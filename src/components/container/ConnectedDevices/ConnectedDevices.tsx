import React, { useState, useEffect } from 'react'
import MyDataHelps, { DeviceDataNamespace, DeviceDataPoint, DeviceDataPointQuery } from "@careevolution/mydatahelps-js"
import "./ConnectedDevices.css"
import language from "../../../helpers/language"
import { CardTitle } from '../../presentational';
import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter, faWeightScale } from "@fortawesome/free-solid-svg-icons"
import { formatRelative, parseISO } from 'date-fns'
import * as FeatherIcon from 'react-feather'
import { getLocaleFromIso } from '../../../helpers/locale';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';

export interface ConnectedDevicesProps {
	providerName: string;
	providerNamespace: DeviceDataNamespace;
	previewState?: ConnectedDevicesPreviewState;
	previewData: DeviceDataPoint[]
	innerRef?: React.Ref<HTMLDivElement>
}

export type ConnectedDevicesPreviewState = "notEnabled" | "notConnected" | "connected";

export default function (props: ConnectedDevicesProps) {
	const [connectedDevices, setConnectedDevices] = useState<any[]>([]);

	function initialize() {
		if (props.previewState == "connected") {
			setConnectedDevices(props.previewData);
			return;
		}

		if (props.previewState == "notEnabled" || props.previewState == "notConnected") {
			setConnectedDevices([]);
			return;
		}

		var params: DeviceDataPointQuery = {
			namespace: props.providerNamespace,
			type: "Device"
		}
		MyDataHelps.queryDeviceData(params).then(function (result) {
			setConnectedDevices(result.deviceDataPoints);
		});
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		MyDataHelps.on("externalAccountSyncComplete", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
			MyDataHelps.off("externalAccountSyncComplete", initialize);
		}
	}, []);

	if (!connectedDevices.length) {
		return null;
	}

	var locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());
	return (
		<div className="mdhui-connected-devices" ref={props.innerRef}>
			<CardTitle title={props.providerName + " " + language("devices")} />
			{connectedDevices.map((device) =>
				<div key={device.id.toString()} className="connected-device">
					{device.properties?.Type == 'TRACKER' &&
						<div className="device-icon">
							<FeatherIcon.Watch size="16" />
						</div>
					}
					{device.properties?.Type == 'SCALE' &&
						<div className="device-icon">
							<FontAwesomeSvgIcon icon={faWeightScale} />
						</div>
					}
					<div className="device-info">
						<div className="device-title">
							{device.value}
						</div>
						{device.observationDate &&
							<div className="device-sync">
								{language("last-sync")} {formatRelative(parseISO(device.observationDate), new Date(), { locale: locale })}
							</div>
						}
					</div>
					{device.properties?.Battery == 'Empty' &&
						<div className="battery-icon battery-empty">
							<FontAwesomeSvgIcon icon={faBatteryEmpty} rotate={-90} />
						</div>
					}
					{device.properties?.Battery == 'Low' &&
						<div className="battery-icon battery-low">
							<FontAwesomeSvgIcon icon={faBatteryQuarter} rotate={-90} />
						</div>
					}
					{device.properties?.Battery == 'Medium' &&
						<div className="battery-icon battery-medium">
							<FontAwesomeSvgIcon icon={faBatteryHalf} rotate={-90} />
						</div>
					}
					{device.properties?.Battery == 'High' &&
						<div className="battery-icon battery-high">
							<FontAwesomeSvgIcon icon={faBatteryFull} rotate={-90} />
						</div>
					}
				</div>
			)}
		</div>
	);
}