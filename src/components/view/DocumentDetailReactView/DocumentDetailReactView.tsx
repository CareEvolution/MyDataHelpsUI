import React, { lazy, Suspense } from "react";
import { Button, Layout, LoadingIndicator, NavigationBar, Title } from "../../presentational";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { language, SurveyUploadedFileQueryParameters, queryAllSurveyFiles, SurveyUploadedFile, useInitializeView, deleteSurveyResultFiles } from "../../../helpers";
import "./DocumentDetailReactView.css";
import { getShortDateString } from "../../../helpers/date-helpers";
import { getPreviewData } from "./DocumentDetailReactView.previewData";
//import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { PdfJs } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
const Viewer = lazy(() => import('@react-pdf-viewer/core').then(module => ({ default: module.Viewer })));

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export type DocumentDetailViewPreviewType = "PreviewPdf" | "PreviewText" | "PreviewImage" | "PreviewUnknown" | "PreviewCsvFile" | "PreviewMp4" | "PreviewFileNotFound" | "PreviewLoading";

export interface DocumentDetailReactViewProps {
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
export default function DocumentDetailReactView(props: DocumentDetailReactViewProps) {
  let [documentDetail, setDocumentDetail] = React.useState<DocumentDetail>();
  let [loading, setLoading] = React.useState<boolean>(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
      setLoading(true);
      deleteSurveyResultFiles(documentDetail.surveyResultId, documentDetail.fileKey).then(() => {
        setDocumentDetail(undefined);
        MyDataHelps.dismiss();
      }).catch(error => {
        console.error('Failed to delete file:', error);
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const pdfViewer = (fileUrl: string) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className={'h-screen mdhui-survey-answer-file-preview-content'}>
          <Viewer
            // defaultScale={SpecialZoomLevel.PageWidth}
            fileUrl={'https://files.ecatholic.com/14947/documents/2025/2/2025%20March%202%20Bulletin.pdf'}
            plugins={ [defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>
      </Suspense>
    );
  }

  useInitializeView(() => {
    initialize();
  }, [], []);

  return (
    <Layout colorScheme={props.colorScheme ?? "auto"}>
      <div>This is the react viewer</div>
      <NavigationBar
          showBackButton={true}>
          {documentDetail?.showDownload &&
            <div className="mdhui-survey-answer-file-download-button">
              <Button onClick={() => downloadFile()} fullWidth={false}>{language("download")}</Button>
            </div>
          }
        </NavigationBar>
        {(!documentDetail || loading) && <LoadingIndicator />}
        {documentDetail &&
          <div className="mdhui-survey-answer-details">
            <div className="mdhui-survey-answer-file-container">
              <div className="mdhui-survey-answer-file-preview-container">
                {documentDetail?.presignedDocUrl &&
                  pdfViewer(documentDetail?.presignedDocUrl)
                }
                {documentDetail?.presignedImageUrl &&
                  <img src={documentDetail?.presignedImageUrl} alt={language("file-not-loaded")}
                    className="mdhui-survey-answer-file-preview-content mdhui-survey-answer-file-image-preview" />}
                {!documentDetail.presignedDocUrl && !documentDetail.presignedImageUrl && <div className="mdhui-survey-answer-file-document-file-name">{language("file-not-loaded")}</div>}
                <div className="mdhui-survey-answer-file-document-file-name">{documentDetail?.fileName}</div>  
              </div>
            </div>

            <div className="mdhui-survey-answer-file-document-details-parent">
              <Title order={3}>{documentDetail?.type}</Title>
              <div className="mdhui-survey-answer-file-document-details">{`${documentDetail?.title} - ${getShortDateString(documentDetail?.date!)}`}</div>
              <Title order={3}>{language("notes")}</Title>
              <div className="mdhui-survey-answer-file-document-details">{documentDetail?.notes}</div>
            </div>
            <div className="mdhui-survey-answer-file-delete-button">
              <Button variant="light" color={"var(--mdhui-color-danger)"}  onClick={deleteFile}>{language("delete")}</Button>
            </div>
          </div>
        }
    </Layout>
  );
}