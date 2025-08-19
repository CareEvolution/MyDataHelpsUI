import React, { useState } from 'react'
import './AppDownload.css'
import MyDataHelps, { ProjectInfo } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import PlatformSpecificContent from '../PlatformSpecificContent/PlatformSpecificContent';
import { useInitializeView } from '../../../helpers/Initialization';
import TextBlock from '../../presentational/TextBlock';
import language from "../../../helpers/language";
import { CardTitle } from '../../presentational';
import { getCurrentLocale } from '../../../helpers/language';

export interface AppDownloadProps {
	previewProjectPlatforms?: string[]
	previewDevicePlatform?: string;
	innerRef?: React.Ref<HTMLDivElement>;
	title?: string;
	text?: string;
}

export default function (props: AppDownloadProps) {
	const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

	useInitializeView(() => {
		if (props.previewProjectPlatforms) {
			// @ts-ignore
			setProjectInfo({ name: 'PROJECT', platforms: props.previewProjectPlatforms || [] });
			return;
		}

		MyDataHelps.getProjectInfo().then(function (projectInfo) {
			setProjectInfo(projectInfo);
		});
	});

	if (!projectInfo) {
		return null;
	}

	let title = props.title || language('app-download-title');
	let text = props.text || language('app-download-subtitle').replace("@@PROJECT_NAME@@", projectInfo.name);

	return (
		<PlatformSpecificContent platforms={['Web']} previewDevicePlatform={props.previewDevicePlatform} innerRef={props.innerRef}>
			<div className="mdhui-app-download">
				<CardTitle title={title} />
				<TextBlock>
					<div className="mdhui-app-download-subtitle">
						{text}
					</div>
					<div className="mdhui-app-download-links">
						{projectInfo.platforms.includes('Android') &&
							<a target="_blank" className="mdhui-app-download-link" href="https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US">
								<img src={`https://appstorebadges.careevolutionapps.com/images/google/black/logo-${getCurrentLocale()}.svg`} alt={language('app-download-google-play-link-alt')} />
							</a>
						}
						{projectInfo.platforms.includes('iOS') &&
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