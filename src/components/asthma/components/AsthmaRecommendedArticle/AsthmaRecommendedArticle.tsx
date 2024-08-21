import React, { useState } from 'react';
import { getLanguageFromIso, language, Language, useInitializeView } from '../../../../helpers';
import { Resource, ResourceButtonVariant, ResourceDefinition, ResourceImageAlignment } from '../../../presentational';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';
import sampleResourceImage from '../../../../assets/resource-image.png';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add, startOfToday } from 'date-fns';
import './AsthmaRecommendedArticle.css';
import { AsthmaControlState, AsthmaLogEntry } from '../../model';

export interface AsthmaRecommendedArticleProps {
    previewState?: 'none' | 'default';
    libraryBaseUrl: string;
    logTodayEntrySurveyName: string;
    imageAlignment?: ResourceImageAlignment;
    buttonVariant?: ResourceButtonVariant;
    buttonText?: string;
    style?: React.CSSProperties;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaRecommendedArticleProps) {
    const [recommendedArticle, setRecommendedArticle] = useState<ResourceDefinition>();

    const createResourceDefinition = (article: string, image: string): ResourceDefinition => {
        let currentLanguage: Language = getLanguageFromIso(MyDataHelps.getCurrentLanguage());
        return {
            title: language(`asthma-recommended-article-${article}-title`),
            subTitle: language(`asthma-recommended-article-${article}-subtitle`),
            url: new URL(`atedu_${article}${currentLanguage === 'es' ? '_es' : ''}.html`, props.libraryBaseUrl).href,
            imageUrl: new URL(`images/article_category_${image}.svg`, props.libraryBaseUrl).href
        };
    }

    const updateRecommendedArticle = (todayLogEntry: AsthmaLogEntry, asthmaControlState: AsthmaControlState, surveyAnswers: SurveyAnswer[]): void => {
        let articles: ResourceDefinition[] = [];

        if (asthmaControlState.status === 'controlled') {
            articles.push(createResourceDefinition('21', 'asthmacontrol'));
        } else if (asthmaControlState.status === 'not-determined') {
            articles.push(createResourceDefinition('22', 'asthmacontrol'));
        } else if (asthmaControlState.status === 'not-controlled') {
            articles.push(createResourceDefinition('25', 'asthmacontrol'));
        }

        if (todayLogEntry.triggers.includes('Seasonal allergens/pollen')) {
            articles.push(createResourceDefinition('42', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Air pollution')) {
            articles.push(createResourceDefinition('43', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Cold/viral illness')) {
            articles.push(createResourceDefinition('43a', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Animal exposure')) {
            articles.push(createResourceDefinition('43b', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Smoke (tobacco or wood burning)')) {
            articles.push(createResourceDefinition('43c', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Extreme weather changes')) {
            articles.push(createResourceDefinition('43d', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Strong smells') || todayLogEntry.triggers.includes("Chemicals/cleaning supplies")) {
            articles.push(createResourceDefinition('43e', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Dust') || todayLogEntry.triggers.includes('Dust mites')) {
            articles.push(createResourceDefinition('43f', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Mold')) {
            articles.push(createResourceDefinition('43g', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Had heartburn')) {
            articles.push(createResourceDefinition('43h', 'triggers'));
        }

        const surpriseTriggers = [
            'Taken a NSAID (non-steroidal anti-inflammatory drugs including aspirin and ibuprofen)',
            'Taken a beta blocker',
            'Had heartburn',
            'Drank red wine',
            'Tried any new foods',
            'Cooked without a fan or open window',
            'Had a pet sleep in your bed',
            'Burned incense or a candle'
        ];
        if (todayLogEntry.triggers.find(trigger => surpriseTriggers.includes(trigger))) {
            articles.push(createResourceDefinition('41', 'triggers'));
        }

        let missedDosesAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES');
        if (missedDosesAnswer) {
            if (missedDosesAnswer.answers.includes('No controller med')) {
                articles.push(createResourceDefinition('32', 'medications'));
            }
            if (missedDosesAnswer.answers.includes('No missed doses')) {
                let inhalerTypeAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_INHALER_TYPE');
                if (inhalerTypeAnswer) {
                    if (inhalerTypeAnswer.answers.includes('Metered-dose inhaler (MDI)')) {
                        articles.push(createResourceDefinition('37a', 'medications'));
                    }
                    if (inhalerTypeAnswer.answers.includes('Dry-powder inhaler (DPI)')) {
                        articles.push(createResourceDefinition('37b', 'medications'));
                    }
                    if (inhalerTypeAnswer.answers.includes('Soft mist inhaler')) {
                        articles.push(createResourceDefinition('37c', 'medications'));
                    }
                    if (inhalerTypeAnswer.answers.includes('Nebulizer')) {
                        articles.push(createResourceDefinition('37d', 'medications'));
                    }
                }
            }
        }

        let missedDosesReasonsAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_REASONS');
        if (missedDosesReasonsAnswer) {
            if (missedDosesReasonsAnswer.answers.includes('Unable to afford the medications') ||
                missedDosesReasonsAnswer.answers.includes('Don\'t want to run out, so purposefully skipping doses')) {
                articles.push(createResourceDefinition('33', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Difficulty getting refills')) {
                articles.push(createResourceDefinition('34', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Trouble remembering to take them')) {
                articles.push(createResourceDefinition('35', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('I\'m confused which inhaler to take when')) {
                articles.push(createResourceDefinition('36', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Don\'t know why I should take it')) {
                articles.push(createResourceDefinition('38', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Concerns over side effects')) {
                articles.push(createResourceDefinition('39', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Medications not working')) {
                articles.push(createResourceDefinition('39a', 'medications'));
            }
        }

        if (todayLogEntry.symptomLevel === 'severe') {
            articles.push(createResourceDefinition('24', 'asthmacontrol'));
        }

        if (articles.length > 0) {
            setRecommendedArticle(articles[Math.floor(Math.random() * articles.length)]);
        } else {
            setRecommendedArticle(undefined);
        }
    };

    useInitializeView(() => {
        if (props.previewState === 'none') {
            setRecommendedArticle(undefined);
            return;
        }
        if (props.previewState === 'default') {
            setRecommendedArticle({ title: 'Recommended Article Title', subTitle: 'recommended article subtitle', imageUrl: sampleResourceImage } as ResourceDefinition);
            return;
        }

        let today = startOfToday();

        asthmaDataService.loadLogEntries(add(new Date(today), { days: -10 })).then(logEntries => {
            let todayLogEntryIdentifier = dateToAsthmaLogEntryIdentifier(today);
            let todayLogEntry = logEntries.find(e => e.identifier === todayLogEntryIdentifier);
            if (todayLogEntry) {
                asthmaDataService.loadSurveyAnswers(props.logTodayEntrySurveyName, today).then(surveyAnswers => {
                    updateRecommendedArticle(todayLogEntry!, computeAsthmaControlState(logEntries, today), surveyAnswers);
                });
            }
        });
    }, [], [props.previewState]);

    if (!recommendedArticle) {
        return null;
    }

    const onClick = (): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(recommendedArticle.url);
    };

    return <div className="mdhui-asthma-recommended-article" style={props.style}>
        <Resource
            title={recommendedArticle.title}
            subTitle={recommendedArticle.subTitle}
            imageUrl={recommendedArticle.imageUrl}
            imageAlignment={props.imageAlignment}
            buttonVariant={props.buttonVariant}
            buttonText={props.buttonText}
            onClick={() => onClick()}
            innerRef={props.innerRef}
        />
    </div>;
}