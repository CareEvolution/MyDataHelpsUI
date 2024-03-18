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

    const createResourceDefinition = (title: string, subtitle: string, article: string, image: string): ResourceDefinition => {
        return {
            title: title,
            subTitle: subtitle,
            url: new URL(`atedu_${article}.html`, props.libraryBaseUrl).href,
            imageUrl: new URL(`images/article_category_${image}.svg`, props.libraryBaseUrl).href
        };
    }

    const updateRecommendedArticle = (todayLogEntry: AsthmaLogEntry, asthmaControlState: AsthmaControlState, surveyAnswers: SurveyAnswer[]): void => {
        let articles: ResourceDefinition[] = [];

        if (asthmaControlState.status === 'controlled') {
            articles.push(createResourceDefinition(
                'How to keep your asthma under control',
                'Stay symptom-free by adhering to your treatment plan, understanding triggers, and early recognition of changes in control.',
                '21',
                'asthmacontrol'
            ));
        } else if (asthmaControlState.status === 'not-determined') {
            articles.push(createResourceDefinition(
                'Is your asthma under control?',
                '4 questions to assess if your asthma is under control. If you\'re experiencing symptoms more than 2 times a week or if you are waking up at night from asthma symptoms - your asthma is not under control.',
                '22',
                'asthmacontrol'
            ));
        } else if (asthmaControlState.status === 'not-controlled') {
            articles.push(createResourceDefinition(
                'Taking charge of your asthma',
                'When your asthma feels unmanageable, it\'s time to reassess your approach. Steps to take when your asthma is not under control.',
                '25',
                'asthmacontrol'
            ));
        }

        if (todayLogEntry.triggers.includes('Seasonal allergens/pollen')) {
            articles.push(createResourceDefinition(
                'Asthma and Seasonal Allergens/Pollen',
                'Navigate pollen season with ease: Identify your specific pollen triggers, understand their seasonal patterns, and learn how to minimize exposure.',
                '42',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Air pollution')) {
            articles.push(createResourceDefinition(
                'Asthma and Air Quality',
                'Understand that poor air quality can trigger asthma. Learn how to navigate high AQI days and what AQI levels mean.',
                '43',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Cold/viral illness')) {
            articles.push(createResourceDefinition(
                'Asthma and Respiratory Infections',
                'Respiratory infections are common asthma triggers. How to prevent them and what to do when they occur.',
                '43a',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Animal exposure')) {
            articles.push(createResourceDefinition(
                'Asthma and Animals',
                'Animals/Pets can be a trigger for asthma. Learn about how to diagnose an animal/pet allergy and steps to reduce the impact.',
                '43b',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Smoke (tobacco or wood burning)')) {
            articles.push(createResourceDefinition(
                'Asthma and Smoke',
                'Wildfires and tobacco smoke can trigger asthma. Learn about steps you can take to reduce your exposure. ',
                '43c',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Extreme weather changes')) {
            articles.push(createResourceDefinition(
                'Asthma and Weather',
                'Common weather triggers are cold air, hot and humid air, and rain/thunderstorms.  Explorer why these can trigger asthma.  ',
                '43d',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Strong smells') || todayLogEntry.triggers.includes("Chemicals/cleaning supplies")) {
            articles.push(createResourceDefinition(
                'Strong Smells and Chemicals/Cleaning Supplies',
                'Discover what smells may trigger your asthma and things to think about while cleaning.',
                '43e',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Dust') || todayLogEntry.triggers.includes('Dust mites')) {
            articles.push(createResourceDefinition(
                'Asthma and Dust/Dust Mites',
                'Dust is a common asthma trigger, but the reason it is a trigger may surprise you! ',
                '43f',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Mold')) {
            articles.push(createResourceDefinition(
                'Asthma and Mold',
                'Mold needs moisture to grow, so is typically found in damp or wet places. Learn how to prevent mold in your house.',
                '43g',
                'triggers'
            ));
        }
        if (todayLogEntry.triggers.includes('Had heartburn')) {
            articles.push(createResourceDefinition(
                'Asthma and Heartburn',
                'What is heartburn and what does it have to do with asthma?',
                '43h',
                'triggers'
            ));
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
            articles.push(createResourceDefinition(
                'Surprise triggers',
                'Uncover unexpected asthma triggers lurking in your daily life, from NSAIDs (like ibuprofen) to your glass of wine. Knowing what to look for, may help you identify these surprise triggers.',
                '41',
                'triggers'
            ));
        }

        let missedDosesAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES');
        if (missedDosesAnswer) {
            if (missedDosesAnswer.answers.includes('No controller med')) {
                articles.push(createResourceDefinition(
                    'Who needs a controller medication?',
                    'Discover the crucial role of controller medications in maintaining asthma under control.',
                    '32',
                    'medications'
                ));
            }
            if (missedDosesAnswer.answers.includes('No missed doses')) {
                let inhalerTypeAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_INHALER_TYPE');
                if (inhalerTypeAnswer) {
                    if (inhalerTypeAnswer.answers.includes('Metered-dose inhaler (MDI)')) {
                        articles.push(createResourceDefinition(
                            'Inhaler technique - MDI',
                            'Metered dose inhaler (MDI) technique tips. Without the right technique, you may be only getting part of the dose.',
                            '37a',
                            'medications'
                        ));
                    }
                    if (inhalerTypeAnswer.answers.includes('Dry-powder inhaler (DPI)')) {
                        articles.push(createResourceDefinition(
                            'Inhaler technique - DPI',
                            'Dry Powder inhaler (DPI) technique tips. Without the right technique, you may be only getting part of the dose.',
                            '37b',
                            'medications'
                        ));
                    }
                    if (inhalerTypeAnswer.answers.includes('Soft mist inhaler')) {
                        articles.push(createResourceDefinition(
                            'Inhaler technique - SMI',
                            'Soft Mist Inhaler (SMI) technique tips. Without the right technique, you may be only getting part of the dose.',
                            '37c',
                            'medications'
                        ));
                    }
                    if (inhalerTypeAnswer.answers.includes('Nebulizer')) {
                        articles.push(createResourceDefinition(
                            'Inhaler technique - nebulizer',
                            'Nebulizer technique tips.',
                            '37d',
                            'medications'
                        ));
                    }
                }
            }
        }

        let missedDosesReasonsAnswer = surveyAnswers.find(surveyAnswer => surveyAnswer.stepIdentifier === 'MISSED_DOSES_REASONS');
        if (missedDosesReasonsAnswer) {
            if (missedDosesReasonsAnswer.answers.includes('Unable to afford the medications') ||
                missedDosesReasonsAnswer.answers.includes('Don\'t want to run out, so purposefully skipping doses')) {
                articles.push(createResourceDefinition(
                    'Medication access',
                    'For when cost is a barrier to medications, learn about free or low-cost medications. Taking medications as prescribed is important to maintaining asthma control.',
                    '33',
                    'medications'
                ));
            }
            if (missedDosesReasonsAnswer.answers.includes('Difficulty getting refills')) {
                articles.push(createResourceDefinition(
                    'Medication refills',
                    'Stay on top of your asthma medication with easy refill strategies.',
                    '34',
                    'medications'
                ));
            }
            if (missedDosesReasonsAnswer.answers.includes('Trouble remembering to take them')) {
                articles.push(createResourceDefinition(
                    'Trouble remembering medications',
                    'Discover simple yet effective strategies to remember your daily doses, from smart storage tips to leveraging app reminders.',
                    '35',
                    'medications'
                ));
            }
            if (missedDosesReasonsAnswer.answers.includes('I\'m confused which inhaler to take when')) {
                articles.push(createResourceDefinition(
                    'Which inhaler to use when',
                    'Master your asthma management: Rescue inhaler works quickly to relieve symptoms while a controller is preventative and works by reducing inflammation, typically by being taken daily.',
                    '36',
                    'medications'
                ));
            }
            if (missedDosesReasonsAnswer.answers.includes('Don\'t know why I should take it')) {
                articles.push(createResourceDefinition(
                    'Why should I take my controller?',
                    'Understand the critical role of controller medications and why they\'re a cornerstone of your personalized management plan.',
                    '38',
                    'medications'
                ));
            }
            if (missedDosesReasonsAnswer.answers.includes('Concerns over side effects')) {
                articles.push(createResourceDefinition(
                    'Asthma medication side effects',
                    'Learn how to identify common and uncommon side effects, and the simple steps you can take to avoid the common side effect - thrush (fungal infection in your mouth).',
                    '39',
                    'medications'
                ));
            }
            if (missedDosesReasonsAnswer.answers.includes('Medications not working')) {
                articles.push(createResourceDefinition(
                    'How do I know if my asthma medications are working?',
                    'Controller medications can take days to weeks to reach full impact. Track your symptoms daily to see if there is an improvement and if there isn\'t, talk to your provider.',
                    '39a',
                    'medications'
                ));
            }
        }

        if (todayLogEntry.symptomLevel === 'severe') {
            articles.push(createResourceDefinition(
                'Navigating the Danger Zone: Preparedness for Asthma Flare-Ups',
                'Recognize severe symptoms like intense coughing and breathlessness early, and activate your tailored asthma action plan including immediate medications.',
                '24',
                'asthmacontrol'
            ));
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