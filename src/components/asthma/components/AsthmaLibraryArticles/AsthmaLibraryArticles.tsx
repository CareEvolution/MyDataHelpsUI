import React from 'react';
import './AsthmaLibraryArticles.css';
import { AsthmaLibraryArticle } from '../../model';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { Resource, ResourceImageAlignment } from '../../../presentational';
import { AsthmaLibraryArticlesPreviewState, previewData } from './AsthmaLibraryArticles.previewData';
import language from '../../../../helpers/language';

export interface AsthmaLibraryArticlesProps {
    previewState?: AsthmaLibraryArticlesPreviewState;
    articles: AsthmaLibraryArticle[];
    imageAlignment?: ResourceImageAlignment;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaLibraryArticlesProps) {
    const onClick = (article: AsthmaLibraryArticle): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(article.url);
    };

    let articles = props.previewState ? previewData[props.previewState].articles : props.articles;

    return <div className="mdhui-asthma-library-articles" ref={props.innerRef}>
        <>
            {articles.length > 0 && articles.map((article, index) => {
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
            {articles.length === 0 &&
                <div className="mdhui-asthma-library-articles-empty-text">{language('asthma-library-articles-empty-text')}</div>
            }
        </>
    </div>;
}