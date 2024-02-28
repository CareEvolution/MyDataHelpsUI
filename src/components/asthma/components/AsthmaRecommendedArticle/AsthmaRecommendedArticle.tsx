import React, { useState } from 'react';
import { useInitializeView } from '../../../../helpers/Initialization';
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

    const createResourceDefinition = (title: string, article: string, image: string): ResourceDefinition => {
        return {
            title: title,
            url: new URL(`atedu_${article}.html`, props.libraryBaseUrl).href,
            imageUrl: new URL(`images/article_category_${image}.svg`, props.libraryBaseUrl).href
        };
    }

    const updateRecommendedArticle = (todayLogEntry: AsthmaLogEntry, asthmaControlState: AsthmaControlState, surveyAnswers: SurveyAnswer[]): void => {
        let articles: ResourceDefinition[] = [];

        if (asthmaControlState.status === 'controlled') {
            articles.push(createResourceDefinition('How to keep your asthma under control', '21', 'asthmacontrol'));
        } else if (asthmaControlState.status === 'not-controlled') {
            articles.push(createResourceDefinition('Is your asthma under control?', '22', 'asthmacontrol'));
        }

        if (todayLogEntry.triggers.includes('Seasonal allergens/pollen')) {
            articles.push(createResourceDefinition('Seasonal allergens/pollen', '42', 'triggers'));
        }
        if (todayLogEntry.triggers.includes('Air pollution')) {
            articles.push(createResourceDefinition('Air quality and asthma', '43', 'triggers'));
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
            articles.push(createResourceDefinition('Surprise triggers', '41', 'triggers'));
        }

        let missedDosesAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES');
        if (missedDosesAnswer) {
            if (missedDosesAnswer.answers.includes('No controller med')) {
                articles.push(createResourceDefinition('Who needs a controller medication?', '32', 'medications'));
            }
            if (missedDosesAnswer.answers.includes('No missed doses')) {
                let inhalerTypeAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_INHALER_TYPE');
                if (inhalerTypeAnswer) {
                    if (inhalerTypeAnswer.answers.includes('Metered-dose inhaler (MDI)')) {
                        articles.push(createResourceDefinition('Inhaler technique - MDI', '37a', 'medications'));
                    }
                    if (inhalerTypeAnswer.answers.includes('Dry-powder inhaler (DPI)')) {
                        articles.push(createResourceDefinition('Inhaler technique - DPI', '37b', 'medications'));
                    }
                    if (inhalerTypeAnswer.answers.includes('Soft mist inhaler')) {
                        articles.push(createResourceDefinition('Inhaler technique - SMI', '37c', 'medications'));
                    }
                    if (inhalerTypeAnswer.answers.includes('Nebulizer')) {
                        articles.push(createResourceDefinition('Inhaler technique - nebulizer', '37d', 'medications'));
                    }
                }
            }
        }

        let missedDosesReasonsAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_REASONS');
        if (missedDosesReasonsAnswer) {
            if (missedDosesReasonsAnswer.answers.includes('Unable to afford the medications') ||
                missedDosesReasonsAnswer.answers.includes('Don\'t want to run out, so purposefully skipping doses')) {
                articles.push(createResourceDefinition('Medication access', '33', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Difficulty getting refills')) {
                articles.push(createResourceDefinition('Medication Refills', '34', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Trouble remembering to take them')) {
                articles.push(createResourceDefinition('Trouble remembering medications', '35', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('I\'m confused which inhaler to take when')) {
                articles.push(createResourceDefinition('Which inhaler to use when', '36', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Don\'t know why I should take it')) {
                articles.push(createResourceDefinition('Why should I take my controller?', '38', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Concerns over side effects')) {
                articles.push(createResourceDefinition('Asthma medication side effects', '39', 'medications'));
            }
            if (missedDosesReasonsAnswer.answers.includes('Medications not working')) {
                articles.push(createResourceDefinition('How do I know if my asthma medications are working?', '39a', 'medications'));
            }
        }

        if (todayLogEntry.symptomLevel === 'severe') {
            articles.push(createResourceDefinition('Navigating the Danger Zone: Preparedness for Asthma Flare-Ups', '24', 'asthmacontrol'));
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
            setRecommendedArticle({title: 'Recommended Article Title', subTitle: 'recommended article subtitle', imageUrl: sampleResourceImage} as ResourceDefinition);
            return;
        }

        let today = startOfToday();

        asthmaDataService.loadLogEntries(add(new Date(today), {days: -10})).then(logEntries => {
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