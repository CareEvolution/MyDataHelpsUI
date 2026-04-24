import React, { RefObject, useState } from 'react';
import { Action } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps, { UploadedFileQuery, UploadedFilesPage } from '@careevolution/mydatahelps-js';
import { UploadedFile } from '@careevolution/mydatahelps-js/types';
import { useInitializeView } from '../../../helpers';

export interface UploadedFileActionProps {
    preview?: boolean;
    title: string;
    subtitle?: string;
    renderAs?: 'div' | 'button';
    category: string;
    fileNamePattern?: string | RegExp;
    trackUsage?: boolean;
    embedded?: boolean;
    innerRef: RefObject<HTMLDivElement>;
}

export default function UploadedFileAction(props: UploadedFileActionProps) {
    const [uploadedFile, setUploadedFile] = useState<UploadedFile>();

    useInitializeView(async () => {
        if (props.preview) {
            setUploadedFile({} as UploadedFile);
            return;
        }

        const queryParameters: UploadedFileQuery = { category: props.category };
        let filesPage: UploadedFilesPage;
        do {
            filesPage = await MyDataHelps.queryFiles(queryParameters);
            if (filesPage.files.length > 0) {
                const matchingFile = props.fileNamePattern
                    ? filesPage.files.find(file => file.fileName.match(props.fileNamePattern!))
                    : filesPage.files[0];
                if (matchingFile) {
                    setUploadedFile(matchingFile);
                    break;
                }
            }
            queryParameters.pageID = filesPage.nextPageID;
        } while (filesPage.nextPageID);
    }, [], [props.category, props.fileNamePattern]);

    if (!uploadedFile) return null;

    const openFile = async (): Promise<void> => {
        if (props.preview) return;

        const downloadedFile = await MyDataHelps.getFileDownloadUrl(uploadedFile.key);
        if (props.trackUsage) {
            void MyDataHelps.trackCustomEvent({ eventType: 'OpenUploadedFile', properties: { fileName: uploadedFile.fileName, fileKey: uploadedFile.key } });
        }
        if (props.embedded) {
            MyDataHelps.openEmbeddedUrl(downloadedFile.preSignedUrl);
        } else {
            MyDataHelps.openExternalUrl(downloadedFile.preSignedUrl);
        }
    };

    return <Action
        icon={<FontAwesomeSvgIcon icon={faFile} />}
        title={props.title}
        subtitle={props.subtitle}
        renderAs={props.renderAs}
        bottomBorder
        onClick={openFile}
    />;
}