import React, { useState } from 'react';
import './DocumentLibraryPreview.css';
import { createAllLibraryDocumentsLoader, createLibraryDocumentSorter, LibraryDocument, LibraryDocumentsPreviewState, LibraryDocumentSurveySpecification, useInitializeView } from '../../../helpers';
import { Action, Button } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export interface DocumentLibraryPreviewProps {
    previewState: 'loading' | LibraryDocumentsPreviewState;
    surveySpecification: LibraryDocumentSurveySpecification;
    documentLibraryViewBaseUrl: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component acts as an informational CTA to allow participants to open the
 * DocumentLibraryView.  When no documents have been uploaded, the CTA shortcuts
 * directly to the document upload survey.
 */
export default function DocumentLibraryPreview(props: DocumentLibraryPreviewProps) {
    const [documents, setDocuments] = useState<LibraryDocument[]>();

    useInitializeView(() => {
        if (props.previewState === 'loading') {
            setDocuments(undefined);
            return;
        }
        createAllLibraryDocumentsLoader(props.previewState).load(props.surveySpecification).then(documents => {
            setDocuments(documents.sort(createLibraryDocumentSorter('name', 'desc')));
        });
    }, [], [props.previewState]);

    if (!documents) return null;

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
        {documents.length === 0 &&
            <Action
                title="Uploaded Documents"
                subtitle="Scan and organize your printed medical records"
                titleIcon={<FontAwesomeSvgIcon className="mdhui-document-library-preview-title-icon" icon={faCamera} />}
                indicator={<Button variant="default" fullWidth={false} onClick={onUploadDocument}> Upload</Button>}
                indicatorPosition="topRight"
                renderAs="div"
            />
        }
        {documents.length > 0 &&
            <Action
                title="Uploaded Documents"
                titleIcon={<FontAwesomeSvgIcon className="mdhui-document-library-preview-title-icon" icon={faCamera} />}
                indicatorValue={documents.length.toString()}
                onClick={onShowDocumentLibrary}
            >
                <div className="mdhui-document-library-preview-documents">
                    {documents.slice(0, 3).map((document, index) => <div className="mdhui-document-library-preview-document-name" key={index}>{document.name}</div>)}
                </div>
            </Action>
        }
    </div>;
}