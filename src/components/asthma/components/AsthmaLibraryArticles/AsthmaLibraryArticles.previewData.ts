import { AsthmaLibraryArticle } from '../../model';
import sampleResourceImage from '../../../../assets/resource-image.png';

export type AsthmaLibraryArticlesPreviewState = 'no articles' | 'some articles';

export interface AsthmaLibraryArticlesPreviewData {
    articles: AsthmaLibraryArticle[];
}

export const previewData: Record<AsthmaLibraryArticlesPreviewState, AsthmaLibraryArticlesPreviewData> = {
    'no articles': {
        articles: [] as AsthmaLibraryArticle[]
    },
    'some articles': {
        articles: [
            {"title": "Article 1 Title", "subTitle": "article 1 subtitle", "imageUrl": sampleResourceImage} as AsthmaLibraryArticle,
            {"title": "Article 2 Title", "subTitle": "article 2 subtitle", "imageUrl": sampleResourceImage} as AsthmaLibraryArticle,
            {"title": "Article 3 Title", "subTitle": "article 3 subtitle", "imageUrl": sampleResourceImage} as AsthmaLibraryArticle,
            {"title": "Article 4 Title", "subTitle": "article 4 subtitle", "imageUrl": sampleResourceImage} as AsthmaLibraryArticle,
            {"title": "Article 5 Title", "subTitle": "article 5 subtitle", "imageUrl": sampleResourceImage} as AsthmaLibraryArticle
        ]
    }
};