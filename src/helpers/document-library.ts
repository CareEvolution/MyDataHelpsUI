import { add, formatISO } from 'date-fns';
import queryAllSurveyAnswers from './query-all-survey-answers';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { formatDateForLocale } from './locale';

export interface LibraryDocument {
    surveyResultId: string;
    file: string;
    fileType: 'image' | 'pdf';
    name: string;
    type?: string;
    date?: string;
    notes?: string;
    fileKey?: string;
    fileUrl?: string;
}

export interface LibraryDocumentSurveySpecification {
    surveyName: string;
    fileResultIdentifier: string;
    nameResultIdentifier: string;
    typeResultIdentifier: string;
    dateResultIdentifier: string;
    notesResultIdentifier: string;
}

export interface AllLibraryDocumentsLoader {
    load: (surveySpecification: LibraryDocumentSurveySpecification, populateFileKeyAndUrl: boolean) => Promise<LibraryDocument[]>;
}

export type LibraryDocumentsPreviewState = 'no documents' | 'some documents';

export function createAllLibraryDocumentsLoader(previewState?: LibraryDocumentsPreviewState): AllLibraryDocumentsLoader {
    return previewState ? createPreviewAllLibraryDocumentsLoader(previewState) : {
        load: async (surveySpecification, populateFileKeyAndUrl) => {
            const surveyAnswers = await queryAllSurveyAnswers({
                surveyName: surveySpecification.surveyName,
                resultIdentifier: [
                    surveySpecification.fileResultIdentifier,
                    surveySpecification.typeResultIdentifier,
                    surveySpecification.nameResultIdentifier,
                    surveySpecification.dateResultIdentifier,
                    surveySpecification.notesResultIdentifier
                ]
            });

            const surveyAnswersByResultId = surveyAnswers.reduce((surveyAnswersByResultId, surveyAnswer) => {
                const surveyResultId = surveyAnswer.surveyResultID as string;
                surveyAnswersByResultId[surveyResultId] = surveyAnswersByResultId[surveyResultId] ?? [];
                surveyAnswersByResultId[surveyResultId].push(surveyAnswer);
                return surveyAnswersByResultId;
            }, {} as Record<string, SurveyAnswer[]>);

            const documents: LibraryDocument[] = [];
            for (const surveyResultAnswers of Object.values(surveyAnswersByResultId)) {
                const document = await createLibraryDocumentFromSurveyAnswers(surveyResultAnswers, surveySpecification, populateFileKeyAndUrl);
                if (document) {
                    documents.push(document);
                }
            }

            return documents;
        }
    };
}

export interface SingleLibraryDocumentLoader {
    load: (surveyResultId: string, surveySpecification: LibraryDocumentSurveySpecification, populateFileKeyAndUrl: boolean) => Promise<LibraryDocument | undefined>;
}

export function createSingleLibraryDocumentLoader(preview?: boolean): SingleLibraryDocumentLoader {
    return preview ? createPreviewSingleLibraryDocumentLoader() : {
        load: async (surveyResultId, surveySpecification, populateFileKeyAndUrl) => {
            const surveyAnswers = await queryAllSurveyAnswers({
                surveyResultID: surveyResultId,
                resultIdentifier: [
                    surveySpecification.fileResultIdentifier,
                    surveySpecification.typeResultIdentifier,
                    surveySpecification.nameResultIdentifier,
                    surveySpecification.dateResultIdentifier,
                    surveySpecification.notesResultIdentifier
                ]
            });
            return createLibraryDocumentFromSurveyAnswers(surveyAnswers, surveySpecification, populateFileKeyAndUrl);
        }
    };
}

export function createLibraryDocumentSorter(sortKey: keyof LibraryDocument, sortDirection: 'asc' | 'desc') {
    return (document1: LibraryDocument, document2: LibraryDocument) => {
        const key1 = document1[sortKey];
        const key2 = document2[sortKey];

        if (key1 === key2) return document1.name.localeCompare(document2.name);
        if (key1 === undefined) return 1;
        if (key2 === undefined) return -1;

        return sortDirection === 'asc' ? key1.localeCompare(key2) : key2.localeCompare(key1);
    };
}

export function formatLibraryDocumentDateAndType(document: LibraryDocument): string {
    let dateAndType = '';
    if (document.date) {
        dateAndType += formatDateForLocale(document.date, 'P');
    }
    if (document.type) {
        if (dateAndType.length > 0) {
            dateAndType += ' - ';
        }
        dateAndType += document.type;
    }
    return dateAndType;
}

