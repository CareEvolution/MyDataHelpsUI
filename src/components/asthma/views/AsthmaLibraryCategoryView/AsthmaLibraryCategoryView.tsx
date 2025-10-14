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

export default function (props: AsthmaLibraryCategoryViewProps) {
    const categoryConfig = useMemo(() => createCategoryConfig(props.libraryBaseUrl), [props.libraryBaseUrl]);

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

function createCategoryConfig(libraryBaseUrl: string): Record<string, ResourceDefinition[]> {
    return {
        'basics': [
            createResourceDefinition('asthma-overview', '10', 'asthmabasics', libraryBaseUrl),
            createResourceDefinition('airways-and-asthma', '11', 'asthmabasics', libraryBaseUrl)
        ],
        'control': [
            createResourceDefinition('what-is-asthma-control', '20', 'asthmacontrol', libraryBaseUrl),
            createResourceDefinition('how-to-keep-your-asthma-under-control', '21', 'asthmacontrol', libraryBaseUrl),
            createResourceDefinition('is-your-asthma-under-control', '22', 'asthmacontrol', libraryBaseUrl),
            createResourceDefinition('asthma-attack-early-warning-signs', '23', 'asthmacontrol', libraryBaseUrl),
            createResourceDefinition('navigating-the-danger-zone-preparedness-for-asthma-flare-ups', '24', 'asthmacontrol', libraryBaseUrl),
            createResourceDefinition('taking-charge-of-your-asthma', '25', 'asthmacontrol', libraryBaseUrl)
        ],
        'medications': [
            createResourceDefinition('categories-of-asthma-medications', '30', 'medications', libraryBaseUrl),
            createResourceDefinition('inhalers-nebulizers-more', '31', 'medications', libraryBaseUrl),
            createResourceDefinition('who-needs-a-controller-medication', '32', 'medications', libraryBaseUrl),
            createResourceDefinition('medication-access', '33', 'medications', libraryBaseUrl),
            createResourceDefinition('medication-refills', '34', 'medications', libraryBaseUrl),
            createResourceDefinition('trouble-remembering-medications', '35', 'medications', libraryBaseUrl),
            createResourceDefinition('which-inhaler-to-use-when', '36', 'medications', libraryBaseUrl),
            createResourceDefinition('inhaler-technique-mdi', '37a', 'medications', libraryBaseUrl),
            createResourceDefinition('inhaler-technique-dpi', '37b', 'medications', libraryBaseUrl),
            createResourceDefinition('inhaler-technique-smi', '37c', 'medications', libraryBaseUrl),
            createResourceDefinition('inhaler-technique-nebulizer', '37d', 'medications', libraryBaseUrl),
            createResourceDefinition('why-should-i-take-my-controller', '38', 'medications', libraryBaseUrl),
            createResourceDefinition('asthma-medication-side-effects', '39', 'medications', libraryBaseUrl),
            createResourceDefinition('how-do-i-know-if-my-asthma-medications-are-working', '39a', 'medications', libraryBaseUrl)
        ],
        'triggers': [
            createResourceDefinition('discover-your-triggers', '40', 'triggers', libraryBaseUrl),
            createResourceDefinition('surprise-triggers', '41', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-seasonal-allergens-pollen', '42', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-air-quality', '43', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-respiratory-infections', '43a', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-animals', '43b', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-smoke', '43c', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-weather', '43d', 'triggers', libraryBaseUrl),
            createResourceDefinition('strong-smells-and-chemicals-cleaning-supplies', '43e', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-dust-dust-mites', '43f', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-mold', '43g', 'triggers', libraryBaseUrl),
            createResourceDefinition('asthma-and-heartburn', '43h', 'triggers', libraryBaseUrl)
        ],
        'medical-team': [
            createResourceDefinition('asthma-action-plan', '50', 'medicalteam', libraryBaseUrl),
            createResourceDefinition('preparing-for-your-doctor-s-visit', '51', 'medicalteam', libraryBaseUrl),
            createResourceDefinition('asking-an-allergist-resource', '52', 'medicalteam', libraryBaseUrl),
            createResourceDefinition('asthma-doctors', '53', 'medicalteam', libraryBaseUrl)
        ],
        'more': [
            createResourceDefinition('tracking-symptoms-and-triggers', '60', 'more', libraryBaseUrl),
            createResourceDefinition('living-with-asthma-sports', '61', 'more', libraryBaseUrl)
        ]
    };
}

function createResourceDefinition(key: string, article: string, image: string, libraryBaseUrl: string): ResourceDefinition {
    const languageCode = getLanguageCodeFromIso(MyDataHelps.getCurrentLanguage());
    return {
        title: language(`asthma-library-category-view-title-${key}`),
        subTitle: language(`asthma-library-category-view-subtitle-${key}`),
        url: new URL(`atedu_${article}${languageCode === 'es' ? '_es' : ''}.html`, libraryBaseUrl).href,
        imageUrl: new URL(`images/article_category_${image}${languageCode === 'es' ? '_es' : ''}.svg`, libraryBaseUrl).href
    };
}