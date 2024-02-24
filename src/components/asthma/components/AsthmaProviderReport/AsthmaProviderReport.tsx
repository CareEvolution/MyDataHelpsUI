import React, { CSSProperties, useRef, useState } from 'react';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { AsthmaProviderReportPreviewState, previewData } from './AsthmaProviderReport.previewData';
import { add, format, formatISO, parseISO, startOfToday } from 'date-fns';
import { AsthmaControlState, AsthmaLogEntry, AsthmaParticipant } from '../../model';
import MyDataHelps, { DeviceDataPoint, SurveyAnswer } from '@careevolution/mydatahelps-js';
import { LoadingIndicator } from '../../../presentational';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export interface AsthmaProviderReportProps {
    previewState?: 'loading' | AsthmaProviderReportPreviewState;
    logEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaProviderReportProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [participant, setParticipant] = useState<AsthmaParticipant>();
    const [logEntries, setLogEntries] = useState<AsthmaLogEntry[]>([]);
    const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[]>([]);
    const [airQualityDataPoints, setAirQualityDataPoints] = useState<DeviceDataPoint[]>([]);
    const reportRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState<boolean>(false);

    let today = startOfToday();
    let startDate = add(today, {days: -89});

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }
        if (props.previewState) {
            setParticipant(previewData[props.previewState].participant);
            setLogEntries(previewData[props.previewState].logEntries);
            setSurveyAnswers(previewData[props.previewState].surveyAnswers);
            setAirQualityDataPoints(previewData[props.previewState].airQualityDataPoints);
            setLoading(false);
            return;
        }

        let participantLoader = asthmaDataService.loadParticipant();
        let logEntryLoader = asthmaDataService.loadLogEntries(startDate);
        let surveyAnswerLoader = asthmaDataService.loadSurveyAnswers(props.logEntrySurveyName, startDate);
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

        let dayStyle: CSSProperties = {
            height: '38px',
            width: '38px',
            paddingTop: '8px',
            border: '2px solid #fff',
            borderRadius: '19px',
            boxSizing: 'border-box',
            fontWeight: 600,
            margin: '0 auto 2px'
        } as CSSProperties;

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

        return <div style={{textAlign: 'center', fontSize: '16px', padding: '1px', flexGrow: 1, flexBasis: "5%"}}>
            <div style={{width: '38px', minHeight: '22px', margin: '2px auto'}}>{labelDay || date.getDate() === 1 ? format(date, 'MMM').toUpperCase() : ''}</div>
            <div style={dayStyle}>{date.getDate()}</div>
        </div>;
    };

    const renderRow = (start: number, dayCount: number, labelFirstDay?: boolean) => {
        let days = Array.from({length: dayCount}, (_, i) => i + start);
        return <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-evenly', margin: '4px 0'}}>
            {days.map(day => renderDay(day, !!labelFirstDay && start == day))}
        </div>;
    };

    const renderStat = (label: string, value: number | string, units: string) => {
        return <div style={{display: 'flex', flexDirection: 'row', margin: '2px 0'}}>
            <div style={{flexGrow: 1, marginRight: '4px', fontWeight: 500}}>{label}</div>
            <div style={{flexShrink: 0}}>{value} {units}</div>
        </div>;
    };

    const onDownload = () => {
        // if (props.previewState || downloading) return;
        if (downloading) return;

        setDownloading(true);

        let reportHtml = '';

        // Get the styles from the document and add them to the report so they are included in the PDF
        let documentStyles = document.head.getElementsByTagName("style");
        for (let i = 0; i < documentStyles.length; i++) {
            reportHtml += documentStyles[i].outerHTML;
        }

        reportHtml += reportRef.current!.outerHTML;

        MyDataHelps.persistDeviceData([{type: 'ReportHtml', value: reportHtml}]).then(() => {
            MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
                let reportPdfUrl = MyDataHelps.baseUrl + "WebVisualization/WebVisualizationPDF?patientID=" + participant!.getId() + "&modelType=VisualizationModel&visualizationKey=Shared.HtmlToPdf";
                if (deviceInfo && ['Android', 'iOS'].includes(deviceInfo.platform)) {
                    // @ts-ignore
                    //window.webkit.messageHandlers.OpenFile.postMessage({'url': reportPdfUrl});
                } else {
                    //MyDataHelps.openExternalUrl(reportPdfUrl);
                }
                setDownloading(false);
            });
        });
    };

    return <div>
        <div style={{margin: '0 16px', textAlign: 'right'}}>
            <button className="mdhui-button" onClick={() => onDownload()}>
                {downloading && <LoadingIndicator/>}
                {!downloading && <div>Generate PDF <FontAwesomeIcon icon={faFilePdf}/></div>}
            </button>
        </div>
        <div style={{display: 'block'}}>
            <div style={{margin: '16px', border: '1px solid #555'}}>
                <div style={{padding: '32px 48px', backgroundColor: '#fff'}} ref={reportRef}>
                    <div style={{fontSize: '32px', fontWeight: 600}}>{participant!.getFirstName()} - Asthma Tool - Provider Report</div>
                    <div style={{fontSize: '24px', color: '#3b3b3b', marginBottom: '16px'}}>{format(startDate, 'MMMM d')} - {format(today, 'MMMM d, yyyy')} (90 days)</div>
                    <div style={{border: '1px solid #dbdbdb', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px'}}>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', padding: '16px', borderBottom: '1px solid #dbdbdb', boxSizing: 'border-box'}}>
                            <div style={{flexGrow: 1}}>
                                <div style={{fontSize: '18px', fontWeight: 700}}>Asthma Control</div>
                                <div style={{fontSize: '16px', color: '#3b3b3b', marginBottom: '16px'}}>Patient reported</div>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div style={{marginRight: '24px'}}>
                                        <div style={{fontSize: '24px', fontWeight: 700}}>{logEntries.length} out of 90</div>
                                        <div>Daily entries logged</div>
                                    </div>
                                    <div style={{marginRight: '24px'}}>
                                        <div style={{fontSize: '24px', fontWeight: 700, color: '#F86A5C'}}>{logEntries.filter(logEntry => controlStateLookup[logEntry.identifier].status === 'not-controlled').length} days</div>
                                        <div>Not under control</div>
                                    </div>
                                    <div>
                                        <div style={{fontSize: '24px', fontWeight: 700, color: '#35A6A0'}}>{logEntries.filter(logEntry => controlStateLookup[logEntry.identifier].status === 'controlled').length} days</div>
                                        <div>Under control</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{fontSize: '14px', fontWeight: 500, paddingTop: '8px'}}>
                                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px'}}>
                                    <div style={{height: '20px', width: '20px', borderRadius: '10px', border: '2px solid #35A6A0', boxSizing: 'border-box', color: '#35A6A0'}}/>
                                    <div style={{flexGrow: 1, padding: '2px 8px'}}>Under control</div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px'}}>
                                    <div style={{height: '20px', width: '20px', borderRadius: '10px', border: '2px solid #F86A5C', boxSizing: 'border-box', color: '#fff', backgroundColor: '#F86A5C'}}/>
                                    <div style={{flexGrow: 1, padding: '2px 8px'}}>Not under control</div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px'}}>
                                    <div style={{height: '20px', width: '20px', borderRadius: '10px', border: '2px dashed #000', boxSizing: 'border-box'}}/>
                                    <div style={{flexGrow: 1, padding: '2px 8px'}}>Not enough information</div>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: '12px 16px'}}>
                            {renderRow(0, 18, true)}
                            {renderRow(18, 18)}
                            {renderRow(36, 18)}
                            {renderRow(54, 18)}
                            {renderRow(72, 18)}
                        </div>
                        <div style={{fontSize: '14px', color: '#3b3b3b', backgroundColor: '#f2f2f2', padding: '16px'}}>
                            This patient-facing digital asthma tool allows the user to create a daily entry and self-report their symptoms, use of rescue inhaler and impact
                            on activity and nighttime awakenings. The figure above use the self-reported answers to assess asthma control, based on the EPR-3 guidelines. A
                            day is noted as not under control if in the prior week (7 days) there are more than 2 days of symptoms or rescue inhaler use or due to asthma 1
                            nighttime awakening or limitation in activity was recorded.
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', fontSize: '16px', marginBottom: '16px'}}>
                        <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px'}}>
                            <div style={{marginBottom: '8px', fontWeight: 700}}>Components of control</div>
                            {renderStat('Symptoms reported', symptomDays, symptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Rescue inhaler use', inhalerUseDays, inhalerUseDays === 1 ? 'day' : 'days')}
                            {renderStat('Normal activities affected', limitedActivityDays, limitedActivityDays === 1 ? 'day' : 'days')}
                            {renderStat('Nighttime awakenings', nighttimeAwakeningDays, nighttimeAwakeningDays === 1 ? 'day' : 'days')}
                        </div>
                        <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px', margin: '0 16px'}}>
                            <div style={{marginBottom: '8px', fontWeight: 700}}>Symptom severity</div>
                            {renderStat('None', noSymptomDays, noSymptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Mild', mildSymptomDays, mildSymptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Moderate', moderateSymptomDays, moderateSymptomDays === 1 ? 'day' : 'days')}
                            {renderStat('Severe', severeSymptomDays, severeSymptomDays === 1 ? 'day' : 'days')}
                        </div>
                        <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px'}}>
                            <div style={{marginBottom: '8px', fontWeight: 700}}>Common symptoms</div>
                            {renderStat('Coughing', coughingDays, coughingDays === 1 ? 'day' : 'days')}
                            {renderStat('Wheezing', wheezingDays, wheezingDays === 1 ? 'day' : 'days')}
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', fontSize: '16px', marginBottom: '24px'}}>
                        <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px'}}>
                            <div style={{marginBottom: '8px', fontWeight: 700}}>Top 4 triggers</div>
                            {renderStat('Animal exposure', animalExposureDays, animalExposureDays === 1 ? 'report' : 'reports')}
                            {renderStat('Seasonal allergens/pollen', allergenDays, allergenDays === 1 ? 'report' : 'reports')}
                            {renderStat('Smoke', smokeDays, smokeDays === 1 ? 'report' : 'reports')}
                            {renderStat('Air pollution', airPollutionDays, airPollutionDays === 1 ? 'report' : 'reports')}
                        </div>
                        <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px', margin: '0 16px'}}>
                            <div style={{marginBottom: '8px', fontWeight: 700}}>Medications</div>
                            {renderStat('Missed doses', missedDosesDays, missedDosesDays === 1 ? 'report' : 'reports')}
                            {renderStat('Reported barriers to adherence*', barrierDays, barrierDays === 1 ? 'report' : 'reports')}
                            <div style={{fontSize: '12px', marginTop: '12px'}}>*Unable to afford the medications, concern over side effects, medications not working</div>
                        </div>
                        <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px'}}>
                            <div style={{marginBottom: '8px', fontWeight: 700}}>Days with AQI over 100</div>
                            {renderStat('Home', highHomeAqiDays > 0 ? highHomeAqiDays : 'None', highHomeAqiDays === 1 ? 'day' : highHomeAqiDays > 1 ? 'days' : '')}
                            {renderStat('Work', highWorkAqiDays > 0 ? highWorkAqiDays : 'None', highWorkAqiDays === 1 ? 'day' : highWorkAqiDays > 1 ? 'days' : '')}
                            <div style={{fontSize: '12px', marginTop: '12px'}}>Source: airnow.gov</div>
                        </div>
                    </div>
                    <div style={{fontSize: '16px'}}>
                        <div style={{fontWeight: 700, marginBottom: '16px'}}>For Providers - About this tool & report:</div>
                        <div style={{marginBottom: '16px'}}>
                            This report was generated from the Asthma Tool experience, powered by MyDataHelps, it summarizes the user’s logs. This digital tool design was
                            based on promoting self-regulation (shown in RCTs to have clinical benefits across different conditions, including asthma.). It enables patients
                            to track daily their symptoms and triggers, provides clear summaries or what they log and surfaces relevant educational content and resource
                            links. The tool does not recommend any changes in management or provide diagnosis. If you plan to share this report with your provider, please
                            be aware that communications over email, text, and other channels may not be secure because they can be sent to the wrong person or intercepted.
                        </div>
                        <div>
                            To provide feedback on this report or tool, please e-mail us: XXX@careevolution.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}