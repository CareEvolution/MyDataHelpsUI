import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { AsthmaProviderReportPreviewState, previewData } from './AsthmaProviderReport.previewData';
import { add, format, formatISO, parseISO, startOfToday } from 'date-fns';
import { AsthmaControlState, AsthmaLogEntry, AsthmaParticipant } from '../../model';
import MyDataHelps, { DeviceDataPoint, DeviceInfo, SurveyAnswer } from '@careevolution/mydatahelps-js';
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
    const [generatingPdf, setGeneratingPdf] = useState<boolean>(false);
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();

    let today = startOfToday();
    let startDate = add(today, {days: -89});

    useEffect(() => {
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
    }, [props.previewState]);

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
    let barrierAnswers: string[] = [];

    surveyAnswers.forEach(surveyAnswer => {
        if (surveyAnswer.stepIdentifier === 'MISSED_DOSES') {
            if (surveyAnswer.answers.includes('1 - 2 missed doses') ||
                surveyAnswer.answers.includes('3 - 6 missed doses') ||
                surveyAnswer.answers.includes('7 or more missed doses')) {
                missedDosesDays++;
            }
        } else if (surveyAnswer.stepIdentifier === 'MISSED_DOSES_REASONS') {
            if (surveyAnswer.answers.length > 0 && surveyAnswer.answers[0] !== 'None of the above') {
                barrierDays++;
            }
            surveyAnswer.answers.forEach(answer => {
                if (answer !== 'None of the above' && !barrierAnswers.includes(answer)) {
                    barrierAnswers.push(answer);
                }
            });
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
            fontSize: '15px',
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

        return <div style={{textAlign: 'center', padding: '1px', flexGrow: 1, flexBasis: "5%"}}>
            <div style={{width: '38px', minHeight: '22px', fontSize: '16px', margin: '2px auto'}}>{labelDay || date.getDate() === 1 ? format(date, 'MMM').toUpperCase() : ''}</div>
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

    const openPdf = (deviceInfo: DeviceInfo) => {
        let pdfUrl = MyDataHelps.baseUrl + "WebVisualization/WebVisualizationPDF?patientID=" + participant!.getId() + "&modelType=VisualizationModel&visualizationKey=Shared.HtmlToPdf";
        if (deviceInfo && ['Android', 'iOS'].includes(deviceInfo.platform)) {
            // @ts-ignore
            window.webkit.messageHandlers.OpenFile.postMessage({'url': pdfUrl});
        } else {
            MyDataHelps.openExternalUrl(pdfUrl);
        }
        setTimeout(() => {
            setGeneratingPdf(false);
        }, 2000);
    };

    const onGeneratePdf = () => {
        if (props.previewState || generatingPdf) return;

        setGeneratingPdf(true);

        if (!deviceInfo) {
            let reportHtml = '<head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></head>';
            reportHtml += reportRef.current!.outerHTML;

            MyDataHelps.persistDeviceData([{type: 'ReportHtml', value: reportHtml}]).then(() => {
                MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
                    setDeviceInfo(deviceInfo);
                    openPdf(deviceInfo);
                });
            });
        } else {
            openPdf(deviceInfo);
        }
    };

    let documentWidth = 1224;
    let documentHeight = 1580; // Should be 1584, but attempting to avoid running up to the bleeding edge.
    let scale = (window.innerWidth - 32) / documentWidth;

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'absolute', width: documentWidth, height: documentHeight, transform: 'scale(' + scale + ')', transformOrigin: 'top'}}>
            <div style={{position: 'relative', padding: '32px 48px', width: documentWidth, height: documentHeight, boxSizing: 'border-box', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif'}} ref={reportRef}>
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
                        on activity and nighttime awakenings. The figure above use the self-reported answers to assess asthma control, based on the <a href="https://www.nhlbi.nih.gov/health-topics/guidelines-for-diagnosis-management-of-asthma" target="_blank">EPR-3 guidelines</a>. A
                        day is noted as not under control if in the prior week (7 days) there are more than 2 days of symptoms or rescue inhaler use or due to asthma 1
                        nighttime awakening or limitation in activity was recorded.
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', fontSize: '17px', marginBottom: '16px'}}>
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
                        {barrierDays === 0 && renderStat('Reported barriers to adherence', 0, 'reports')}
                        {barrierDays >= 1 && renderStat('Reported barriers to adherence*', barrierDays, barrierDays === 1 ? 'report' : 'reports')}
                        {barrierDays >= 1 &&
                            <div style={{fontSize: '12px', marginTop: '12px'}}>*{barrierAnswers.join(', ')}</div>
                        }
                    </div>
                    <div style={{flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px'}}>
                        <div style={{marginBottom: '8px', fontWeight: 700}}>Days with AQI over 100</div>
                        {renderStat('Home', highHomeAqiDays > 0 ? highHomeAqiDays : 'None', highHomeAqiDays === 1 ? 'day' : highHomeAqiDays > 1 ? 'days' : '')}
                        {renderStat('Work', highWorkAqiDays > 0 ? highWorkAqiDays : 'None', highWorkAqiDays === 1 ? 'day' : highWorkAqiDays > 1 ? 'days' : '')}
                        <div style={{fontSize: '12px', marginTop: '12px'}}>Source: airnow.gov</div>
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: 64, left: 48, right: 48, fontSize: '17px'}}>
                    <div style={{fontSize: '16px', fontWeight: 700, marginBottom: '16px'}}>For Providers - About this tool & report:</div>
                    <div style={{marginBottom: '16px'}}>
                        This report was generated from what is logged in the Asthma Tool, powered by <a href="https://careevolution.com/mydatahelps/" target="_blank">MyDataHelps</a>.
                        The Asthma Tool enables patients to track daily their symptoms and triggers, provides clear summaries or what they log and surfaces relevant
                        educational content and resource links. it summarizes the user's symptom logs. This digital tool design was based on promoting self-regulation,
                        which <a href="https://pubmed.ncbi.nlm.nih.gov/26252889/" target="_blank">studies</a> demonstrate can improve conditions such as asthma. The Asthma Tool does
                        not recommend any changes in management or provide diagnosis.
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        To provide feedback on this report or tool, please e-mail us: <a href="mailto:asthma@careevolution.com" target="_blank">asthma@careevolution.com</a>
                    </div>
                    <div style={{marginBottom: '16px', height: '1px', backgroundColor: '#bdbdbd'}}/>
                    <div>
                        If you plan to share this report with your provider, be aware that communications over email, text, and other channels may not be secure because they can be sent to the wrong address or intercepted.
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: 32, right: 48, fontSize: '16px', fontWeight: 500, textAlign: 'right'}}>
                    Page 1 of 1
                </div>
            </div>
            <div style={{textAlign: 'center', margin: '64px 0', transform: 'scale(' + (1 / scale) + ')', transformOrigin: 'top'}}>
                {generatingPdf && <LoadingIndicator/>}
                {!generatingPdf &&
                    <button className="mdhui-button" onClick={() => onGeneratePdf()}>
                        <div>Generate PDF <FontAwesomeIcon icon={faFilePdf}/></div>
                    </button>
                }
            </div>
        </div>
    </div>;
}