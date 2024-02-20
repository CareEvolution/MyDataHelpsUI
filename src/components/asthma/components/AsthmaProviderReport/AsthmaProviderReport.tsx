import React, { useState } from 'react';
import './AsthmaProviderReport.css';
import { AsthmaControlState, AsthmaLogEntry, AsthmaParticipant } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { LoadingIndicator } from '../../../presentational';
import { AsthmaProviderReportPreviewState, previewData } from './AsthmaProviderReport.previewData';
import { add, format, formatISO, parseISO, startOfToday } from 'date-fns';
import { Document, Font, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { DeviceDataPoint, SurveyAnswer } from '@careevolution/mydatahelps-js';

Font.register({
    family: 'Inter',
    fonts: [
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
            fontWeight: 100,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
            fontWeight: 200,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
            fontWeight: 300,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
            fontWeight: 400,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
            fontWeight: 500,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
            fontWeight: 600,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
            fontWeight: 700,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
            fontWeight: 800,
        },
        {
            src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
            fontWeight: 900,
        },
    ],
});

export interface AsthmaProviderReportProps {
    previewState?: 'loading' | AsthmaProviderReportPreviewState | 'live';
    logTodayEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaProviderReportProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [participant, setParticipant] = useState<AsthmaParticipant>();
    const [logEntries, setLogEntries] = useState<AsthmaLogEntry[]>([]);
    const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[]>([]);
    const [airQualityDataPoints, setAirQualityDataPoints] = useState<DeviceDataPoint[]>([]);

