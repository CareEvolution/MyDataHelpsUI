import React from "react";
import { Button, Layout, LoadingIndicator, Title } from "../../presentational";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { language, SurveyUploadedFileQueryParameters, queryAllSurveyFiles, SurveyUploadedFile, useInitializeView, deleteSurveyResultFiles } from "../../../helpers";
import "./DocumentDetailView.css";
import { getShortDateString } from "../../../helpers/date-helpers";
import { getPreviewData } from "./DocumentDetailView.previewData";

export type DocumentDetailViewPreviewType = "PreviewPdf" | "PreviewText" | "PreviewImage" | "PreviewUnknown" | "PreviewCsvFile" | "PreviewMp4" | "PreviewFileNotFound" | "PreviewLoading";

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
  showDownload: boolean,
  fileKey: string
}

/** This view displays a file uploaded by the user via specified survey 
 * The survey must be configured to allow deleting of survey results
*/
export default function DocumentDetailView(props: DocumentDetailViewProps) {
  let [documentDetail, setDocumentDetail] = React.useState<DocumentDetail>();

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
              showDownload: !["iOS", "Android"].includes(deviceInfo?.platform) && !file.fileName.endsWith("pdf"),
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
    const deviceInfo = await MyDataHelps.getDeviceInfo();

    if (!deviceInfo || deviceInfo.platform == "Web") {
      window.open(documentDetail?.presignedDocUrl ?? documentDetail?.presignedImageUrl, "_blank");
    } else {
      (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: documentDetail?.presignedDocUrl ?? documentDetail?.presignedImageUrl });
    }
  }

  const deleteFile = async () => {
    if (!documentDetail?.fileKey || !documentDetail?.surveyResultId) {
      return;
    }

    if (window.confirm(language("delete-file-confirm"))) {
      deleteSurveyResultFiles(documentDetail.surveyResultId, documentDetail.fileKey).then(() => {
        setDocumentDetail(undefined);
        MyDataHelps.dismiss();
      });
    }
  };


  useInitializeView(() => {
    initialize();
  }, [], []);

  return (
    <Layout colorScheme={props.colorScheme} >
      {(!documentDetail) && <LoadingIndicator />}
      {documentDetail?.showDownload &&
        <div className="mdhui-survey-answer-file-download-button">
          <Button onClick={() => downloadFile()} fullWidth={false} children={language("download")} ></Button>
        </div>
      }

      {documentDetail &&
        <>
          <div className="mdhui-survey-answer-details-container">
            <div className="mdhui-survey-answer-file-preview-container">
              {documentDetail?.presignedDocUrl &&
                <iframe src={documentDetail?.presignedDocUrl} className="mdhui-survey-answer-file-preview-content"></iframe>}
              {documentDetail?.presignedImageUrl &&
                <img src={documentDetail?.presignedImageUrl} alt={language("file-not-loaded")}
                  className="mdhui-survey-answer-file-preview-content mdhui-survey-answer-file-image-preview" />}
              {!documentDetail.presignedDocUrl && !documentDetail.presignedImageUrl && <div className="mdhui-survey-answer-file-document-file-name">{language("file-not-loaded")}</div>}
            </div>
            <div className="mdhui-survey-answer-file-document-file-name">{documentDetail?.fileName}</div>
          </div>

          <div className="mdhui-survey-answer-file-document-details-parent">
            <Title order={3}>{documentDetail?.type}</Title>
            <div className="mdhui-survey-answer-file-document-details">{`${documentDetail?.title} - ${getShortDateString(documentDetail?.date!)}`}</div>
            <Title order={3}>{language("notes")}</Title>
            <div className="mdhui-survey-answer-file-document-details">{documentDetail?.notes}</div>
            <Button variant="default" onClick={deleteFile} children={language("delete")} ></Button>
          </div>
        </>
      }
    </Layout>
  );
}