import { AsthmaLibraryArticlesPreviewState } from "../../components";

export type AsthmaLibraryCategoryViewPreviewState = 'no articles' | 'some articles';

export interface AsthmaLibraryCategoryViewPreviewData {
    articlesPreviewState: AsthmaLibraryArticlesPreviewState;
}

export const previewData: Record<AsthmaLibraryCategoryViewPreviewState, AsthmaLibraryCategoryViewPreviewData> = {
    'no articles': {articlesPreviewState: 'no articles'},
    'some articles': {articlesPreviewState: 'some articles'}
};