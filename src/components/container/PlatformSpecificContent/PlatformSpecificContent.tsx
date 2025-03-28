import React, { useEffect, useState } from 'react';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface PlatformSpecificContentProps {
	platforms: string[];
	children?: React.ReactNode;
	previewDevicePlatform?: string;
	innerRef?: React.Ref<HTMLDivElement>
}

/**
 * Displays content based on the device platform (iOS, Android, or Web).
 */
export default function PlatformSpecificContent(props: PlatformSpecificContentProps) {
	const [platform, setPlatform] = useState<string>('');

	useEffect(() => {
		if (props.previewDevicePlatform) {
			setPlatform(props.previewDevicePlatform);
			return;
		}
		MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
			if (deviceInfo) {
				setPlatform(deviceInfo.platform);
			}
		});
	}, []);

	if (!props.platforms.includes(platform)) {
		return null;
	}

	return (
		<div ref={props.innerRef}>
			{props.children}
		</div>
	);
}