import React from "react";
import { language, queryAllSurveyFiles, SurveyUploadedFile, SurveyUploadedFileQueryParameters, useInitializeView } from "../../../helpers";
import { Action, Button, LoadingIndicator } from "../../presentational";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { getPreviewData } from "./DocumentLibraryPreview.previewData";
import "./DocumentLibraryPreview.css";

export interface DocumentLibraryPreviewProps {
    preview?: "PreviewNoDocuments" | "PreviewDocuments" | "PreviewLoading",
    uploadDocumentSurveyName: string,
    fileResultIdentifier: string,
    typeResultIdentifier: string,
    nameResultIdentifier: string,
    dateResultIdentifier: string,
    notesResultIdentifier: string,
    documentViewBaseUrl: string,
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function DocumentLibraryPreview(props: DocumentLibraryPreviewProps) {
    const [surveyFiles, setSurveyFiles] = React.useState<string[] | undefined>(undefined);

    async function initialize() {
        if (props.preview) {
            if (props.preview === "PreviewNoDocuments") {
                setSurveyFiles([]);
            } else if (props.preview === "PreviewDocuments") {
                setSurveyFiles(getPreviewData());
            }
            return;
        }

        const params: SurveyUploadedFileQueryParameters = {
            uploadDocumentSurveyName: props.uploadDocumentSurveyName,
            fileResultIdentifier: props.fileResultIdentifier,
            typeResultIdentifier: props.typeResultIdentifier,
            nameResultIdentifier: props.nameResultIdentifier,
            dateResultIdentifier: props.dateResultIdentifier,
            notesResultIdentifier: props.notesResultIdentifier
        };

        queryAllSurveyFiles({ ...params }).then((uploadedFiles: SurveyUploadedFile[]) => {
            const sortedFiles = uploadedFiles.sort((a, b) => {
                return a.date > b.date ? -1 : 1;
            });

            const top3Files = sortedFiles.slice(0, 3).map((file: SurveyUploadedFile, index: number) =>
                file.title
            );
            setSurveyFiles(top3Files);
        });
    }

    const onUploadClick = () => {
        if (props.preview) return;

        setSurveyFiles(undefined);
        MyDataHelps.startSurvey(props.uploadDocumentSurveyName);
    }

    useInitializeView(() => {
        initialize();
    }, [], []);

    return (
        <div ref={props.innerRef} className="mdhui-document-library-preview">
            {!surveyFiles && <LoadingIndicator />}
            {surveyFiles &&
                <Action title={` ${language("uploaded-documents")}`}
                    className="font-size"
                    indicatorPosition="default"
                    subtitle={surveyFiles.length === 0
                        ? language("upload-documents-subtitle")
                        : ""}
                    children={surveyFiles.length > 0
                        ? surveyFiles.map((file, index) => <div className="file-title" key={index}>{file}</div>)
                        : undefined
                    }
                    titleIcon={<FontAwesomeSvgIcon icon={faCamera} />}
                    indicatorValue={surveyFiles.length > 0 ? surveyFiles.length.toString() : undefined}
                    indicator={surveyFiles.length === 0
                        ? <Button variant="default" fullWidth={false} onClick={onUploadClick}>{language("upload-button")}</Button>
                        : undefined}
                />
            }
        </div>
    )
}