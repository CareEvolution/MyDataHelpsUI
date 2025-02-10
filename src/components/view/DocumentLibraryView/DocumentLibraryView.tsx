import React, { useEffect } from "react";
import { Action, Button, Layout, LoadingIndicator, Title } from "../../presentational";
import { language } from "../../../helpers";
import SegmentedControl, { SegmentedControlProps } from "../../presentational/SegmentedControl/SegmentedControl";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { getShortDateString } from "../../../helpers/date-helpers";
import queryAllSurveyFiles, { SurveyUploadedFile, SurveyUploadedFileQueryParameters } from "../../../helpers/query-all-survey-files";

export interface DocumentLibraryViewProps {
    preview?: string,
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
 * This view displays a list of documents uploaded by the user.
 */
export default function DocumentLibraryView( props: DocumentLibraryViewProps ) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedSegment, setSelectedSegment] = React.useState<"date" | "name" | "type">("date");
    const [files, setFiles] = React.useState<SurveyUploadedFile[]>([]);

    const segmentedControlProps: SegmentedControlProps = {
        segments: [
            {
                key: "date",
                title: "Date" //language('date')
            },
            {
                key: "name",
                title: "Name" //language('name')
            },
            {
                key: "type",
                title: language('type')
            }
        ],
        selectedSegment: selectedSegment,
        color: "var(--mdhui-color-primary)",
        onSegmentSelected: (segmentKey) => {
            console.log(`Change in selected segment ${segmentKey}`);
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

    async function initiaize() {
        setLoading(true);
        const buildQueryParameters = (participantID: string, projectID: string): SurveyUploadedFileQueryParameters => {
            return {
                participantID: participantID,
                projectID: projectID,
                uploadDocumentSurveyName: props.uploadDocumentSurveyName,
                fileResultIdentifier: props.fileResultIdentifier,
                typeResultIdentifier: props.typeResultIdentifier,
                nameResultIdentifier: props.nameResultIdentifier,
                dateResultIdentifier: props.dateResultIdentifier,
                notesResultIdentifier: props.notesResultIdentifier
            };
        };

        MyDataHelps.getParticipantInfo().then((participantInfo) => {
            const params = buildQueryParameters(participantInfo.participantIdentifier, participantInfo.projectID);
            queryAllSurveyFiles({...params}).then((uploadedFiles : SurveyUploadedFile[]) => {
                setFiles(uploadedFiles);
                setLoading(false);
            });
        });
    }

    let testActionOnclick = () => {
        alert("ehllo");
    }

    function buildFileList(files: SurveyUploadedFile[]) {
        return files.map((file : SurveyUploadedFile, index: number) => 
            <Action key={`suf_${index}`} title={file.type} 
                subtitle={`${getShortDateString(file.date)} ${document.title}` } 
                icon={<FontAwesomeSvgIcon icon={faFileLines} />} onClick={() => console.log(`File Key ${file.fileKey}`)}></Action>
        );
    }

    useEffect(() => {
        initiaize();

        MyDataHelps.on('surveyDidFinish', () => initiaize());
        return () => {
            MyDataHelps.off('surveyDidFinish', () => initiaize());
        }
    }, []);

    return (
        <Layout colorScheme={props.colorScheme}>
            {loading && <LoadingIndicator />}
            {!loading && <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title order={1} >{language('documents')}</Title>
                    {/* TODO: Start Survey Button props.uploadDocumentSurveyName */}
                    <Button fullWidth={false} onClick={() => console.log("upload click")}>{language('upload')}</Button>
                </div>

                <SegmentedControl  {...segmentedControlProps} />
                {files.length> 0 && buildFileList(files)}
            </>}
        </Layout>
    )
}