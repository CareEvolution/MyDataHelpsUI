import React, { useState } from 'react'
import './AppDownload.css'
import MyDataHelps, { ProjectInfo } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import PlatformSpecificContent from '../PlatformSpecificContent/PlatformSpecificContent';
import { useInitializeView } from '../../../helpers/Initialization';
import Card from '../../presentational/Card';
import TextBlock from '../../presentational/TextBlock';
import googlePlayDownload from '../../../assets/google-play-download.svg';
import appStoreDownload from '../../../assets/app-store-download.svg';
import language from "../../../helpers/language";
import LocalizedString from "../../presentational/LocalizedString";

export interface AppDownloadProps {
	previewProjectPlatforms?: string[]
	previewDevicePlatform?: string;
}

export default function (props: AppDownloadProps) {
	const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

	useInitializeView(() => {
		if (props.previewProjectPlatforms) {
			// @ts-ignore
			setProjectInfo({name: 'PROJECT', platforms: props.previewProjectPlatforms || []});
			return;
		}

		MyDataHelps.getProjectInfo().then(function (projectInfo) {
			setProjectInfo(projectInfo);
		});
	});

	if (!projectInfo) {
		return null;
	}

	return (
		<div className="mdhui-app-download">
			<PlatformSpecificContent platforms={['Web']} previewDevicePlatform={props.previewDevicePlatform}>
				<Card>
					<div className="mdhui-app-download-title">
						<LocalizedString stringName="app-download-title"/>
					</div>
					<TextBlock>
						<div className="mdhui-app-download-subtitle">
							{language['app-download-subtitle'].replace("@@PROJECT_NAME@@", projectInfo.name)}
						</div>
						<div className="mdhui-app-download-links">
							{projectInfo.platforms.includes('Android') &&
							<a target="_blank" className="mdhui-app-download-link" href="https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US">
								<img src={googlePlayDownload} alt={language['app-download-google-play-link-alt']}/>
							</a>
							}
							{projectInfo.platforms.includes('iOS') &&
							<a target="_blank" className="mdhui-app-download-link" href="https://apps.apple.com/us/app/mydatahelps/id1286789190">
								<img src={appStoreDownload} alt={language['app-download-app-store-link-alt']}/>
							</a>
							}
						</div>
					</TextBlock>
				</Card>
			</PlatformSpecificContent>
		</div>
	);
}