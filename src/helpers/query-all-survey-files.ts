import { SurveyAnswer, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { parseISO } from "date-fns";
import queryAllSurveyAnswers from "./query-all-survey-answers";

export interface SurveyUploadedFile {
    surveyResultId: string,
    fileCategory: string,
    title: string,
    fileName: string,
    type: string,
    notes?: string,
    date: Date
}

export interface SurveyUploadedFileQueryParameters {
    uploadDocumentSurveyName: string,
    fileResultIdentifier: string,
    typeResultIdentifier: string,
    nameResultIdentifier: string,
    dateResultIdentifier: string,
    notesResultIdentifier: string
    surveyResultId?: string
}

export default async function (props: SurveyUploadedFileQueryParameters): Promise<SurveyUploadedFile[]> {

    async function groupSurveyAnswersByResults(answers: SurveyAnswer[]) {
        let uploadedFiles: SurveyUploadedFile[] = [];

        if (answers.length > 0) {
            let resultIds = [...new Set(answers.map(a => a.surveyResultID))];
            resultIds.forEach(async (resultId) => {
                var resultsForSubmission = answers.filter(a => a.surveyResultID == resultId);
                var useDate = "";
                if (props.dateResultIdentifier) {
                    var dateResults = resultsForSubmission.find(r => r.resultIdentifier == props.dateResultIdentifier);
                    useDate = dateResults && dateResults.answers ? dateResults.answers[0] : resultsForSubmission[0].date;
                } else {
                    useDate = resultsForSubmission[0].date;
                }
                const titleResults = resultsForSubmission.find(r => r.resultIdentifier == props.nameResultIdentifier);
                const title = titleResults && titleResults.answers ? titleResults.answers[0] : "";
                var fileNameResults = resultsForSubmission.find(r => r.resultIdentifier == props.fileResultIdentifier);
                const fileName = fileNameResults && fileNameResults.answers ? fileNameResults.answers[0] : "";
                const fileNameResultID = fileNameResults && fileNameResults.surveyResultID ? `${fileNameResults.surveyResultID}` : "";
                var typeResults = resultsForSubmission.find(r => r.resultIdentifier == props.typeResultIdentifier);
                const type = typeResults && typeResults.answers ? typeResults.answers[0] : "";
                var notesResults = resultsForSubmission.find(r => r.resultIdentifier == props.notesResultIdentifier);
                const notes = notesResults && notesResults.answers ? notesResults.answers[0] : "";

                if (!Number.isNaN(Date.parse(useDate)) &&
                    title && fileName && type) {
                    const useFileDate = parseISO(useDate);
                    const newUploadedFile: SurveyUploadedFile = {
                        surveyResultId: `${resultId}`,
                        fileCategory: `surveyresult_${fileNameResultID}`,
                        title: title,
                        fileName: fileName,
                        type: type,
                        notes: notes,
                        date: useFileDate
                    };
                    
                    uploadedFiles.push(newUploadedFile);
                }
            });
        }
        return uploadedFiles;
    }

    let queryParameters: SurveyAnswersQuery = {
        surveyName : props.uploadDocumentSurveyName,
        resultIdentifier : [props.fileResultIdentifier!,
            props.typeResultIdentifier!, props.nameResultIdentifier!,
            props.dateResultIdentifier!, props.notesResultIdentifier!]
    };

    if (props.surveyResultId) {
        queryParameters.surveyResultID = props.surveyResultId;
    }

    return await queryAllSurveyAnswers(queryParameters).then((surveyAnswers: SurveyAnswer[]) => {
        return groupSurveyAnswersByResults(surveyAnswers);
    });
}
