import { addWeeks } from "date-fns";
import { SurveyUploadedFile } from "../../../helpers";

export function getPreviewData(): SurveyUploadedFile[] {
    return [
        createUploadedFile("Sample Portrait PDF", "PDF32000_2008.pdf", "Test Results", "These are some notes for a sample PDF"),
        createUploadedFile("Sample Text File", "MITLicense.MD", "Other", "These are some notes for a sample text file"),
        createUploadedFile("Sample Image File", "CareevolutionLogo.svg", "Images", "These are some notes for a sample image file"),
        createUploadedFile("Second Sample Portrait PDF", "PDF32000_2008.pdf", "Test Results", "These are some notes for a sample PDF"),
        createUploadedFile("Second Sample Text File", "MITLicense.MD", "Other", "These are some notes for a sample text file"),
        createUploadedFile("Second Sample Image File", "CareevolutionLogo.svg", "Images", "These are some notes for a sample image file")
    ];
}

function createUploadedFile(title: string, fileName: string, type: string, notes?: string): SurveyUploadedFile {
    return {
        surveyResultId: "12345",
        fileCategory: "",
        title: title,
        fileName: fileName,
        type: type,
        notes: notes,
        date: addWeeks(new Date(), Math.floor(Math.random() * 10))
    };
}