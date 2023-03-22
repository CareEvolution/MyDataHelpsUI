import React, { useState, useEffect } from 'react'
import MyDataHelps, { DeviceDataPointQuery } from "@careevolution/mydatahelps-js"
import "./GarminDevices.css"
import language from "../../../helpers/language"
import { CardTitle } from '../../presentational';
import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons/faBatteryEmpty"
import { faBatteryFull } from "@fortawesome/free-solid-svg-icons/faBatteryFull"
import { faBatteryHalf } from "@fortawesome/free-solid-svg-icons/faBatteryHalf"
import { faBatteryQuarter } from "@fortawesome/free-solid-svg-icons/faBatteryQuarter"
import { faWeightScale } from "@fortawesome/free-solid-svg-icons/faWeightScale"
import formatRelative from 'date-fns/formatRelative'
import parseISO from 'date-fns/parseISO'
import * as FeatherIcon from 'react-feather'
import { garminDevicePreviewData } from './GarminDevices.previewdata';
import { enUS, es } from 'date-fns/locale';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';

export interface GarminDevicesProps {
	previewState?: GarminDevicesPreviewState;
}

export type GarminDevicesPreviewState = "notEnabled" | "notConnected" | "connected";

export default function (props: GarminDevicesProps) {
	const [garminDevices, setGarminDevices] = useState<any[]>([]);

	function initialize() {
		if (props.previewState == "connected") {
			setGarminDevices(garminDevicePreviewData);
			return;
		}

		if (props.previewState == "notEnabled" || props.previewState == "notConnected") {
			setGarminDevices([]);
			return;
		}

		var params: DeviceDataPointQuery = {
			namespace: "Garmin",
			type: "Device"
		}
		MyDataHelps.queryDeviceData(params).then(function (result) {
			setGarminDevices(result.deviceDataPoints);
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

	if (!garminDevices.length) {
		return null;
	}

	var locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	return (
		<div className="mdhui-garmin-devices">
			<CardTitle title={"Garmin " + language["devices"]} />
			{garminDevices.map((device) =>
				<div key={device.id.toString()} className="garmin-device">
					{device.properties?.Type == 'TRACKER' &&
						<div className="device-icon">
							<FeatherIcon.Watch size="16" />
						</div>
					}
					<div className="device-info">
						<div className="device-title">
							{device.value}
						</div>
						{device.observationDate &&
							<div className="device-sync">
								{language["last-sync"]} {formatRelative(parseISO(device.observationDate), new Date(), { locale: locale })}
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