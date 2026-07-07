import React, { useState } from 'react'
import './AppDownload.css'
import MyDataHelps, { ProjectInfo } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import PlatformSpecificContent from '../PlatformSpecificContent/PlatformSpecificContent';
import { useInitializeView } from '../../../helpers/Initialization';
import TextBlock from '../../presentational/TextBlock';
import language, { getCurrentLocale } from "../../../helpers/language";
import { CardTitle } from '../../presentational';

export interface AppDownloadProps {
	previewProjectPlatforms?: string[]
	previewDevicePlatform?: string;
	previewOperatingSystem?: string;
	innerRef?: React.Ref<HTMLDivElement>;
	title?: string;
	text?: string;
}

export default function (props: AppDownloadProps) {
	const [projectInfo, setProjectInfo] = useState<ProjectInfo>();
	const [operatingSystem, setOperatingSystem] = useState<string>();

	useInitializeView(() => {
		if (props.previewProjectPlatforms) {
			// @ts-ignore
			setProjectInfo({ name: 'PROJECT', platforms: props.previewProjectPlatforms || [] });
		} else {
			MyDataHelps.getProjectInfo().then(function (projectInfo) {
				setProjectInfo(projectInfo);
			});
		}

		if (props.previewOperatingSystem !== undefined) {
			setOperatingSystem(props.previewOperatingSystem);
		} else {
			MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
				setOperatingSystem(deviceInfo?.properties?.OperatingSystem ?? '');
			}).catch(function () {
				setOperatingSystem('');
			});
		}
	});

	if (!projectInfo || operatingSystem === undefined) {
		return null;
	}

	let title = props.title || language('app-download-title');
	let text = props.text || language('app-download-subtitle').replace("@@PROJECT_NAME@@", projectInfo.name);

	// When the participant is on a mobile web browser, only offer the store that
	// integrates with their device. On desktop (or when the OS can't be determined)
	// show both. This only applies on the web platform; in the native app the whole
	// widget is hidden by PlatformSpecificContent below.
	const showAndroid = projectInfo.platforms.includes('Android') && operatingSystem !== 'iOS';
	const showIOS = projectInfo.platforms.includes('iOS') && operatingSystem !== 'Android';

	return (
		<PlatformSpecificContent platforms={['Web']} previewDevicePlatform={props.previewDevicePlatform} innerRef={props.innerRef}>
			<div className="mdhui-app-download">
				<CardTitle title={title} />
				<TextBlock>
					<div className="mdhui-app-download-subtitle">
						{text}
					</div>
					<div className="mdhui-app-download-links">
						{showAndroid &&
							<a target="_blank" className="mdhui-app-download-link" href="https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US">
								<img src={`https://appstorebadges.careevolutionapps.com/images/google/black/logo-${getCurrentLocale()}.svg`} alt={language('app-download-google-play-link-alt')} />
							</a>
						}
						{showIOS &&
							<a target="_blank" className="mdhui-app-download-link" href="https://apps.apple.com/us/app/mydatahelps/id1286789190">
								<img src={`https://appstorebadges.careevolutionapps.com/images/apple/black/logo-${getCurrentLocale()}.svg`} alt={language('app-download-app-store-link-alt')} />
							</a>
						}
					</div>
				</TextBlock>
			</div>
		</PlatformSpecificContent>
	);
}
