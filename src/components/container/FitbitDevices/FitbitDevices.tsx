import React, { useState, useEffect } from 'react'
import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery } from "@careevolution/mydatahelps-js"
import "./FitbitDevices.css"
import language from "../../../helpers/language"
import { CardTitle } from '../../presentational';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import formatRelative from 'date-fns/formatRelative'
import parseISO from 'date-fns/parseISO'
import * as FeatherIcon from 'react-feather'
import { fitbitDevicePreviewData } from './FitbitDevices.previewdata';
import { enUS, es } from 'date-fns/locale';

export interface FitbitDevicesProps {
	previewState?: FitbitDevicesPreviewState;
}

export type FitbitDevicesPreviewState = "notEnabled" | "notConnected" | "connected";

export default function (props: FitbitDevicesProps) {
	const [fitbitDevices, setFitbitDevices] = useState<any[]>([]);

	function initialize() {
		if (props.previewState == "connected") {
			setFitbitDevices(fitbitDevicePreviewData);
			return;
		}

		if (props.previewState == "notEnabled" || props.previewState == "notConnected")
		{
			setFitbitDevices([]);
			return;
		}

		var params: DeviceDataPointQuery = {
			namespace: "Fitbit",
			type: "Device"
		}
		MyDataHelps.queryDeviceData(params).then(function (result) {
			setFitbitDevices(result.deviceDataPoints);
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

	if (!fitbitDevices.length) {
		return null;
	}

	var locale = MyDataHelps.getCurrentLanguage() == "es" ? es : enUS;
	return (
		<div className="mdhui-fitbit-devices">
			<CardTitle title={"Fitbit " + language["devices"]} />
			{fitbitDevices.map((device) =>
				<div key={device.id.toString()} className="fitbit-device">
					{device.properties?.Type == 'TRACKER' &&
						<div className="device-icon">
							<FeatherIcon.Watch size="16" />
						</div>
					}
					{device.properties?.Type == 'SCALE' &&
						<div className="device-icon">
							<FontAwesomeIcon icon={faWeightScale} />
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
							<FontAwesomeIcon icon={faBatteryEmpty} transform={{ rotate: -90 }} />
						</div>
					}
					{device.properties?.Battery == 'Low' &&
						<div className="battery-icon battery-low">
							<FontAwesomeIcon icon={faBatteryQuarter} transform={{ rotate: -90 }} />
						</div>
					}
					{device.properties?.Battery == 'Medium' &&
						<div className="battery-icon battery-medium">
							<FontAwesomeIcon icon={faBatteryHalf} transform={{ rotate: -90 }} />
						</div>
					}
					{device.properties?.Battery == 'High' &&
						<div className="battery-icon battery-high">
							<FontAwesomeIcon icon={faBatteryFull} transform={{ rotate: -90 }} />
						</div>
					}
				</div>
			)}
		</div>
	);
}