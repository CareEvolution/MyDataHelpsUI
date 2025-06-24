import React, { useEffect, useRef, useState } from 'react';
import './DocumentDetailView.css';
import { createSingleLibraryDocumentLoader, formatLibraryDocumentDateAndType, language, LibraryDocument, LibraryDocumentSurveySpecification, useInitializeView } from '../../../helpers';
import { Button, Layout, LoadingIndicator, NavigationBar } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faArrowUpRightFromSquare, faDownload } from '@fortawesome/free-solid-svg-icons';
import { PdfPreview } from '../../container';
import { createPreviewDocument, DocumentDetailViewPreviewState } from './DocumentDetailView.previewData';

export interface DocumentDetailViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'loading' | DocumentDetailViewPreviewState;
    surveySpecification: LibraryDocumentSurveySpecification;
    surveyResultId: string;
}

/**
 * This component displays the details for an uploaded document.  Documents can be downloaded/shared or deleted.
 */
export default function DocumentDetailView(props: DocumentDetailViewProps) {
    const [platform, setPlatform] = useState<string>();
    const [document, setDocument] = useState<LibraryDocument>();
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

    const documentRef = useRef<LibraryDocument>();

    const applyPreviewState = (previewState: 'loading' | DocumentDetailViewPreviewState): void => {
        const previewPlatform = previewState.endsWith('mobile') ? 'iOS' : 'Web';
        if (platform !== previewPlatform) {
            setPlatform(previewPlatform);
            return;
        }

        const previewDocument = previewState === 'loading' ? undefined : createPreviewDocument(previewState);
        setDocument(previewDocument);
        setLoadingPreview(previewState !== 'loading' && document?.fileUrl !== previewDocument?.fileUrl);
    };

    const loadPlatform = async (): Promise<void> => {
        const deviceInfo = await MyDataHelps.getDeviceInfo();
        setPlatform(deviceInfo.platform);
    };

    useInitializeView(() => {
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }

        if (!platform) {
            loadPlatform();
            return;
        }

        createSingleLibraryDocumentLoader().load(props.surveyResultId, props.surveySpecification).then(document => {
            if (!document) {
                MyDataHelps.back();
            } else if (!documentRef.current) {
                setDocument(document);
                setLoadingPreview(!!document.fileUrl);
            }
        });
    }, [], [props.previewState, platform]);

    useEffect(() => {
        documentRef.current = document;
    }, [document]);

    const onDelete = async (): Promise<void> => {
        if (props.previewState || !document) return;

        const confirmed = window.confirm(language('document-detail-view-delete-confirmation'));
        if (confirmed) {
            if (document.fileKey) {
                await MyDataHelps.deleteFile(document.fileKey);
            }
            await MyDataHelps.deleteSurveyResult(document.surveyResultId);
            MyDataHelps.back();
        }
    };

    const onShare = async (): Promise<void> => {
        if (props.previewState || !document?.fileUrl) return;
        MyDataHelps.openEmbeddedUrl(document.fileUrl);
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
                            {document.fileUrl && document.fileType === 'image' &&
                                <img
                                    src={document.fileUrl}
                                    style={{ display: loadingPreview ? 'none' : 'inline' }}
                                    onLoad={() => setLoadingPreview(false)}
                                    alt={language('document-detail-view-preview-image-alt')}
                                />
                            }
                            {document.fileUrl && document.fileType === 'pdf' &&
                                <PdfPreview
                                    url={document.fileUrl}
                                    style={{ display: loadingPreview ? 'none' : 'inline' }}
                                    maxHeight={window.innerHeight * 0.5}
                                    maxWidth={window.innerWidth * 0.8}
                                    onLoad={() => setLoadingPreview(false)}
                                />
                            }
                            {!loadingPreview && !document.fileUrl &&
                                <div className="mdhui-document-detail-view-preview-unavailable">{language('document-detail-view-preview-unavailable')}</div>
                            }
                        </div>
                        <div className="mdhui-document-detail-view-preview-label">{document.file}</div>
                    </div>
                    <div className="mdhui-document-detail-view-document-details">
                        <div className="mdhui-document-detail-view-document-name">{document.name}</div>
                        <div className="mdhui-document-detail-view-document-date-and-type">{formatLibraryDocumentDateAndType(document)}</div>
                        <div className="mdhui-document-detail-view-document-notes-title">{language('document-detail-view-notes-title')}</div>
                        {document.notes &&
                            <div className="mdhui-document-detail-view-document-notes">{document.notes}</div>
                        }
                        {!document.notes &&
                            <div className="mdhui-document-detail-view-document-notes-none">{language('document-detail-view-notes-none')}</div>
                        }
                    </div>
                    <div className="mdhui-document-detail-view-document-buttons">
                        <Button variant="light" color="var(--mdhui-color-danger)" onClick={onDelete}>
                            {language('document-detail-view-delete-button-text')}
                        </Button>
                    </div>
                </>
            }
        </div>
    </Layout>;
}