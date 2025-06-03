import React, { useEffect, useRef, useState } from 'react';
import './DocumentLibraryView.css';
import { createAllLibraryDocumentsLoader, createLibraryDocumentSorter, formatLibraryDocumentDateAndType, language, LibraryDocument, LibraryDocumentsPreviewState, LibraryDocumentSurveySpecification, useInitializeView } from '../../../helpers';
import { Action, Button, Layout, LoadingIndicator, NavigationBar, SegmentedControl } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { PdfPreview } from '../../container';

export interface DocumentLibraryViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'loading' | LibraryDocumentsPreviewState;
    surveySpecification: LibraryDocumentSurveySpecification;
    documentDetailViewBaseUrl: string;
}

/**
 * This component displays a list of all currently uploaded documents.  New documents can be uploaded and
 * each existing document can be tapped to open the DocumentDetailView.
 */
export default function DocumentLibraryView(props: DocumentLibraryViewProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [documents, setDocuments] = useState<LibraryDocument[]>();
    const [selectedSortKey, setSelectedSortKey] = useState<keyof LibraryDocument>('date');
    const [selectedSortDirection, setSelectedSortDirection] = useState<'asc' | 'desc'>('desc');

    const documentsRef = useRef<LibraryDocument[]>();

    const sortDocuments = (documents: LibraryDocument[]): LibraryDocument[] => {
        if (selectedSortKey === 'type') return [...documents].sort(createLibraryDocumentSorter('type', selectedSortDirection));
        if (selectedSortKey === 'name') return [...documents].sort(createLibraryDocumentSorter('name', selectedSortDirection));
        return [...documents].sort(createLibraryDocumentSorter('date', selectedSortDirection));
    };

    const updateDocuments = (documents: LibraryDocument[]): void => {
        const existingDocumentsBySurveyResultId = (documentsRef.current ?? []).reduce((existingDocumentsBySurveyResultId, document) => {
            existingDocumentsBySurveyResultId[document.surveyResultId] = document;
            return existingDocumentsBySurveyResultId;
        }, {} as Record<string, LibraryDocument>);

        const updatedDocuments = documents.map(document => existingDocumentsBySurveyResultId[document.surveyResultId] ?? document);

        setDocuments(sortDocuments(updatedDocuments));
    };

    useInitializeView(() => {
        if (props.previewState === 'loading') {
            setLoading(true);
            setDocuments(undefined);
            return;
        }
        createAllLibraryDocumentsLoader(props.previewState).load(props.surveySpecification, true).then(documents => {
            updateDocuments(documents);
            setLoading(false);
        });
    }, [], [props.previewState]);

    useEffect(() => {
        documentsRef.current = documents;
    }, [documents]);

    useEffect(() => {
        if (documents) {
            setDocuments(sortDocuments(documents));
        }
    }, [selectedSortKey, selectedSortDirection]);

    const onUploadDocument = (): void => {
        if (props.previewState) return;
        setLoading(true);
        MyDataHelps.startSurvey(props.surveySpecification.surveyName);
    };

    const getSegmentTitle = (segmentKey: string): string => {
        const title = language(`document-library-view-sort-title-${segmentKey}`);
        if (selectedSortKey === segmentKey) {
            return title + ' ' + (selectedSortDirection === 'asc' ? '▴' : '▾');
        }
        return title;
    };

    const onSegmentSelected = (segmentKey: string): void => {
        if (selectedSortKey === segmentKey) {
            setSelectedSortDirection(selectedSortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSelectedSortKey(segmentKey as keyof LibraryDocument);
        }
    };

    const onViewDocument = (document: LibraryDocument): void => {
        if (props.previewState) return;

        const separator = props.documentDetailViewBaseUrl.includes('?') ? '&' : '?';
        const params = new URLSearchParams({ ...props.surveySpecification, surveyResultId: document.surveyResultId });

        MyDataHelps.openApplication(`${props.documentDetailViewBaseUrl}${separator}${params}`);
    }

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar
            showBackButton={true}
            className="mdhui-document-library-view-nav-bar"
        />
        <div className="mdhui-document-library-view">
            <div className="mdhui-document-library-header">
                <div className="mdhui-document-library-view-title">{language('document-library-view-title')}</div>
                <div>
                    <Button fullWidth={false} variant="light" onClick={onUploadDocument}>
                        {language('document-library-view-upload-button-text')}
                    </Button>
                </div>
            </div>
            <div className="mdhui-document-library-subheader">
                <SegmentedControl
                    segments={[
                        { key: 'date', title: getSegmentTitle('date') },
                        { key: 'name', title: getSegmentTitle('name') },
                        { key: 'type', title: getSegmentTitle('type') }
                    ]}
                    onSegmentSelected={onSegmentSelected}
                    selectedSegment={selectedSortKey}
                />
            </div>
            {loading &&
                <LoadingIndicator />
            }
            {!loading && (!documents || documents.length === 0) &&
                <div className="mdhui-document-library-view-documents-empty">{language('document-library-view-empty-text')}</div>
            }
            {!loading && documents && documents.length > 0 &&
                <div className="mdhui-document-library-view-documents">
                    {documents.map(document =>
                        <DocumentLibraryListItem
                            key={document.surveyResultId}
                            document={document}
                            onClick={() => onViewDocument(document)}
                        />
                    )}
                </div>
            }
        </div>
    </Layout>;
}

interface DocumentLibraryListItemProps {
    document: LibraryDocument;
    onClick: () => void;
}

function DocumentLibraryListItem(props: DocumentLibraryListItemProps) {
    const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(!!props.document.fileUrl);

    return <Action className="mdhui-document-library-view-document" onClick={props.onClick}>
        <div className="mdhui-document-library-view-document-contents">
            <div className="mdhui-document-library-view-document-thumbnail">
                {loadingThumbnail && <LoadingIndicator className="mdhui-document-library-view-document-thumbnail-loading" />}
                {props.document.fileUrl && props.document.fileType === 'image' &&
                    <img
                        src={props.document.fileUrl}
                        style={{ display: loadingThumbnail ? 'none' : 'inline' }}
                        onLoad={() => setLoadingThumbnail(false)}
                        alt={language('document-library-view-thumbnail-image-alt')}
                    />
                }
                {props.document.fileUrl && props.document.fileType === 'pdf' &&
                    <PdfPreview
                        url={props.document.fileUrl}
                        style={{ display: loadingThumbnail ? 'none' : 'inline' }}
                        maxHeight={48}
                        maxWidth={48}
                        onLoad={() => setLoadingThumbnail(false)}
                    />
                }
                {!loadingThumbnail && !props.document.fileUrl &&
                    <FontAwesomeSvgIcon icon={faFileInvoice} />
                }
            </div>
            <div className="mdhui-document-library-view-document-details">
                <div className="mdhui-document-library-view-document-name">{props.document.name}</div>
                <div className="mdhui-document-library-view-document-date-and-type">{formatLibraryDocumentDateAndType(props.document)}</div>
            </div>
        </div>
    </Action>;
}
