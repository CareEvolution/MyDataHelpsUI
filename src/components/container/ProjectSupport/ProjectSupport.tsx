import React, { useEffect, useState } from 'react'
import "./ProjectSupport.css"
import MyDataHelps, { ProjectInfo } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, Action } from '../../presentational'
import { faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons"
import language from '../../../helpers/language';

export interface ProjectSupportProps {
	previewState?: ProjectSupportPropsPreviewState
	innerRef?: React.Ref<HTMLDivElement>
}

export type ProjectSupportPropsPreviewState = "Default";

export default function (props: ProjectSupportProps) {
	const [loading, setLoading] = useState(true);
	const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);

	function initialize() {
		if (props.previewState == "Default") {
			setProjectInfo({
				supportEmail: "test@example.com",
				supportPhone: "555-555-1212",
				learnMoreLink: "https://mydatahelps.org",
				learnMoreTitle: "Project Home Page"
			} as ProjectInfo);
			setLoading(false);
			return;
		}

		MyDataHelps.getProjectInfo().then(function (result) {
			setProjectInfo(result);
			setLoading(false);
		});
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
		}
	}, []);

	if (projectInfo && !projectInfo.supportEmail && !projectInfo.supportPhone && !(projectInfo.learnMoreLink && projectInfo.learnMoreTitle)) {
		return null;
	}

	return (
		<div ref={props.innerRef} className="mdhui-project-support">
			<div className="title">{language("support")}</div>
			{loading &&
				<LoadingIndicator />
			}
			{(projectInfo?.learnMoreLink && projectInfo?.learnMoreTitle) &&
				<Action indicatorIcon={faGlobe} subtitle={projectInfo.learnMoreTitle} onClick={() => MyDataHelps.openEmbeddedUrl(projectInfo.learnMoreLink as string)} />
			}
			{projectInfo?.supportEmail &&
				<Action indicatorIcon={faEnvelope} subtitle={projectInfo.supportEmail} onClick={() => MyDataHelps.openExternalUrl("mailto:" + projectInfo.supportEmail)} />
			}
			{projectInfo?.supportPhone &&
				<Action indicatorIcon={faPhone} subtitle={projectInfo.supportPhone} onClick={() => MyDataHelps.openExternalUrl("tel:" + projectInfo.supportPhone)} />
			}
		</div>
	);
}