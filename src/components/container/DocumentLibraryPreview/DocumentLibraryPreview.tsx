import React, { useState } from 'react';
import './DocumentLibraryPreview.css';
import { createAllLibraryDocumentsLoader, createLibraryDocumentSorter, formatNumberForLocale, language, LibraryDocument, LibraryDocumentSurveySpecification, useInitializeView } from '../../../helpers';
import { Action, Button, LoadingIndicator } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { createPreviewDocuments, DocumentLibraryPreviewPreviewState } from './DocumentLibraryPreview.previewData';

export interface DocumentLibraryPreviewProps {
    previewState?: 'loading' | DocumentLibraryPreviewPreviewState;
    surveySpecification: LibraryDocumentSurveySpecification;
    documentLibraryViewBaseUrl: string;
    useFullLoadingIndicator?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component acts as an informational CTA to allow participants to open the DocumentLibraryView.
 * When no documents have been uploaded, the CTA shortcuts directly to the document upload survey.
 */
export default function DocumentLibraryPreview(props: DocumentLibraryPreviewProps) {
    const [documents, setDocuments] = useState<LibraryDocument[]>();

    const applyPreviewState = (previewState: 'loading' | DocumentLibraryPreviewPreviewState): void => {
        setDocuments(previewState !== 'loading' ? createPreviewDocuments(previewState) : undefined);
    };

    useInitializeView(() => {
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }

        createAllLibraryDocumentsLoader().load(props.surveySpecification, false).then(documents => {
            setDocuments(documents.sort(createLibraryDocumentSorter('date', 'desc')));
        });
    }, [], [props.previewState]);

    const onUploadDocument = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.surveySpecification.surveyName);
    };

    const onShowDocumentLibrary = (): void => {
        if (props.previewState) return;

        const separator = props.documentLibraryViewBaseUrl.includes('?') ? '&' : '?';
        const params = new URLSearchParams({ ...props.surveySpecification });

        MyDataHelps.openApplication(`${props.documentLibraryViewBaseUrl}${separator}${params}`);
    };

    return <div className="mdhui-document-library-preview" ref={props.innerRef}>
        {!documents && props.useFullLoadingIndicator && <LoadingIndicator />}
        {((!documents && !props.useFullLoadingIndicator) || documents?.length === 0) &&
            <Action
                title={language('document-library-preview-title')}
                subtitle={language('document-library-preview-instructions')}
                titleIcon={<FontAwesomeSvgIcon className="mdhui-document-library-preview-title-icon" icon={faCamera} />}
                indicator={
                    documents ? <Button variant="default" fullWidth={false} onClick={onUploadDocument}>
                        {language('document-library-preview-upload-button-text')}
                    </Button> : <LoadingIndicator />
                }
                renderAs="div"
            />
        }
        {documents && documents.length > 0 &&
            <Action
                title={language('document-library-preview-title')}
                titleIcon={<FontAwesomeSvgIcon className="mdhui-document-library-preview-title-icon" icon={faCamera} />}
                indicatorValue={formatNumberForLocale(documents.length)}
                onClick={onShowDocumentLibrary}
            >
                <div className="mdhui-document-library-preview-documents">
                    {documents.slice(0, 3).map((document, index) => <div className="mdhui-document-library-preview-document-name" key={index}>{document.name}</div>)}
                </div>
            </Action>
        }
    </div>;
}