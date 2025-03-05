import { DocumentDetail, DocumentDetailViewPreviewType } from "./DocumentDetailView";

export function getPreviewData(preview: DocumentDetailViewPreviewType): DocumentDetail | undefined {
    switch (preview) {
        case "PreviewPdf":
            return previewPdfData;
        case "PreviewText":
            return previewTxtData;
        case "PreviewImage":
            return previewImageData;
        case "PreviewCsvFile":
            return previewCsvFile;
        case "PreviewMp4":
            return previewMp4;
        case "PreviewFileNotFound":
            return previewFileNotFoundData;
        default:
            return undefined;
    }
}

const previewPdfData: DocumentDetail = {
    surveyResultId: "12345",
    fileCategory: "test category",
    title: "Sample Portrait PDF",
    fileName: "PDF32000_2008.pdf",
    type: "Test Results",
    notes: "These are some notes for a sample PDF",
    date: new Date(),
    presignedDocUrl: "https://freelawlibrary.org/wp-content/uploads/2022/10/The-Constitution-Full-Text-The-National-Constitution-Center.pdf",
    presignedImageUrl: "",
    fileKey: "file key"
};

const previewTxtData: DocumentDetail = {
    surveyResultId: "12345",
    fileCategory: "test category",
    title: "Pride and Prejudice",
    fileName: "PrideAndPrejudice.txt",
    type: "Other",
    notes: "These are some notes Pride and Prejudice in a text file format",
    date: new Date(),
    presignedDocUrl: "https://www.gutenberg.org/cache/epub/42671/pg42671.txt",
    presignedImageUrl: "",
    fileKey: "file key"
};

const previewImageData: DocumentDetail = {
    surveyResultId: "12345",
    fileCategory: "test category",
    title: "Sample Image File",
    fileName: "CareevolutionLogo.svg",
    type: "Images",
    notes: "These are some notes for a sample image file",
    date: new Date(),
    presignedDocUrl: "",
    presignedImageUrl: "https://careevolution.com/wp-content/themes/careevolution-2023/assets/images/logo.svg",
    fileKey: "file key"
};

const previewFileNotFoundData: DocumentDetail = {
    surveyResultId: "12345",
    fileCategory: "test category",
    title: "Sample Image File",
    fileName: "CareevolutionLogo.svg",
    type: "Images",
    notes: "These are some notes for a sample image file",
    date: new Date(),
    presignedDocUrl: "",
    presignedImageUrl: "",
    fileKey: "file key"
};

const previewCsvFile: DocumentDetail = {
    surveyResultId: "12345",
    fileCategory: "test category",
    title: "Sample Import File",
    fileName: "ImportFile.csv",
    type: "Images",
    notes: "These are some notes for a sample csv file",
    date: new Date(),
    presignedDocUrl: "https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv",
    presignedImageUrl: "",
    fileKey: "file key"
};

const previewMp4: DocumentDetail = {
    surveyResultId: "12345",
    fileCategory: "test category",
    title: "Big Buck Bunny",
    fileName: "BigBuckBunny_512kb.mp4",
    type: "MP4 File",
    notes: "The story follows Big Buck Bunny, a gentle and kind-hearted rabbit who enjoys nature. However, his peaceful life is disrupted by three mischievous rodents who bully smaller animals. After they go too far, Bunny decides to fight back, leading to a hilarious and satisfying revenge sequence.",
    date: new Date(),
    presignedDocUrl: "https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4",
    presignedImageUrl: "",
    fileKey: "file key"
};
