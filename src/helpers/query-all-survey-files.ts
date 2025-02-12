import MyDataHelps, { SurveyAnswer, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { parseISO } from "date-fns";
import queryAllSurveyAnswers from "./query-all-survey-answers";

export interface SurveyUploadedFile {
    title: string,
    fileName: string,
    fileKey: string,
    type: string,
    notes?: string,
    date: Date
}

export interface SurveyUploadedFileQueryParameters {
    participantID: string,
    projectID: string,
    uploadDocumentSurveyName: string,
    fileResultIdentifier: string,
    typeResultIdentifier: string,
    nameResultIdentifier: string,
    dateResultIdentifier: string,
    notesResultIdentifier: string
}

export default async function (props: SurveyUploadedFileQueryParameters): Promise<SurveyUploadedFile[]> {

    function buildKey(fileName: string, surveyResultID: string) {
        const name = `${new Date().toISOString()}_${fileName}`;
        return  `${props.projectID}/${props.participantID}/surveyresult_${surveyResultID}/${name}`;
    }

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
                const fileNameResultID = fileNameResults && fileNameResults.id ? `${fileNameResults.id}` : "";
                var typeResults = resultsForSubmission.find(r => r.resultIdentifier == props.typeResultIdentifier);
                const type = typeResults && typeResults.answers ? typeResults.answers[0] : "";
                var notesResults = resultsForSubmission.find(r => r.resultIdentifier == props.notesResultIdentifier);
                const notes = notesResults && notesResults.answers ? notesResults.answers[0] : "";

                if (!Number.isNaN(Date.parse(useDate)) &&
                    title && fileName && type) {
                    const useFileDate = parseISO(useDate);
                    const newUploadedFile: SurveyUploadedFile = {
                        title: title,
                        fileName: fileName,
                        fileKey: buildKey(fileName, fileNameResultID),
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

    var queryParameters: SurveyAnswersQuery = {
        surveyName: props.uploadDocumentSurveyName,
        resultIdentifier: [props.fileResultIdentifier, props.typeResultIdentifier, props.nameResultIdentifier, props.dateResultIdentifier, props.notesResultIdentifier]
    };

    return await queryAllSurveyAnswers(queryParameters).then((surveyAnswers: SurveyAnswer[]) => {
        var sortedAnswers = (surveyAnswers).sort((a, b) => {
            if (parseISO(a.date) > parseISO(b.date)) { return -1; }
            if (parseISO(a.date) < parseISO(b.date)) { return 1; }
            return 0;
        });

        return groupSurveyAnswersByResults(sortedAnswers);
    });
}
