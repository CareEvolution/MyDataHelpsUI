import React from "react";
import { Action, Button, Layout, LoadingIndicator, Title } from "../../presentational";
import { language, useInitializeView } from "../../../helpers";
import SegmentedControl, { SegmentedControlProps } from "../../presentational/SegmentedControl/SegmentedControl";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { getShortDateString } from "../../../helpers/date-helpers";
import { queryAllSurveyFiles, SurveyUploadedFile, SurveyUploadedFileQueryParameters } from "../../../helpers";
import { getPreviewData } from "./DocumentLibraryView.previewData";

export interface DocumentLibraryViewProps {
    preview?: "Preview" | "PreviewLoading",
    uploadDocumentSurveyName: string,
    fileResultIdentifier: string,
    typeResultIdentifier: string,
    nameResultIdentifier: string,
    dateResultIdentifier: string,
    notesResultIdentifier: string,
    documentViewBaseUrl: string,
    colorScheme?: "auto" | "light" | "dark"
}

/**
 * This view displays a list of documents uploaded by the user via specified survey.
 */
export default function DocumentLibraryView(props: DocumentLibraryViewProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedSegment, setSelectedSegment] = React.useState<"date" | "name" | "type">("date");
    const [files, setFiles] = React.useState<SurveyUploadedFile[]>([]);

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
        //console.log(`Opening File ${file.title} ${file.fileName} ${file.type} ${file.date} SurveyResultID: ${file.surveyResultId}`);

        if (props.documentViewBaseUrl) {
            const documentDetailViewUrl = props.documentViewBaseUrl + '?surveyResultId=' + encodeURIComponent(file.surveyResultId)
                + '&fileResultIdentifier=' + encodeURIComponent(props.fileResultIdentifier)
                + '&typeResultIdentifier=' + encodeURIComponent(props.typeResultIdentifier)
                + '&nameResultIdentifier=' + encodeURIComponent(props.nameResultIdentifier)
                + '&dateResultIdentifier=' + encodeURIComponent(props.dateResultIdentifier)
                + '&notesResultIdentifier=' + encodeURIComponent(props.notesResultIdentifier);
            MyDataHelps.openApplication(documentDetailViewUrl);
        }
    }

    async function initialize() {
        setLoading(true);

        if (props.preview) {
            if (props.preview === "Preview") {
                setFiles(getPreviewData());
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
                return a.type < b.type ? -1 : 1;
            }
        });

        return sortedFiles.map((file: SurveyUploadedFile, index: number) =>
            <Action key={`suf_${index}`} title={`${file.title} (${file.type})`}
                subtitle={`${getShortDateString(file.date)} ${file.fileName}`}
                icon={<FontAwesomeSvgIcon icon={faFileLines} />}
                onClick={() => onFileClick(file)}></Action>
        );
    }

    useInitializeView(() => {
        initialize();
    }, [], []);

    return (
        <Layout colorScheme={props.colorScheme}>
            {loading && <LoadingIndicator />}
            {!loading && <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title order={1} >{language('documents')}</Title>
                    <Button fullWidth={false} onClick={() => onUploadClick()}>{language('upload')}</Button>
                </div>

                <SegmentedControl  {...segmentedControlProps} />
                {files.length > 0 && buildFileList(files, selectedSegment)}
            </>}
        </Layout>
    )
}