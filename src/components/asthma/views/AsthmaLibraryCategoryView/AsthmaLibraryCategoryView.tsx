import React, { useMemo } from 'react';
import { getLanguageCodeFromIso, language } from '../../../../helpers';
import { Layout, NavigationBar, ResourceDefinition, ResourceList, Title } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaLibraryCategoryViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    title: string;
    category: string;
    libraryBaseUrl: string;
}

export default function AsthmaLibraryCategoryView(props: AsthmaLibraryCategoryViewProps) {
    const languageCode = getLanguageCodeFromIso(MyDataHelps.getCurrentLanguage());
    const categoryConfig = useMemo(() => createCategoryConfig(props.libraryBaseUrl, languageCode), [props.libraryBaseUrl, languageCode]);

    const onViewResource = (resource: ResourceDefinition): void => {
        MyDataHelps.openEmbeddedUrl(resource.url);
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar variant="compressed" showCloseButton={true}>
            <Title style={{ textAlign: 'left' }} order={1}>{props.title}</Title>
        </NavigationBar>
        <ResourceList
            resources={categoryConfig[props.category] ?? []}
            onViewResource={onViewResource}
            emptyText={language('asthma-library-category-view-empty-text')}
            imageAlignment="left"
            buttonVariant="link"
            buttonText={language('asthma-library-category-view-resource-button-text')}
            style={{ padding: 0 }}
        />
    </Layout>;
}

function createCategoryConfig(libraryBaseUrl: string, languageCode: string): Record<string, ResourceDefinition[]> {
    return {
        'basics': [
            createResourceDefinition('asthma-overview', '10', 'asthmabasics', libraryBaseUrl, languageCode),
            createResourceDefinition('airways-and-asthma', '11', 'asthmabasics', libraryBaseUrl, languageCode)
        ],
        'control': [
            createResourceDefinition('what-is-asthma-control', '20', 'asthmacontrol', libraryBaseUrl, languageCode),
            createResourceDefinition('how-to-keep-your-asthma-under-control', '21', 'asthmacontrol', libraryBaseUrl, languageCode),
            createResourceDefinition('is-your-asthma-under-control', '22', 'asthmacontrol', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-attack-early-warning-signs', '23', 'asthmacontrol', libraryBaseUrl, languageCode),
            createResourceDefinition('navigating-the-danger-zone-preparedness-for-asthma-flare-ups', '24', 'asthmacontrol', libraryBaseUrl, languageCode),
            createResourceDefinition('taking-charge-of-your-asthma', '25', 'asthmacontrol', libraryBaseUrl, languageCode)
        ],
        'medications': [
            createResourceDefinition('categories-of-asthma-medications', '30', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('inhalers-nebulizers-more', '31', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('who-needs-a-controller-medication', '32', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('medication-access', '33', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('medication-refills', '34', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('trouble-remembering-medications', '35', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('which-inhaler-to-use-when', '36', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('inhaler-technique-mdi', '37a', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('inhaler-technique-dpi', '37b', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('inhaler-technique-smi', '37c', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('inhaler-technique-nebulizer', '37d', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('why-should-i-take-my-controller', '38', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-medication-side-effects', '39', 'medications', libraryBaseUrl, languageCode),
            createResourceDefinition('how-do-i-know-if-my-asthma-medications-are-working', '39a', 'medications', libraryBaseUrl, languageCode)
        ],
        'triggers': [
            createResourceDefinition('discover-your-triggers', '40', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('surprise-triggers', '41', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-seasonal-allergens-pollen', '42', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-air-quality', '43', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-respiratory-infections', '43a', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-animals', '43b', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-smoke', '43c', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-weather', '43d', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('strong-smells-and-chemicals-cleaning-supplies', '43e', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-dust-dust-mites', '43f', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-mold', '43g', 'triggers', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-and-heartburn', '43h', 'triggers', libraryBaseUrl, languageCode)
        ],
        'medical-team': [
            createResourceDefinition('asthma-action-plan', '50', 'medicalteam', libraryBaseUrl, languageCode),
            createResourceDefinition('preparing-for-your-doctor-s-visit', '51', 'medicalteam', libraryBaseUrl, languageCode),
            createResourceDefinition('asking-an-allergist-resource', '52', 'medicalteam', libraryBaseUrl, languageCode),
            createResourceDefinition('asthma-doctors', '53', 'medicalteam', libraryBaseUrl, languageCode)
        ],
        'more': [
            createResourceDefinition('tracking-symptoms-and-triggers', '60', 'more', libraryBaseUrl, languageCode),
            createResourceDefinition('living-with-asthma-sports', '61', 'more', libraryBaseUrl, languageCode)
        ]
    };
}

function createResourceDefinition(key: string, article: string, image: string, libraryBaseUrl: string, languageCode: string): ResourceDefinition {
    return {
        title: language(`asthma-library-category-view-title-${key}`),
        subTitle: language(`asthma-library-category-view-subtitle-${key}`),
        url: new URL(`atedu_${article}${languageCode === 'es' ? '_es' : ''}.html`, libraryBaseUrl).href,
        imageUrl: new URL(`images/article_category_${image}${languageCode === 'es' ? '_es' : ''}.svg`, libraryBaseUrl).href
    };
}