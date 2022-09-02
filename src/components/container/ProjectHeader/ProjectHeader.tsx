import React, { useEffect, useState } from 'react'
import "./ProjectHeader.css"
import MyDataHelps, { ProjectInfo } from "@careevolution/mydatahelps-js"
import { LoadingIndicator } from '../../presentational';

export interface ProjectHeaderProps {
	previewState?: ProjectHeaderPropsPreviewState
}

export type ProjectHeaderPropsPreviewState = "Default";


export default function (props: ProjectHeaderProps) {
	const [loading, setLoading] = useState(true);
	const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);

	function initialize() {
		if (props.previewState == "Default") {
			setProjectInfo({
				name: "My Project Name",
				organization: {
					name: "My Organization Name",
					color: "#0076BE",
					logoUrl: "https://rkstudio.careevolution.com/inv/api/researchkit/organizationbrandingimage/1e1853a2-50d3-4e26-863d-d8546bce63e3"
				}
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

	//Temporary hack until url is fixed to be absolute
	var logoUrl = projectInfo?.organization.logoUrl;
	if (logoUrl && !logoUrl?.startsWith("http")) {
		logoUrl = MyDataHelps.baseUrl + projectInfo?.organization.logoUrl;
	}

	return (
		<div className="mdhui-project-header">
			{loading &&
				<LoadingIndicator />
			}
			{!loading && projectInfo &&
				<div>
					<div style={{ backgroundImage: "url('" + logoUrl + "')" }} className="logo" />
					<div className="project-info">
						<div className="project-name" style={{ color: projectInfo.organization.color }}>{projectInfo.name}</div>
						<div className="organization-name">{projectInfo.organization.name}</div>
					</div>
				</div>
			}
		</div>
	);
}