    let today = startOfToday();
    let startDate = add(today, {days: -89});

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }
        if (props.previewState === 'default') {
            setParticipant(previewData[props.previewState].participant);
            setLogEntries(previewData[props.previewState].logEntries);
            setSurveyAnswers(previewData[props.previewState].surveyAnswers);
            setAirQualityDataPoints(previewData[props.previewState].airQualityDataPoints);
            setLoading(false);
            return;
        }

        let participantLoader = asthmaDataService.loadParticipant();
        let logEntryLoader = asthmaDataService.loadLogEntries(startDate);
        let surveyAnswerLoader = asthmaDataService.loadSurveyAnswers(props.logTodayEntrySurveyName, startDate);
        let airQualityDataPointsLoader = asthmaDataService.loadAirQualityDataPoints(startDate);

        Promise.all([participantLoader, logEntryLoader, surveyAnswerLoader, airQualityDataPointsLoader]).then(results => {
            setParticipant(results[0]);
            setLogEntries(results[1]);
            setSurveyAnswers(results[2]);
            setAirQualityDataPoints(results[3]);
            setLoading(false);
        });
    }, [], [props.previewState]);

    if (loading) {
        return <LoadingIndicator innerRef={props.innerRef}/>;
    }

    let controlStateLookup: { [key: string]: AsthmaControlState } = {};
    let noSymptomDays = 0;
    let mildSymptomDays = 0;
    let moderateSymptomDays = 0;
    let severeSymptomDays = 0;
    let symptomDays = 0;

    let coughingDays = 0;
    let wheezingDays = 0;

    let inhalerUseDays = 0;
    let limitedActivityDays = 0;
    let nighttimeAwakeningDays = 0;

    let animalExposureDays = 0;
    let allergenDays = 0;
    let smokeDays = 0;
    let airPollutionDays = 0;

    logEntries.forEach(logEntry => {
        controlStateLookup[logEntry.identifier] = computeAsthmaControlState(logEntries, parseISO(logEntry.identifier))
        if (logEntry.symptomLevel === 'none') {
            noSymptomDays++;
        } else if (logEntry.symptomLevel === 'mild') {
            mildSymptomDays++;
            symptomDays++;
        } else if (logEntry.symptomLevel === 'moderate') {
            moderateSymptomDays++;
            symptomDays++;
        } else if (logEntry.symptomLevel === 'severe') {
            severeSymptomDays++;
            symptomDays++;
        }

        if (logEntry.symptoms.includes('Coughing')) {
            coughingDays++;
        }
        if (logEntry.symptoms.includes('Wheezing')) {
            wheezingDays++;
        }

        if (logEntry.impacts.includes('Use your rescue inhaler')) {
            inhalerUseDays++;
        }
        if (logEntry.impacts.includes('Limit your daily activity')) {
            limitedActivityDays++;
        }
        if (logEntry.impacts.includes('Wake up at night')) {
            nighttimeAwakeningDays++;
        }

        if (logEntry.triggers.includes('Animal exposure')) {
            animalExposureDays++;
        }
        if (logEntry.triggers.includes('Seasonal allergens/pollen')) {
            allergenDays++;
        }
        if (logEntry.triggers.includes('Smoke (tobacco or wood burning)')) {
            smokeDays++;
        }
        if (logEntry.triggers.includes('Air pollution')) {
            airPollutionDays++;
        }
    });

    let missedDosesDays = 0;
    let barrierDays = 0;

    surveyAnswers.forEach(surveyAnswer => {
        if (surveyAnswer.stepIdentifier === 'MISSED_DOSES') {
            if (surveyAnswer.answers.includes('1 - 2 missed doses') ||
                surveyAnswer.answers.includes('3 - 6 missed doses') ||
                surveyAnswer.answers.includes('7 or more missed doses')) {
                missedDosesDays++;
            }
        } else if (surveyAnswer.stepIdentifier === 'MISSED_DOSES_REASONS') {
            if (surveyAnswer.answers.includes('Unable to afford the medications') ||
                surveyAnswer.answers.includes('Concerns over side effects') ||
                surveyAnswer.answers.includes('Medications not working')) {
                barrierDays++;
            }
        }
    });

    let highHomeAqiDataPoints = airQualityDataPoints.filter(dp => dp.type === 'HomeAirQuality' && parseFloat(dp.value) > 100);
    let highHomeAqiDays = new Set(highHomeAqiDataPoints.map(dp => formatISO(parseISO(dp.observationDate!), {representation: 'date'}))).size;

    let highWorkAqiDataPoints = airQualityDataPoints.filter(dp => dp.type === 'WorkAirQuality' && parseFloat(dp.value) > 100);
    let highWorkAqiDays = new Set(highWorkAqiDataPoints.map(dp => formatISO(parseISO(dp.observationDate!), {representation: 'date'}))).size;

    const renderDay = (day: number, labelDay: boolean) => {
        let date = add(startDate, {days: day});
        let logEntryIdentifier = dateToAsthmaLogEntryIdentifier(date);
        let logEntryControlState = controlStateLookup[logEntryIdentifier];

        let dayStyle: Style = {
            height: '38px',
            width: '38px',
            paddingTop: '10px',
            border: '2px solid #fff',
            borderRadius: '19px',
            boxSizing: 'border-box',
            fontWeight: 600
        } as Style;

        if (logEntryControlState?.status === 'not-controlled') {
            dayStyle.color = '#fff';
            dayStyle.backgroundColor = '#F86A5C';
            dayStyle.borderColor = '#F86A5C';
        } else if (logEntryControlState?.status === 'controlled') {
            dayStyle.color = '#35A6A0';
            dayStyle.borderColor = '#35A6A0';
        } else if (logEntryControlState?.status === 'not-determined') {
            dayStyle.borderColor = '#000';
            dayStyle.borderStyle = 'dashed';
        }

        return <View key={day} style={{textAlign: 'center', fontSize: '16px', padding: '1px'}}>
            <Text style={{width: '38px', marginBottom: '2px'}}>{labelDay || date.getDate() === 1 ? format(date, 'MMM').toUpperCase() : ' '}</Text>
            <Text style={dayStyle}>{date.getDate()}</Text>
        </View>;
    };

    const renderRow = (start: number, dayCount: number, labelFirstDay?: boolean) => {
        let days = Array.from({length: dayCount}, (x, i) => i + start);
        return <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-evenly', margin: '4px 0'}}>
            {days.map(day => renderDay(day, !!labelFirstDay && start == day))}
        </View>;
    };

    const renderStat = (label: string, value: number | string, units: string) => {
        return <View style={{flexDirection: 'row', margin: '2px 0'}}>
            <Text style={{flexGrow: 1, marginRight: '4px', fontWeight: 'normal'}}>{label}</Text>
            <Text>{value} {units}</Text>
        </View>;
    };

    return <div className="mdhui-asthma-provider-report" ref={props.innerRef}>
        <PDFViewer style={{width: '100%', height: '140vw', boxSizing: 'border-box'} as any}>
            <Document>
                <Page size={[1224, 1584]} dpi={72} style={{flexDirection: 'column', padding: 48, fontFamily: 'Inter'}}>
                    <View style={{fontSize: '32px', fontWeight: 600,}}>
                        <Text>{participant!.getFirstName()} - Asthma Tool - Provider Report</Text>
                    </View>
                    <View style={{fontSize: '24px', color: '#3b3b3b', margin: '8px 0 24px'}}>
                        <Text>{format(startDate, 'MMMM d')} - {format(today, 'MMMM d, yyyy')} (90 days)</Text>
                    </View>
                    <View style={{border: '1px solid #dbdbdb', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px'}}>
                        <View style={{flexDirection: 'row', width: '100%', padding: '16px', borderBottom: '1px solid #dbdbdb'}}>
                            <View style={{flexGrow: 1}}>
                                <Text style={{fontSize: '18px', fontWeight: 700}}>Asthma Control</Text>
                                <Text style={{fontSize: '16px', color: '#3b3b3b', marginBottom: '16px'}}>Patient reported</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{marginRight: '24px'}}>
                                        <Text style={{fontSize: '24px', fontWeight: 700}}>{logEntries.length} out of 90</Text>
                                        <Text>Daily entries logged</Text>
                                    </View>
                                    <View style={{marginRight: '24px'}}>
                                        <Text style={{fontSize: '24px', fontWeight: 700, color: '#F86A5C'}}>{logEntries.filter(logEntry => controlStateLookup[logEntry.identifier].status === 'not-controlled').length} days</Text>
                                        <Text>Not under control</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: '24px', fontWeight: 700, color: '#35A6A0'}}>{logEntries.filter(logEntry => controlStateLookup[logEntry.identifier].status === 'controlled').length} days</Text>
                                        <Text>Under control</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{fontSize: '14px', fontWeight: 500, paddingTop: '8px'}}>
                                <View style={{flexDirection: 'row', marginBottom: '8px'}}>
                                    <View style={{height: '20px', width: '20px', borderRadius: '10px', border: '2px solid #35A6A0', color: '#35A6A0'}}/>
                                    <Text style={{padding: '2px 8px'}}>Under control</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginBottom: '8px'}}>
                                    <View style={{height: '20px', width: '20px', borderRadius: '10px', border: '2px solid #F86A5C', color: '#fff', backgroundColor: '#F86A5C'}}/>
                                    <Text style={{padding: '2px 8px'}}>Not under control</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginBottom: '8px'}}>
                                    <View style={{height: '20px', width: '20px', borderRadius: '10px', border: '2px dashed #000'}}/>
                                    <Text style={{padding: '2px 8px'}}>Not enough information</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{padding: '16px'}}>
                            {renderRow(0, 18, true)}
                            {renderRow(18, 18)}
                            {renderRow(36, 18)}
                            {renderRow(54, 18)}
                            {renderRow(72, 18)}
                        </View>
                        <View style={{fontSize: '14px', color: '#3b3b3b', backgroundColor: '#f2f2f2', padding: '16px'}}>
                            <Text>This patient-facing digital asthma tool allows the user to create a daily entry and self-report their symptoms, use of rescue inhaler and impact on activity and nighttime awakenings. The figure above use the self-reported answers to assess asthma control, based on the EPR-3 guidelines. A day is noted as not under control if in the prior week (7 days) there are more than 2 days of symptoms or rescue inhaler use or due to asthma 1 nighttime awakening or limitation in activity was recorded.</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', fontSize: '16px', justifyContent: 'space-evenly', columnGap: '16px', marginBottom: '16px'}}>
                        <View style={{flexGrow: 1, backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '16px', flexBasis: '30%'}}>
                            <Text style={{marginBottom: '8px', fontWeight: 700}}>Components of control</Text>
                            {renderStat('Symptoms reported', symptomDays, symptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Rescue inhaler use', inhalerUseDays, inhalerUseDays === 1 ? 'day' : 'days')}
                            {renderStat('Normal activities affected', limitedActivityDays, limitedActivityDays === 1 ? 'day' : 'days')}
                            {renderStat('Nighttime awakenings', nighttimeAwakeningDays, nighttimeAwakeningDays === 1 ? 'day' : 'days')}
                        </View>
                        <View style={{flexGrow: 1, backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '16px', flexBasis: '30%'}}>
                            <Text style={{marginBottom: '8px', fontWeight: 700}}>Symptom severity</Text>
                            {renderStat('None', noSymptomDays, noSymptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Mild', mildSymptomDays, mildSymptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Moderate', moderateSymptomDays, moderateSymptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Severe', severeSymptomDays, severeSymptomDays === 1 ? 'day' : 'days')}
                        </View>
                        <View style={{flexGrow: 1, backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '16px', flexBasis: '30%'}}>
                            <Text style={{marginBottom: '8px', fontWeight: 700}}>Common symptoms</Text>
                            {renderStat('Coughing', coughingDays, coughingDays === 1 ? 'day' : 'days')}
                            {renderStat('Wheezing', wheezingDays, wheezingDays === 1 ? 'day' : 'days')}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', fontSize: '16px', justifyContent: 'space-evenly', columnGap: '16px', marginBottom: '32px'}}>
                        <View style={{flexGrow: 1, backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '16px', flexBasis: '30%'}}>
                            <Text style={{marginBottom: '8px', fontWeight: 700}}>Top 4 triggers</Text>
                            {renderStat('Animal exposure', animalExposureDays, animalExposureDays === 1 ? 'report' : 'reports')}
                            {renderStat('Seasonal allergens/pollen', allergenDays, allergenDays === 1 ? 'report' : 'reports')}
                            {renderStat('Smoke', smokeDays, smokeDays === 1 ? 'report' : 'reports')}
                            {renderStat('Air pollution', airPollutionDays, airPollutionDays === 1 ? 'report' : 'reports')}
                        </View>
                        <View style={{flexGrow: 1, backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '16px', flexBasis: '30%'}}>
                            <Text style={{marginBottom: '8px', fontWeight: 700}}>Medications</Text>
                            {renderStat('Missed doses', missedDosesDays, missedDosesDays === 1 ? 'report' : 'reports')}
                            {renderStat('Reported barriers to adherence*', barrierDays, barrierDays === 1 ? 'report' : 'reports')}
                            <Text style={{fontSize: '12px', marginTop: '12px'}}>*Unable to afford the medications, concern over side effects, medications not working</Text>
                        </View>
                        <View style={{flexGrow: 1, backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '16px', flexBasis: '30%'}}>
                            <Text style={{marginBottom: '8px', fontWeight: 700}}>Days with AQI over 100</Text>
                            {renderStat('Home', highHomeAqiDays > 0 ? highHomeAqiDays : 'None', highHomeAqiDays === 1 ? 'day' : highHomeAqiDays > 1 ? 'days' : '')}
                            {renderStat('Work', highWorkAqiDays > 0 ? highWorkAqiDays : 'None', highWorkAqiDays === 1 ? 'day' : highWorkAqiDays > 1 ? 'days' : '')}
                            <Text style={{fontSize: '12px', marginTop: '20px'}}>Source: airnow.gov</Text>
                        </View>
                    </View>
                    <View style={{fontSize: '16px'}}>
                        <Text style={{fontWeight: 700, marginBottom: '16px'}}>About this report</Text>
                        <Text style={{marginBottom: '16px'}}>
                            Randomized controlled studies on interventions based on social cognitive theory of self-regulation (which includes the core components of
                            self-monitoring, self-judgment and self-evaluation) have shown clinical benefits across different conditions, including asthma. This tool
                            design was based on promoting self-regulation. It enables patients to track daily their symptoms and triggers, provides clear summaries
                            or what they log and surfaces relevant educational content and resource links. The tool does not recommend any changes in management or
                            provide diagnosis.
                        </Text>
                        <Text style={{marginBottom: '16px'}}>
                            This report was generated from the Asthma Tool experience, powered by MyDataHelps, it summarizes what the user chose to log. The experience
                            allows logging/editing on the current day and day prior, to remove any memory recall. Goal of this report is to help patients share with
                            their providers how they have been feeling. The patients also receive recommended educational topics based on what they log.
                        </Text>
                        <Text style={{marginBottom: '16px'}}>
                            If you have general feedback on this report, feel free to e-mail us: XXX@careevolution.com.
                        </Text>
                        <Text>
                            If you plan to share this report with your provider, be aware that communications over email, text, and other channels may not be secure
                            because they can be sent to the wrong person or intercepted.
                        </Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    </div>
        ;
}