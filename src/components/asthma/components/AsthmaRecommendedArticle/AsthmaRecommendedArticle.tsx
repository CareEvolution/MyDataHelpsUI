import React, { useState } from 'react';
import { getLanguageCodeFromIso, language, useInitializeView } from '../../../../helpers';
import { Resource, ResourceButtonVariant, ResourceDefinition, ResourceImageAlignment } from '../../../presentational';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add, startOfToday } from 'date-fns';
import './AsthmaRecommendedArticle.css';
import { AsthmaControlState, AsthmaLogEntry } from '../../model';

interface Article {
    number: string;
    image: string;
}

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
    const [recommendedArticle, setRecommendedArticle] = useState<Article>();

    const createResourceDefinition = (article: Article): ResourceDefinition => {
        let currentLanguage: string = getLanguageCodeFromIso(MyDataHelps.getCurrentLanguage());
        return {
            title: language(`asthma-recommended-article-${article.number}-title`),
            subTitle: language(`asthma-recommended-article-${article.number}-subtitle`),
            url: new URL(`atedu_${article.number}${currentLanguage === 'es' ? '_es' : ''}.html`, props.libraryBaseUrl).href,
            imageUrl: new URL(`images/article_category_${article.image}${currentLanguage === 'es' ? '_es' : ''}.svg`, props.libraryBaseUrl).href
        };
    }

    const updateRecommendedArticle = (todayLogEntry: AsthmaLogEntry, asthmaControlState: AsthmaControlState, surveyAnswers: SurveyAnswer[]): void => {
        let articles: Article[] = [];

        if (asthmaControlState.status === 'controlled') {
            articles.push({ number: '21', image: 'asthmacontrol' });
        } else if (asthmaControlState.status === 'not-determined') {
            articles.push({ number: '22', image: 'asthmacontrol' });
        } else if (asthmaControlState.status === 'not-controlled') {
            articles.push({ number: '25', image: 'asthmacontrol' });
        }

        if (todayLogEntry.triggers.includes('Seasonal allergens/pollen')) {
            articles.push({ number: '42', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Air pollution')) {
            articles.push({ number: '43', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Cold/viral illness')) {
            articles.push({ number: '43a', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Animal exposure')) {
            articles.push({ number: '43b', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Smoke (tobacco or wood burning)')) {
            articles.push({ number: '43c', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Extreme weather changes')) {
            articles.push({ number: '43d', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Strong smells') || todayLogEntry.triggers.includes("Chemicals/cleaning supplies")) {
            articles.push({ number: '43e', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Dust') || todayLogEntry.triggers.includes('Dust mites')) {
            articles.push({ number: '43f', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Mold')) {
            articles.push({ number: '43g', image: 'triggers' });
        }
        if (todayLogEntry.triggers.includes('Had heartburn')) {
            articles.push({ number: '43h', image: 'triggers' });
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
            articles.push({ number: '41', image: 'triggers' });
        }

        let missedDosesAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES');
        if (missedDosesAnswer) {
            if (missedDosesAnswer.answers.includes('No controller med')) {
                articles.push({ number: '32', image: 'medications' });
            }
            if (missedDosesAnswer.answers.includes('No missed doses')) {
                let inhalerTypeAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_INHALER_TYPE');
                if (inhalerTypeAnswer) {
                    if (inhalerTypeAnswer.answers.includes('Metered-dose inhaler (MDI)')) {
                        articles.push({ number: '37a', image: 'medications' });
                    }
                    if (inhalerTypeAnswer.answers.includes('Dry-powder inhaler (DPI)')) {
                        articles.push({ number: '37b', image: 'medications' });
                    }
                    if (inhalerTypeAnswer.answers.includes('Soft mist inhaler')) {
                        articles.push({ number: '37c', image: 'medications' });
                    }
                    if (inhalerTypeAnswer.answers.includes('Nebulizer')) {
                        articles.push({ number: '37d', image: 'medications' });
                    }
                }
            }
        }

        let missedDosesReasonsAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_REASONS');
        if (missedDosesReasonsAnswer) {
            if (missedDosesReasonsAnswer.answers.includes('Unable to afford the medications') ||
                missedDosesReasonsAnswer.answers.includes('Don\'t want to run out, so purposefully skipping doses')) {
                articles.push({ number: '33', image: 'medications' });
            }
            if (missedDosesReasonsAnswer.answers.includes('Difficulty getting refills')) {
                articles.push({ number: '34', image: 'medications' });
            }
            if (missedDosesReasonsAnswer.answers.includes('Trouble remembering to take them')) {
                articles.push({ number: '35', image: 'medications' });
            }
            if (missedDosesReasonsAnswer.answers.includes('I\'m confused which inhaler to take when')) {
                articles.push({ number: '36', image: 'medications' });
            }
            if (missedDosesReasonsAnswer.answers.includes('Don\'t know why I should take it')) {
                articles.push({ number: '38', image: 'medications' });
            }
            if (missedDosesReasonsAnswer.answers.includes('Concerns over side effects')) {
                articles.push({ number: '39', image: 'medications' });
            }
            if (missedDosesReasonsAnswer.answers.includes('Medications not working')) {
                articles.push({ number: '39a', image: 'medications' });
            }
        }

        if (todayLogEntry.symptomLevel === 'severe') {
            articles.push({ number: '24', image: 'asthmacontrol' });
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
            setRecommendedArticle({ number: '34', image: 'medications' });
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

    let recommendedArticleResource = createResourceDefinition(recommendedArticle);

    const onClick = (): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(recommendedArticleResource.url);
    };

    return <div className="mdhui-asthma-recommended-article" style={props.style}>
        <Resource
            title={recommendedArticleResource.title}
            subTitle={recommendedArticleResource.subTitle}
            imageUrl={recommendedArticleResource.imageUrl}
            imageAlignment={props.imageAlignment}
            buttonVariant={props.buttonVariant}
            buttonText={props.buttonText}
            onClick={() => onClick()}
            innerRef={props.innerRef}
        />
    </div>;
}