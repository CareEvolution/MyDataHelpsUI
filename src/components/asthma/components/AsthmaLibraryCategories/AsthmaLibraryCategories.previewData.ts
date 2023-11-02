import { AsthmaLibraryCategory } from '../../model';

export type AsthmaLibraryCategoriesPreviewState = 'no categories' | 'some categories';

export interface AsthmaLibraryCategoriesPreviewData {
    categories: AsthmaLibraryCategory[];
}

export const previewData: Record<AsthmaLibraryCategoriesPreviewState, AsthmaLibraryCategoriesPreviewData> = {
    'no categories': {categories: []},
    'some categories': {
        categories: [
            {"title": "Category 1"} as AsthmaLibraryCategory,
            {"title": "Category 2"} as AsthmaLibraryCategory,
            {"title": "Category 3"} as AsthmaLibraryCategory,
            {"title": "Category 4"} as AsthmaLibraryCategory,
            {"title": "Category 5"} as AsthmaLibraryCategory
        ]
    }
};