import React, { ReactElement, Ref, useState } from 'react';
import { Action } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { UploadedFile } from '@careevolution/mydatahelps-js/types';
import { ColorDefinition, useInitializeView } from '../../../helpers';
import queryAllFiles from '../../../helpers/query-all-files';

export interface UploadedFileActionProps {
    preview?: boolean;
    icon?: ReactElement;
    title?: string;
    titleColor?: ColorDefinition;
    subtitle?: string;
    subtitleColor?: ColorDefinition;
    category?: string;
    fileNamePattern?: string | RegExp;
    trackUsage?: boolean;
    embedded?: boolean;
    viewKey?: string;
    innerRef: Ref<HTMLDivElement>;
}

export default function UploadedFileAction(props: UploadedFileActionProps) {
    const [file, setFile] = useState<UploadedFile>();

    useInitializeView(async () => {
        if (props.preview) {
            setFile({} as UploadedFile);
            return;
        }

        const allFiles = await queryAllFiles({ ...(props.category && { category: props.category }) });
        if (allFiles.length > 0) {
            const sortedFiles = allFiles.sort((a, b) => b.lastModified.localeCompare(a.lastModified));
            setFile(props.fileNamePattern ? sortedFiles.find(file => file.fileName.match(props.fileNamePattern!)) : sortedFiles[0]);
        }
    }, [], [props.category, props.fileNamePattern]);

    if (!file) return null;

    const openFile = async (): Promise<void> => {
        if (props.preview) return;

        const downloadedFile = await MyDataHelps.getFileDownloadUrl(file.key);
        if (props.trackUsage) {
            const properties = {
                fileName: file.fileName,
                fileKey: file.key,
                ...(props.viewKey && { viewKey: props.viewKey })
            };
            void MyDataHelps.trackCustomEvent({ eventType: 'OpenUploadedFile', properties });
        }
        if (props.embedded) {
            MyDataHelps.openEmbeddedUrl(downloadedFile.preSignedUrl);
        } else {
            MyDataHelps.openExternalUrl(downloadedFile.preSignedUrl);
        }
    };

    return <Action
        icon={props.icon ?? <FontAwesomeSvgIcon icon={faFile} />}
        title={props.title}
        titleColor={props.titleColor}
        subtitle={props.subtitle}
        subtitleColor={props.subtitleColor}
        bottomBorder
        onClick={openFile}
        innerRef={props.innerRef}
    />;
}