async function createLibraryDocumentFromSurveyAnswers(
    surveyAnswers: SurveyAnswer[],
    surveySpecification: LibraryDocumentSurveySpecification,
    populateFileKeyAndUrl: boolean
): Promise<LibraryDocument | undefined> {
    const fileAnswer = surveyAnswers.find(sa => sa.resultIdentifier === surveySpecification.fileResultIdentifier);
    const nameAnswer = surveyAnswers.find(sa => sa.resultIdentifier === surveySpecification.nameResultIdentifier);
    if (!fileAnswer || !nameAnswer) return undefined;

    const typeAnswer = surveyAnswers.find(sa => sa.resultIdentifier === surveySpecification.typeResultIdentifier);
    const dateAnswer = surveyAnswers.find(sa => sa.resultIdentifier === surveySpecification.dateResultIdentifier);
    const notesAnswer = surveyAnswers.find(sa => sa.resultIdentifier === surveySpecification.notesResultIdentifier);

    const surveyResultID = fileAnswer.surveyResultID as string;
    const { fileKey = undefined, fileUrl = undefined } = populateFileKeyAndUrl ? await getFileKeyAndUrl(surveyResultID) : {};

    return {
        surveyResultId: surveyResultID,
        file: fileAnswer.answers[0],
        fileType: fileAnswer.answers[0].toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
        name: nameAnswer.answers[0],
        type: typeAnswer?.answers[0],
        date: dateAnswer?.answers[0],
        notes: notesAnswer?.answers[0],
        fileKey: fileKey,
        fileUrl: fileUrl
    };
}

async function getFileKeyAndUrl(surveyResultID: string): Promise<{ fileKey?: string, fileUrl?: string }> {
    const filesPage = await MyDataHelps.queryFiles({ category: `surveyresult_${surveyResultID}` });
    if (filesPage.files.length > 0) {
        const fileKey = filesPage.files[0].key;
        const fileUrl = (await MyDataHelps.getFileDownloadUrl(fileKey))?.preSignedUrl;
        return { fileKey: fileKey, fileUrl: fileUrl };
    }
    return {};
}

function createPreviewAllLibraryDocumentsLoader(previewState: LibraryDocumentsPreviewState): AllLibraryDocumentsLoader {
    const libraryDocuments: LibraryDocument[] = [];
    const now = new Date();

    if (previewState === 'some documents') {
        libraryDocuments.push(createPreviewLibraryDocument('vr_05022025.png', 'Vaccination Records', 'Other', add(now, { days: -7 })));
        libraryDocuments.push(createPreviewLibraryDocument('ic_050322025.pdf', 'Insurance Card', 'Insurance / Benefits', add(now, { days: -2 })));
        libraryDocuments.push(createPreviewLibraryDocument('lr_03022025.png', 'Lab result', undefined, add(now, { days: -5 })));
        libraryDocuments.push(createPreviewLibraryDocument('us_01162025.png', 'Ultrasound', 'Test Results', add(now, { days: -3 })));
        libraryDocuments.push(createPreviewLibraryDocument('ds_08152024.png', 'Discharge Summary', 'Visit Summary', undefined));
        libraryDocuments.push(createPreviewLibraryDocument('rl_06022024.png', 'Referral Letter', undefined, undefined));
        libraryDocuments.push(createPreviewLibraryDocument('mh_02232025.png', 'Medication Help', 'Instructions', add(now, { days: -10 })));
    }

    return {
        load: async () => libraryDocuments
    };
}

function createPreviewSingleLibraryDocumentLoader(): SingleLibraryDocumentLoader {
    return {
        load: async () => createPreviewLibraryDocument('vr_05022025.png', 'Vaccination Records', 'Other', add(new Date(), { days: -7 }))
    };
}

function createPreviewLibraryDocument(file: string, name: string, type?: string, date?: Date): LibraryDocument {
    const fileType = file.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image';
    return {
        file: file,
        fileType: fileType,
        name: name,
        type: type,
        date: date ? formatISO(date, { representation: 'date' }) : undefined,
        fileUrl: fileType === 'image'
            ? 'https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.png'
            : 'https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.pdf'
    } as LibraryDocument
}