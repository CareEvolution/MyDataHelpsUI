import { deleteSurveyResultFiles, queryAllSurveyFiles, SurveyUploadedFile } from  "../../src/helpers";
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';

jest.mock('@careevolution/mydatahelps-js', () => {
    const answers : SurveyAnswer[] = [
        {id: "abc123", surveyResultID: "abc123", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileName", answers: ["Colonoscopy Report"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "def456", surveyResultID: "abc123", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "file", answers: ["Colon.txt"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "ghi789", surveyResultID: "abc123", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileNotes", answers: ["Notes on colonoscopy"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "jkl012", surveyResultID: "abc123", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileType", answers: ["Other"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "mno345", surveyResultID: "abc123", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileDate", answers: ["2025-01-01"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "pqr678", surveyResultID: "pqr678", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileName", answers: ["BCBS Insurance"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "stu901", surveyResultID: "pqr678", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "file", answers: ["BCBS.png"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "vwx234", surveyResultID: "pqr678", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileNotes", answers: ["From my phone"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "yza567", surveyResultID: "pqr6789", surveyName: "wrong-test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileType", answers: ["Insurance"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "bcd890", surveyResultID: "pqr678", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "fileDate", answers: ["1-2-2025"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "efg123", surveyResultID: "pqr678", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2021-01-01", stepIdentifier: "step1", resultIdentifier: "result11", answers: ["answer11"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "a3c123", surveyResultID: "456abc", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2025-01-01", stepIdentifier: "step1", resultIdentifier: "fileName", answers: ["Mammography Report"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "d3f456", surveyResultID: "456abc", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2025-01-01", stepIdentifier: "step1", resultIdentifier: "file", answers: ["TestsResults.pdf"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "g3i789", surveyResultID: "456abc", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2025-01-01", stepIdentifier: "step1", resultIdentifier: "fileNotes", answers: ["These are in the portal"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "j3l012", surveyResultID: "456abc", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2025-01-01", stepIdentifier: "step1", resultIdentifier: "fileType", answers: ["Results"], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
        {id: "m3o345", surveyResultID: "456abc", surveyName: "test-survey", surveyDisplayName: "Test Survey", date: "2024-01-01", stepIdentifier: "step1", resultIdentifier: "fileDate", answers: [""], insertedDate: "2021-01-01", surveyID: "123456", surveyVersion: 1},
    ];

    const answersPage = {
        surveyAnswers: answers
    };

    return {
        __esModule: true,
        default: {
            token: { access_token: '1' },
            getCurrentLanguage: () => jest.fn(),
            deleteSurveyResult: jest.fn().mockResolvedValue(undefined),
            deleteFile: jest.fn().mockResolvedValue(undefined),
            querySurveyAnswers: jest.fn(() => {
                return Promise.resolve(answersPage);
            }),
            on: jest.fn(),
            off: jest.fn()
        }
    }
});

afterEach(() => {
    jest.clearAllMocks();
});

const colonoscopyReport : SurveyUploadedFile = {
    surveyResultId: "abc123",
    fileCategory: "surveyresult_abc123",
    title: "Colonoscopy Report",
    fileName: "Colon.txt",
    type: "Other",
    notes: "Notes on colonoscopy",
    date: new Date("2025-01-01T00:00:00")
};

const mammographyReport : SurveyUploadedFile = {
    surveyResultId: "456abc",
    fileCategory: "surveyresult_456abc",
    title: "Mammography Report",
    fileName: "TestsResults.pdf",
    type: "Results",
    notes: "These are in the portal",
    date: new Date("2024-01-01T00:00:00") //confirms use of result date when answer not on file
};

test("a SurveyUploadedFile is returned when all required fields are on file", async () => {
    const surveyFiles = await queryAllSurveyFiles({
        uploadDocumentSurveyName: "test-survey",
        fileResultIdentifier: "file",
        typeResultIdentifier: "fileType",
        nameResultIdentifier: "fileName",
        dateResultIdentifier: "fileDate",
        notesResultIdentifier: "fileNotes"
    });

    expect(surveyFiles).toHaveLength(2);
    expect(surveyFiles).toContainEqual(mammographyReport);
    expect(surveyFiles).toContainEqual(colonoscopyReport);
});

test("should call both MyDataHelps.deleteSurveyResult and MyDataHelps.deleteFile", async () => {
    await deleteSurveyResultFiles("test-id", "test-file-key");
    expect(MyDataHelps.deleteSurveyResult).toHaveBeenCalledWith("test-id");
    expect(MyDataHelps.deleteFile).toHaveBeenCalledWith("test-file-key");
});

test("should not delete file if MyDataHelps.deleteSurveyResult fails", async () => {
    (MyDataHelps.deleteSurveyResult as jest.Mock).mockRejectedValueOnce(new Error("Failed to delete survey result"));
    await deleteSurveyResultFiles("test-id", "test-file-key");
    expect(MyDataHelps.deleteSurveyResult).toHaveBeenCalledWith("test-id");
    expect(MyDataHelps.deleteFile).toHaveBeenCalledTimes(0);
});
 
test("should not call either MyDataHelps.deleteSurveyResult and MyDataHelps.deleteFile if surveyResultId is empty string", async () => {
    await deleteSurveyResultFiles("", "test-file-key");
    expect(MyDataHelps.deleteSurveyResult).toHaveBeenCalledTimes(0);
    expect(MyDataHelps.deleteFile).toHaveBeenCalledTimes(0);
});

test("should not call either MyDataHelps.deleteSurveyResult and MyDataHelps.deleteFile if fileKey is empty string", async () => {
    await deleteSurveyResultFiles("test-id", "");
    expect(MyDataHelps.deleteSurveyResult).toHaveBeenCalledTimes(0);
    expect(MyDataHelps.deleteFile).toHaveBeenCalledTimes(0);
});