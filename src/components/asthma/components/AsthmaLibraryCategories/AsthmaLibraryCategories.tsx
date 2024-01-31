import React, { useState } from 'react';
import './AsthmaLibraryCategories.css';
import { AsthmaLibraryCategory } from '../../model';
import { asthmaDataService } from '../../helpers';
import { useInitializeView } from '../../../../helpers/Initialization';
import { AsthmaLibraryCategoriesPreviewState, previewData } from './AsthmaLibraryCategories.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { Action, Card, LoadingIndicator } from '../../../presentational';

export interface AsthmaLibraryCategoriesProps {
    previewState?: AsthmaLibraryCategoriesPreviewState;
    categoryConfigUrl: string;
    categoryViewUrl: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaLibraryCategoriesProps) {
    let [loading, setLoading] = useState<boolean>(true);
    let [categories, setCategories] = useState<AsthmaLibraryCategory[]>([]);

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setCategories(previewData[props.previewState].categories);
            setLoading(false);
            return;
        }

        asthmaDataService.loadLibraryCategories(props.categoryConfigUrl).then(categories => {
            setCategories(categories);
            setLoading(false);
        });
    }, [], [props.previewState]);

    const onClick = (category: AsthmaLibraryCategory): void => {
        if (props.previewState || loading) return;
        MyDataHelps.openApplication(props.categoryViewUrl + '?title=' + category.title + '&category=' + category.category, {modal: true});
    };

    return <div className="mdhui-asthma-library-categories" ref={props.innerRef}>
        <>
            {loading && !categories && <LoadingIndicator/>}
            {categories && categories.length > 0 && categories.map((category, index) => {
                return <Card key={index}>
                    <Action className="mdhui-asthma-library-category" title={category.title} onClick={() => onClick(category)}/>
                </Card>;
            })}
            {!loading && (!categories || categories.length === 0) &&
                <div className="mdhui-asthma-library-categories-empty-text">No categories found.</div>
            }
        </>
    </div>;
}