import React, { useMemo, useState } from "react";
import { Action, Button, Card, Layout, LoadingIndicator, NavigationBar, Title } from "../../presentational";
import { language, useInitializeView } from "../../../helpers";
import SegmentedControl, { SegmentedControlProps } from "../../presentational/SegmentedControl/SegmentedControl";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { getShortDateString } from "../../../helpers/date-helpers";
import { queryAllSurveyFiles, SurveyUploadedFile, SurveyUploadedFileQueryParameters } from "../../../helpers";
import { getPreviewData } from "./DocumentLibraryView.previewData";
import "./DocumentLibraryView.css";

export interface DocumentLibraryViewProps {
    preview?: "Preview" | "PreviewNoFiles" | "PreviewLoading",
    uploadDocumentSurveyName: string,
    fileResultIdentifier: string,
    typeResultIdentifier: string,
    nameResultIdentifier: string,
    dateResultIdentifier: string,
    notesResultIdentifier: string,
    documentDetailViewBaseUrl: string,
    colorScheme?: "auto" | "light" | "dark"
}

/**
 * This view displays a list of documents uploaded by the user via specified survey.
 */
export default function DocumentLibraryView(props: DocumentLibraryViewProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSegment, setSelectedSegment] = useState<"date" | "name" | "type">("date");
    const [files, setFiles] = useState<SurveyUploadedFile[]>([]);

    const segmentedControlProps: SegmentedControlProps = {
        segments: [
            {
                key: "date",
                title: language('date')
            },
            {
                key: "name",
                title: language('name')
            },
            {
                key: "type",
                title: language('type')
            }
        ],
        selectedSegment: selectedSegment,
        color: "var(--mdhui-color-primary)",
        onSegmentSelected: (segmentKey) => {
            setSelectedSegment(segmentKey as "date" | "name" | "type");
        },
        style: {
            marginTop: '15px',
            marginBottom: '15px'
        }
    };

    const onUploadClick = () => {
        setLoading(true);
        MyDataHelps.startSurvey(props.uploadDocumentSurveyName);
    }

    const onFileClick = (file: SurveyUploadedFile) => {
        console.log(`Opening File ${file.title} ${file.fileName} ${file.type} ${file.date} SurveyResultID: ${file.surveyResultId}`); //TODO: Remove

        if (!props.preview) {
            const params = new URLSearchParams({
                surveyResultId: file.surveyResultId,
                fileResultIdentifier: props.fileResultIdentifier,
                typeResultIdentifier: props.typeResultIdentifier,
                nameResultIdentifier: props.nameResultIdentifier,
                dateResultIdentifier: props.dateResultIdentifier,
                notesResultIdentifier: props.notesResultIdentifier
            });

            const separator = props.documentDetailViewBaseUrl.includes('?') ? '&' : '?';
            const documentDetailViewUrl = `${props.documentDetailViewBaseUrl}${separator}${params.toString()}`;
            MyDataHelps.openApplication(documentDetailViewUrl);
        }
    }

    async function initialize() {
        setLoading(true);

        if (props.preview) {
            let previewData: SurveyUploadedFile[] = [];
            if (props.preview === "Preview") {
                previewData = getPreviewData();
            }
            if (props.preview !== "PreviewLoading") {
                setFiles(previewData);
                setLoading(false);
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
            setFiles(uploadedFiles);
        }).catch(error => {
            console.error('Failed to query files:', error);
        }).finally(() => {
            setLoading(false);
        });
    }

    function buildFileList(files: SurveyUploadedFile[], selectedSegment: "date" | "name" | "type") {
        const sortedFiles = files.sort((a, b) => {
            if (selectedSegment === "date") {
                return a.date > b.date ? -1 : 1;
            } else if (selectedSegment === "name") {
                return a.title < b.title ? -1 : 1;
            } else {
                return (a.type ?? "") > (b.type ?? "") ? -1 : 1;
            }
        });

        function getFileName(title: string, type?: string) {
            if (type) {
                return `${title} (${type})`;
            }
            return title;
        }

        return sortedFiles.map((file: SurveyUploadedFile, index: number) =>
            <Card key={`file_${index}`}>
                <Action key={`suf_${index}`} title={getFileName(file.title, file.type)}
                    subtitle={`${getShortDateString(file.date)} ${file.fileName}`}
                    icon={<FontAwesomeSvgIcon icon={faFileLines} />}
                    onClick={() => onFileClick(file)}></Action>
            </Card>
        );
    }

    useInitializeView(() => {
        initialize();
    }, [], []);

    //Getting some blinking when returning from DocumentDetailView. useMemo is not helping.
    const fileList = useMemo(() => buildFileList(files, selectedSegment), [files, selectedSegment]);

    return (
        <Layout colorScheme={props.colorScheme ?? "auto"}>
            <NavigationBar
                showBackButton={true}>
                <Title order={1}
                    accessory={<Button fullWidth={false} onClick={() => onUploadClick()}>{language('upload')}</Button>} >{language('documents')}</Title>
            </NavigationBar>
            <SegmentedControl className="mdhui-document-library-view-segment-control" {...segmentedControlProps} />
            {loading && <LoadingIndicator />}
            {!loading && fileList}
        </Layout>
    )
}