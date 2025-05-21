import React, { useEffect, useState } from 'react';
import './DocumentLibraryView.css';
import { createAllLibraryDocumentsLoader, createLibraryDocumentSorter, formatLibraryDocumentDateAndType, LibraryDocument, LibraryDocumentsPreviewState, LibraryDocumentSurveySpecification, useInitializeView } from '../../../helpers';
import { Action, Button, Layout, LoadingIndicator, NavigationBar, SegmentedControl } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

export interface DocumentLibraryViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'loading' | LibraryDocumentsPreviewState;
    surveySpecification: LibraryDocumentSurveySpecification;
    documentDetailViewBaseUrl: string;
}

export default function DocumentLibraryView(props: DocumentLibraryViewProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [documents, setDocuments] = useState<LibraryDocument[]>();
    const [selectedSortKey, setSelectedSortKey] = useState<keyof LibraryDocument>('date');
    const [selectedSortDirection, setSelectedSortDirection] = useState<'asc' | 'desc'>('desc');

    const sortDocuments = (documents: LibraryDocument[]): LibraryDocument[] => {
        if (selectedSortKey === 'type') return [...documents].sort(createLibraryDocumentSorter('type', selectedSortDirection));
        if (selectedSortKey === 'name') return [...documents].sort(createLibraryDocumentSorter('name', selectedSortDirection));
        return [...documents].sort(createLibraryDocumentSorter('date', selectedSortDirection));
    };

    useInitializeView(() => {
        if (props.previewState === 'loading') {
            setLoading(true);
            setDocuments(undefined);
            return;
        }
        createAllLibraryDocumentsLoader(props.previewState).load(props.surveySpecification).then(documents => {
            setDocuments(sortDocuments(documents));
            setLoading(false);
        });
    }, [], [props.previewState]);

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
        let title = '';

        if (segmentKey === 'date') {
            title = 'Date';
        } else if (segmentKey === 'name') {
            title = 'Name';
        } else if (segmentKey === 'type') {
            title = 'Type'
        }

        if (selectedSortKey === segmentKey) {
            title += ' ' + (selectedSortDirection === 'asc' ? '▴' : '▾');
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
                <div className="mdhui-document-library-view-title">Documents</div>
                <div>
                    <Button disabled={loading} fullWidth={false} variant="light" onClick={onUploadDocument}>Upload</Button>
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
            {!loading && documents?.length === 0 &&
                <div className="mdhui-document-library-view-documents-empty">No documents uploaded.</div>
            }
            {!loading && documents && documents.length > 0 &&
                <div className="mdhui-document-library-view-documents">
                    {documents.map((document, index) =>
                        <SingleLibraryDocument
                            key={index}
                            document={document}
                            onClick={() => onViewDocument(document)}
                        />
                    )}
                </div>
            }
        </div>
    </Layout>;
}

interface SingleLibraryDocumentProps {
    document: LibraryDocument;
    onClick: () => void;
}

function SingleLibraryDocument(props: SingleLibraryDocumentProps) {
    return <Action className="mdhui-document-library-view-document" onClick={props.onClick}>
        <div className="mdhui-document-library-view-document-contents">
            <div>
                <FontAwesomeSvgIcon icon={faFileInvoice} className="mdhui-document-library-view-document-thumbnail" />
            </div>
            <div className="mdhui-document-library-view-document-details">
                <div className="mdhui-document-library-view-document-name">{props.document.name}</div>
                <div className="mdhui-document-library-view-document-date-and-type">{formatLibraryDocumentDateAndType(props.document)}</div>
            </div>
        </div>
    </Action>;
}
