import React from "react";
import { Button, Layout, LoadingIndicator, NavigationBar, Title } from "../../presentational";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { language, SurveyUploadedFileQueryParameters, queryAllSurveyFiles, SurveyUploadedFile, useInitializeView, deleteSurveyResultFiles } from "../../../helpers";
import "./DocumentDetailView.css";
import { getShortDateString } from "../../../helpers/date-helpers";
import { getPreviewData } from "./DocumentDetailView.previewData";

export type DocumentDetailViewPreviewType = "PreviewPdf" | "PreviewOptionalFields" | "PreviewText" | "PreviewImage" | "PreviewUnknown" | "PreviewCsvFile" | "PreviewMp4" | "PreviewFileNotFound" | "PreviewLoading";

export interface DocumentDetailViewProps {
  preview?: DocumentDetailViewPreviewType,
  surveyResultId: string,
  fileResultIdentifier: string,
  typeResultIdentifier: string,
  nameResultIdentifier: string,
  dateResultIdentifier: string,
  notesResultIdentifier: string,
  colorScheme?: "auto" | "light" | "dark"
}

export interface DocumentDetail extends SurveyUploadedFile {
  presignedDocUrl: string,
  presignedImageUrl: string,
  fileKey: string
}

/** This view displays a file uploaded by the user via specified survey 
 * The survey must be configured to allow deleting of survey results
*/
export default function DocumentDetailView(props: DocumentDetailViewProps) {
  const [documentDetail, setDocumentDetail] = React.useState<DocumentDetail>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [downloadAsWeb, setDownloadAsWeb] = React.useState<boolean>(true);

  async function initialize() {
    const params: SurveyUploadedFileQueryParameters = {
      fileResultIdentifier: props.fileResultIdentifier,
      typeResultIdentifier: props.typeResultIdentifier,
      nameResultIdentifier: props.nameResultIdentifier,
      dateResultIdentifier: props.dateResultIdentifier,
      notesResultIdentifier: props.notesResultIdentifier,
      surveyResultId: props.surveyResultId
    };

    if (props.preview) {
      if (props.preview !== "PreviewLoading") {
        const previewData = getPreviewData(props.preview);
        setDocumentDetail(previewData);
        return;
      }
    }

    Promise.all([
      MyDataHelps.getDeviceInfo(),
      queryAllSurveyFiles({ ...params })
    ]).then(([deviceInfo, uploadedFiles]) => {
      setDownloadAsWeb(!deviceInfo || deviceInfo.platform === "Web");

      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0];
        MyDataHelps.queryFiles({ category: file.fileCategory }).then(function (files) {
          if (files.files.length === 0) {
            setDocumentDetail({ ...file } as DocumentDetail);
            return;
          }

          MyDataHelps.getFileDownloadUrl(files.files[0].key).then(function (response) {
            let documentDetail: DocumentDetail = {
              ...file,
              presignedDocUrl: "",
              presignedImageUrl: "",
              fileKey: files.files[0].key
            };

            if (isImageFile(file.fileName)) {
              documentDetail.presignedImageUrl = response.preSignedUrl;
            } else {
              documentDetail.presignedDocUrl = response.preSignedUrl;
            }

            setDocumentDetail(documentDetail);
          });
        });
      }
    });
  }

  function isImageFile(fileName: string) {
    if (!fileName) return false;

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg', '.ico', '.avif'];
    const lowerCaseFileName = fileName.toLowerCase();
    return imageExtensions.some(ext => lowerCaseFileName.endsWith(ext));
  }

  async function downloadFile() {
    if (downloadAsWeb) {
      window.open(documentDetail?.presignedDocUrl ?? documentDetail?.presignedImageUrl, "_blank");
    } else {
      MyDataHelps.openEmbeddedUrl(documentDetail?.presignedDocUrl!);
    }
  }

  const deleteFile = async () => {
    if (!documentDetail?.fileKey || !documentDetail?.surveyResultId) {
      return;
    }

    if (window.confirm(language("delete-file-confirm"))) {
      setLoading(true);
      deleteSurveyResultFiles(documentDetail.surveyResultId, documentDetail.fileKey).then(() => {
        setDocumentDetail(undefined);
        MyDataHelps.back();
      }).catch(error => {
        console.error('Failed to delete file:', error);
      }).finally(() => {
        setLoading(false);
      });
    }
  };


  useInitializeView(() => {
    initialize();
  }, [], []);

  return (
    <Layout bodyBackgroundColor={"var(--mdhui-background-color-0)"} colorScheme={props.colorScheme ?? "auto"} >
      <NavigationBar
        showBackButton={true}>
      </NavigationBar>
      {(!documentDetail || loading) && <LoadingIndicator />}
      {documentDetail &&
        <div className="mdhui-survey-answer-details">
          <div className="mdhui-survey-answer-file-container">
            {documentDetail?.presignedImageUrl &&
              <div className="mdhui-survey-answer-file-preview-container">
                <img src={documentDetail?.presignedImageUrl} alt={language("file-not-loaded")}
                  className="mdhui-survey-answer-file-preview-content" />

              </div>
            }
            {!documentDetail?.presignedDocUrl && !documentDetail.presignedImageUrl && <div className="mdhui-survey-answer-file-document-file-name">{language("file-not-loaded")}</div>}
          </div>

          <div className="mdhui-survey-answer-file-document-info-row-parent">
            <div className="mdhui-survey-answer-file-document-info-row">
              <Title order={3}>{documentDetail?.title}</Title>
              <div className="mdhui-survey-answer-file-document-file-name">{documentDetail?.fileName}</div>
            </div>
            <div className="mdhui-survey-answer-file-document-info-row"  >
              {documentDetail?.type &&
                <div className="mdhui-survey-answer-file-document-type">
                  <Title order={4}>{language("document-type")}:</Title>
                  <div className="mdhui-survey-answer-file-document-type-text">{documentDetail?.type}</div>
                </div>
              }
              <div>{getShortDateString(documentDetail?.date!)}</div>
            </div>
            {documentDetail?.notes &&
              <div className="mdhui-survey-answer-file-document-notes">
                <Title order={4}>{language("notes")}</Title>
                <div>{documentDetail?.notes}</div>
              </div>
            }
          </div>
          <div className="mdhui-survey-answer-file-button-row"  >
            <Button variant="light" color={"var(--mdhui-color-danger)"} onClick={deleteFile} fullWidth={documentDetail?.presignedDocUrl ? false : true}>{language("delete")}</Button>
            {documentDetail?.presignedDocUrl &&
              <Button onClick={() => downloadFile()} fullWidth={false}>{language("download")}</Button>
            }
          </div>
        </div>
      }
    </Layout>
  );
}