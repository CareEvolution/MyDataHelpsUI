import { LibraryDocument } from '../../../helpers';

export type DocumentLibraryPreviewPreviewState = 'no documents' | 'some documents';

export function createPreviewDocuments(previewState: DocumentLibraryPreviewPreviewState): LibraryDocument[] {
    const libraryDocuments: LibraryDocument[] = [];

    if (previewState === 'some documents') {
        libraryDocuments.push({ name: 'Vaccination Records' } as LibraryDocument);
        libraryDocuments.push({ name: 'Insurance Card' } as LibraryDocument);
        libraryDocuments.push({ name: 'Lab result' } as LibraryDocument);
        libraryDocuments.push({ name: 'Ultrasound' } as LibraryDocument);
    }

    return libraryDocuments;
}

