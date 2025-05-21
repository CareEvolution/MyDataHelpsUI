import { LibraryDocument } from '../../../helpers';

export type DocumentDetailViewPreviewState = 'image loaded on web' | 'image loaded on mobile' | 'pdf loaded on web' | 'pdf loaded on mobile';

export function createPreviewDocument(previewState: DocumentDetailViewPreviewState): LibraryDocument {
    return {
        file: `vr_05022025.${previewState.startsWith('pdf') ? 'pdf' : 'png'}`,
        fileType: previewState.startsWith('pdf') ? 'pdf' : 'image',
        name: 'Vaccination Records',
        type: 'Other',
        date: '2025-05-02',
        notes: 'Here are some notes about this document.',
        fileUrl: `https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.${previewState.startsWith('pdf') ? 'pdf' : 'png'}`
    } as LibraryDocument;
}