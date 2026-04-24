import React, { ReactElement, Ref, useState } from 'react';
import { Action } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { UploadedFile } from '@careevolution/mydatahelps-js/types';
import { useInitializeView } from '../../../helpers';
import queryAllFiles from '../../../helpers/query-all-files';

export interface UploadedFileActionProps {
    preview?: boolean;
    icon?: ReactElement;
    title?: string;
    subtitle?: string;
    category: string;
    fileNamePattern?: string | RegExp;
    trackUsage?: boolean;
    embedded?: boolean;
    innerRef: Ref<HTMLDivElement>;
}

export default function UploadedFileAction(props: UploadedFileActionProps) {
    const [file, setFile] = useState<UploadedFile>();

    useInitializeView(async () => {
        if (props.preview) {
            setFile({} as UploadedFile);
            return;
        }

        const allFiles = await queryAllFiles({ category: props.category });
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
            void MyDataHelps.trackCustomEvent({ eventType: 'OpenUploadedFile', properties: { fileName: file.fileName, fileKey: file.key } });
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
        subtitle={props.subtitle}
        bottomBorder
        onClick={openFile}
        innerRef={props.innerRef}
    />;
}