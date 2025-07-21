import { LibraryDocument, LibraryDocumentFileType } from '../../../helpers';
import { add, formatISO } from 'date-fns';
import { v4 as uuid } from 'uuid';

export type DocumentLibraryViewPreviewState = 'no documents' | 'some documents';

export function createPreviewDocuments(previewState: DocumentLibraryViewPreviewState): LibraryDocument[] {
    const libraryDocuments: LibraryDocument[] = [];
    const now = new Date();

    if (previewState === 'some documents') {
        libraryDocuments.push(createPreviewLibraryDocument('image', 'Vaccination Records', 'Other', add(now, { days: -7 })));
        libraryDocuments.push(createPreviewLibraryDocument('pdf', 'Insurance Card', 'Insurance / Benefits', add(now, { days: -2 })));
        libraryDocuments.push(createPreviewLibraryDocument('image', 'Lab result', undefined, add(now, { days: -5 })));
        libraryDocuments.push(createPreviewLibraryDocument('image', 'Ultrasound', 'Test Results', add(now, { days: -3 })));
        libraryDocuments.push(createPreviewLibraryDocument('pdf', 'Discharge Summary', 'Visit Summary', undefined));
        libraryDocuments.push(createPreviewLibraryDocument('image', 'Referral Letter', undefined, undefined));
        libraryDocuments.push(createPreviewLibraryDocument('image', 'Medication Help', 'Instructions', add(now, { days: -10 })));
    }

    return libraryDocuments;
}

function createPreviewLibraryDocument(fileType: LibraryDocumentFileType, name: string, type: string | undefined, date: Date | undefined): LibraryDocument {
    return {
        surveyResultId: `survey-result-id-${uuid()}`,
        fileType: fileType,
        name: name,
        type: type,
        date: date ? formatISO(date, { representation: 'date' }) : undefined,
        fileUrl: `https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.${fileType === 'pdf' ? 'pdf' : 'png'}`
    } as LibraryDocument;
}