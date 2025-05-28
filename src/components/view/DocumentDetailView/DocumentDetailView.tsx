import React, { useState } from 'react';
import './DocumentDetailView.css';
import { createSingleLibraryDocumentLoader, formatLibraryDocumentDateAndType, LibraryDocument, LibraryDocumentSurveySpecification, useInitializeView } from '../../../helpers';
import { Button, Layout, LoadingIndicator, NavigationBar } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faArrowUpRightFromSquare, faDownload } from "@fortawesome/free-solid-svg-icons";

export interface DocumentDetailViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'loading web' | 'loading mobile' | 'loaded web' | 'loaded mobile';
    surveySpecification: LibraryDocumentSurveySpecification;
    surveyResultId: string;
}

export default function DocumentDetailView(props: DocumentDetailViewProps) {
    const [platform, setPlatform] = useState<string>();
    const [document, setDocument] = useState<LibraryDocument>();
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

    const loadPlatform = async (): Promise<void> => {
        const deviceInfo = await MyDataHelps.getDeviceInfo();
        setPlatform(deviceInfo.platform);
    };

    useInitializeView(() => {
        if (props.previewState) {
            const previewPlatform = props.previewState.endsWith('web') ? 'Web' : 'iOS';
            if (platform !== previewPlatform) {
                setPlatform(previewPlatform);
                return;
            }
            if (props.previewState?.startsWith('loading')) {
                setDocument(undefined);
                return;
            }
        }

        if (!platform) {
            loadPlatform();
            return;
        }

        createSingleLibraryDocumentLoader(!!props.previewState).load(props.surveyResultId, props.surveySpecification).then(document => {
            if (document) {
                setDocument(document);
                setLoadingPreview(!!document.fileUrl && !document.fileUrl.endsWith('.pdf'));
            } else {
                MyDataHelps.back();
            }
        });
    }, [], [props.previewState, platform]);

    const onDelete = async (): Promise<void> => {
        if (props.previewState || !document) return;

        const confirmed = window.confirm('Are you sure you want to delete this document?');
        if (confirmed) {
            if (document.fileKey) {
                await MyDataHelps.deleteFile(document.fileKey);
            }
            await MyDataHelps.deleteSurveyResult(document.surveyResultId);
            MyDataHelps.back();
        }
    };

    const onShare = async (): Promise<void> => {
        if (props.previewState || !platform || !document?.fileUrl) return;

        if (platform === 'Web') {
            MyDataHelps.openExternalUrl(document.fileUrl);
        } else if ((window as any).webkit.messageHandlers.OpenFile) {
            (window as any).messageHandlers.OpenFile.postMessage({ url: document.fileUrl });
        }
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar
            showBackButton={true}
            className="mdhui-document-detail-view-nav-bar"
            navigationBarRight={platform && document ?
                <div className="mdhui-document-detail-view-nav-bar-icon" onClick={onShare}>
                    <FontAwesomeSvgIcon icon={platform === 'Web' ? faDownload : faArrowUpRightFromSquare} />
                </div> : undefined
            }
        />
        <div className="mdhui-document-detail-view">
            {!document && <LoadingIndicator />}
            {document &&
                <>
                    <div className="mdhui-document-detail-view-preview-container">
                        <div className="mdhui-document-detail-view-preview" onClick={onShare}>
                            {loadingPreview && <LoadingIndicator className="mdhui-document-detail-view-preview-loading" />}
                            {document.fileUrl && !document.fileUrl.endsWith('.pdf') &&
                                <img
                                    src={document.fileUrl}
                                    style={{ display: loadingPreview ? 'none' : 'inline' }}
                                    onLoad={() => setLoadingPreview(false)}
                                    alt="document preview image"
                                />
                            }
                            {(!document.fileUrl || document.fileUrl.endsWith('.pdf')) &&
                                <div className="mdhui-document-detail-view-preview-unavailable">Preview unavailable</div>
                            }
                        </div>
                        <div className="mdhui-document-detail-view-preview-label">{document.file}</div>
                    </div>
                    <div className="mdhui-document-detail-view-document-details">
                        <div className="mdhui-document-detail-view-document-name">{document.name}</div>
                        <div className="mdhui-document-detail-view-document-date-and-type">{formatLibraryDocumentDateAndType(document)}</div>
                        <div className="mdhui-document-detail-view-document-notes-title">Notes</div>
                        {document.notes &&
                            <div className="mdhui-document-detail-view-document-notes">{document.notes}</div>
                        }
                        {!document.notes &&
                            <div className="mdhui-document-detail-view-document-notes-none">None</div>
                        }
                    </div>
                    <div className="mdhui-document-detail-view-document-buttons">
                        <Button variant="light" color="var(--mdhui-color-danger)" onClick={onDelete}>Delete</Button>
                    </div>
                </>
            }
        </div>
    </Layout>;
}