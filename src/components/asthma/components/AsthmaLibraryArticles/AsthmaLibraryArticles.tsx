import React, { useState } from 'react';
import './AsthmaLibraryArticles.css';
import { AsthmaLibraryArticle } from '../../model';
import { asthmaDataService } from '../../helpers';
import { useInitializeView } from '../../../../helpers/Initialization';
import { AsthmaLibraryArticlesPreviewState, previewData } from './AsthmaLibraryArticles.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { LoadingIndicator, Resource, ResourceImageAlignment } from '../../../presentational';

export interface AsthmaLibraryArticlesProps {
    previewState?: AsthmaLibraryArticlesPreviewState;
    categoryConfigUrl: string;
    category: string;
    imageAlignment?: ResourceImageAlignment;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaLibraryArticlesProps) {
    let [loading, setLoading] = useState<boolean>(true);
    let [articles, setArticles] = useState<AsthmaLibraryArticle[]>([]);

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setArticles(previewData[props.previewState].articles);
            setLoading(false);
            return;
        }

        asthmaDataService.loadLibraryCategories(props.categoryConfigUrl).then(categories => {
            setArticles(categories.find(category => category.category === props.category)?.articles ?? []);
            setLoading(false);
        });
    }, [], [props.previewState]);

    const onClick = (article: AsthmaLibraryArticle): void => {
        if (props.previewState || loading) return;
        MyDataHelps.openEmbeddedUrl(article.url);
    };

    return <div className="mdhui-asthma-library-articles" ref={props.innerRef}>
        <>
            {loading && <LoadingIndicator/>}
            {!loading && articles.length > 0 && articles.map((article, index) => {
                return <Resource
                    key={index}
                    title={article.title}
                    subTitle={article.subTitle}
                    imageUrl={article.imageUrl}
                    onClick={() => onClick(article)}
                    imageAlignment={props.imageAlignment}
                    hideButton={true}
                />;
            })}
            {!loading && articles.length === 0 && <div className="mdhui-asthma-library-articles-empty-text">No articles found.</div>}
        </>
    </div>;
}