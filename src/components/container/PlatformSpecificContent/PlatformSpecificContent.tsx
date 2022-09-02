import React, { useState, useEffect } from 'react';
import MyDataHelps from "@careevolution/mydatahelps-js";

export interface PlatformSpecificContentProps {
	platforms: string[];
	children?: React.ReactNode;
}

export default function (props: PlatformSpecificContentProps) {
	const [platform, setPlatform] = useState("");

	function initialize() {
		MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
			if (deviceInfo) {
				setPlatform((deviceInfo as any).platform);
			}
		});
	}

	useEffect(() => {
		initialize();
	}, []);

	if (props.platforms.indexOf(platform) == -1) {
		return null;
	}

	return (
		<div>
			{props.children}
		</div>
	);
}