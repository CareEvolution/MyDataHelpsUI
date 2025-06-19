import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { AsthmaProviderReportPreviewState, previewData } from './AsthmaProviderReport.previewData';
import { add, formatISO, parseISO, startOfToday } from 'date-fns';
import { AsthmaControlState, AsthmaLogEntry, AsthmaParticipant } from '../../model';
import MyDataHelps, { DeviceDataPoint, DeviceInfo, SurveyAnswer } from '@careevolution/mydatahelps-js';
import { LoadingIndicator } from '../../../presentational';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { getFullDateString, getAbbreviatedMonthName } from "../../../../helpers/date-helpers";
import { language } from '../../../../helpers/language';

export interface AsthmaProviderReportProps {
    previewState?: AsthmaProviderReportPreviewState;
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

        const dataService = props.previewState ? previewData.createDataService(props.previewState) : asthmaDataService;

        let participantLoader = dataService.loadParticipant();
        let logEntryLoader = dataService.loadLogEntries(startDate);
        let surveyAnswerLoader = dataService.loadSurveyAnswers(props.logEntrySurveyName, startDate);
        let airQualityDataPointsLoader = dataService.loadAirQualityDataPoints(startDate);

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

    let nameToDisplay = participant!.getFirstName();
    if (participant!.getParticipantMode() === 'Caregiver') {
        const careRecipientName = participant!.getCareRecipientName();
        if (careRecipientName) {
            nameToDisplay = careRecipientName;
        }
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

        let dayWrapperStyle: CSSProperties = {
            fill: 'transparent',
            stroke: '#fff',
            strokeWidth: 2
        };

        let dayStyle: CSSProperties = {
            fontSize: '15px',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: '40px'
        } as CSSProperties;

        if (logEntryControlState?.status === 'not-controlled') {
            dayWrapperStyle.fill = '#F86A5C';
            dayWrapperStyle.stroke = '#F86A5C';
            dayStyle.color = '#fff';
        } else if (logEntryControlState?.status === 'controlled') {
            dayWrapperStyle.stroke = '#35A6A0';
            dayStyle.color = '#35A6A0';
        } else if (logEntryControlState?.status === 'not-determined') {
            dayWrapperStyle.stroke = '#000';
            dayWrapperStyle.strokeDasharray = 4;
        }

        return <div style={{textAlign: 'center', padding: '1px', flexGrow: 1, flexBasis: "5%"}}>
            <div style={{width: '38px', minHeight: '22px', fontSize: '16px', margin: '2px auto'}}>{labelDay || date.getDate() === 1 ? getAbbreviatedMonthName(date).toLocaleUpperCase() : ''}</div>
            <svg viewBox="0 0 40px 40px" style={{height: '40px', width: '40px'}}>
                <circle cx="20" cy="20" r="18" style={dayWrapperStyle}/>
                <foreignObject x="0" y="0" height="40px" width="40px">
                    <div style={dayStyle}>{date.getDate()}</div>
                </foreignObject>
            </svg>
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
        let fileName = `AsthmaTool-ProviderReport-${formatISO(new Date(), {representation: 'date'})}`;
        let pdfUrl = MyDataHelps.baseUrl + "WebVisualization/WebVisualizationPDF?patientID=" + participant!.getId() + "&modelType=VisualizationModel&visualizationKey=Shared.HtmlToPdf&fileName=" + encodeURIComponent(fileName);
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
    let documentHeight = 1575; // Would be 1584, but avoiding running up to the bleeding edge, which results in a blank second page.
    let scale = (window.innerWidth - 32) / documentWidth;

    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: documentWidth, height: documentHeight, transform: 'scale(' + scale + ')', transformOrigin: 'top' }}>
            <div style={{ position: 'relative', padding: '32px 48px', width: documentWidth, height: documentHeight, boxSizing: 'border-box', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }} ref={reportRef}>
                <div style={{ fontSize: '32px', fontWeight: 600 }}>{nameToDisplay} - {language('asthma-provider-report-tool')} - {language('asthma-provider-report-provider-report')}</div>
                <div style={{ fontSize: '24px', color: '#3b3b3b', marginBottom: '16px' }}>{getFullDateString(startDate)} - {getFullDateString(today)} (90 {language('days')})</div>
                <div style={{ border: '1px solid #dbdbdb', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '16px', borderBottom: '1px solid #dbdbdb', boxSizing: 'border-box' }}>
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ fontSize: '18px', fontWeight: 700 }}>{language('asthma-provider-report-asthma-control')}</div>
                            <div style={{ fontSize: '16px', color: '#3b3b3b', marginBottom: '16px' }}>{language('asthma-provider-report-patient-reported')}</div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ marginRight: '24px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 700 }}>{logEntries.length} out of 90</div>
                                    <div>{language('asthma-provider-report-daily-entries')}</div>
                                </div>
                                <div style={{ marginRight: '24px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#F86A5C' }}>{logEntries.filter(logEntry => controlStateLookup[logEntry.identifier].status === 'not-controlled').length} days</div>
                                    <div>{language('asthma-provider-report-not-controlled')}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#35A6A0' }}>{logEntries.filter(logEntry => controlStateLookup[logEntry.identifier].status === 'controlled').length} days</div>
                                    <div>{language('asthma-provider-report-controlled')}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ fontSize: '14px', fontWeight: 500, paddingTop: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '8px' }}>
                                <svg viewBox="0 0 20 20" style={{ height: '20px', width: '20px' }}>
                                    <circle cx="10" cy="10" r="8" style={{ fill: '#fff', stroke: '#35A6A0', strokeWidth: 2 }} />
                                </svg>
                                <div style={{ flexGrow: 1, padding: '2px 8px' }}>{language('asthma-provider-report-under-control')}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '8px' }}>
                                <svg viewBox="0 0 20 20" style={{ height: '20px', width: '20px' }}>
                                    <circle cx="10" cy="10" r="8" style={{ fill: '#F86A5C', stroke: '#F86A5C', strokeWidth: 2 }} />
                                </svg>
                                <div style={{ flexGrow: 1, padding: '2px 8px' }}>{language('asthma-provider-report-not-under-control')}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '8px' }}>
                                <svg viewBox="0 0 20 20" style={{ height: '20px', width: '20px' }}>
                                    <circle cx="10" cy="10" r="8" style={{ fill: '#fff', stroke: '#000', strokeWidth: 2, strokeDasharray: 3 }} />
                                </svg>
                                <div style={{ flexGrow: 1, padding: '2px 8px' }}>{language('asthma-provider-report-not-enough-info')}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '12px 16px' }}>
                        {renderRow(0, 18, true)}
                        {renderRow(18, 18)}
                        {renderRow(36, 18)}
                        {renderRow(54, 18)}
                        {renderRow(72, 18)}
                    </div>
                    <div style={{ fontSize: '14px', color: '#3b3b3b', backgroundColor: '#f2f2f2', padding: '16px' }}
                     dangerouslySetInnerHTML={{ __html: language('asthma-provider-report-explanation') }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', fontSize: '17px', marginBottom: '16px' }}>
                    <div style={{ flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 700 }}>{language('asthma-provider-report-components-control')}</div>
                        {renderStat(language('asthma-provider-report-symptoms-reported'), symptomDays, symptomDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-rescue-inhaler-use'), inhalerUseDays, inhalerUseDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-activities-affected'), limitedActivityDays, limitedActivityDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-nighttime-awakenings'), nighttimeAwakeningDays, nighttimeAwakeningDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}</div>
                    <div style={{ flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px', margin: '0 16px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 700 }}>{language('asthma-provider-report-symptom-severity')}</div>
                        {renderStat(language('asthma-provider-report-severity-none'), noSymptomDays, noSymptomDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-severity-mild'), mildSymptomDays, mildSymptomDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-severity-moderate'), moderateSymptomDays, moderateSymptomDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-severity-severe'), severeSymptomDays, severeSymptomDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}</div>
                    <div style={{ flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 700 }}>{language('asthma-provider-report-common-symptoms')}</div>
                        {renderStat(language('asthma-provider-report-coughing'), coughingDays, coughingDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}
                        {renderStat(language('asthma-provider-report-wheezing'), wheezingDays, wheezingDays === 1 ? language('asthma-provider-report-day') : language('asthma-provider-report-days'))}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', fontSize: '16px', marginBottom: '24px' }}>
                    <div style={{ flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 700 }}>{language('asthma-provider-report-top-triggers')}</div>
                        {renderStat(language('asthma-provider-report-animal-exposure'), animalExposureDays, animalExposureDays === 1 ? language('asthma-provider-report-report') : language('asthma-provider-report-reports'))}
                        {renderStat(language('asthma-provider-report-allergens'), allergenDays, allergenDays === 1 ? language('asthma-provider-report-report') : language('asthma-provider-report-reports'))}
                        {renderStat(language('asthma-provider-report-smoke'), smokeDays, smokeDays === 1 ? language('asthma-provider-report-report') : language('asthma-provider-report-reports'))}
                        {renderStat(language('asthma-provider-report-air-pollution'), airPollutionDays, airPollutionDays === 1 ? language('asthma-provider-report-report') : language('asthma-provider-report-reports'))}</div>
                    <div style={{ flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px', margin: '0 16px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 700 }}>{language('asthma-provider-report-medications')}</div>
                        {renderStat(language('asthma-provider-report-missed-doses'), missedDosesDays, missedDosesDays === 1 ? language('asthma-provider-report-report') : language('asthma-provider-report-reports'))}
                        {barrierDays === 0 && renderStat(language('asthma-provider-report-barriers-adherence'), 0, language('asthma-provider-report-reports'))}
                        {barrierDays >= 1 && renderStat(language('asthma-provider-report-barriers-adherence-with-asterisk'), barrierDays, barrierDays === 1 ? language('asthma-provider-report-report') : language('asthma-provider-report-reports'))} {barrierDays >= 1 &&
                            <div style={{ fontSize: '12px', marginTop: '12px' }}>*{barrierAnswers.join('; ')}</div>
                        }
                    </div>
                    <div style={{ flexGrow: 1, flexBasis: '30%', backgroundColor: '#f2f2f2', border: '1px solid #dbdbdb', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 700 }}>{language('asthma-provider-report-aqi-over-100')}</div>
                        {renderStat(language('asthma-provider-report-home'), highHomeAqiDays > 0 ? highHomeAqiDays : language('asthma-provider-report-none'), highHomeAqiDays === 1 ? language('asthma-provider-report-day') : highHomeAqiDays > 1 ? language('asthma-provider-report-days') : '')}
                        {renderStat(language('asthma-provider-report-work'), highWorkAqiDays > 0 ? highWorkAqiDays : language('asthma-provider-report-none'), highWorkAqiDays === 1 ? language('asthma-provider-report-day') : highWorkAqiDays > 1 ? language('asthma-provider-report-days') : '')} 
                        <div style={{ fontSize: '12px', marginTop: '12px' }}>{language('asthma-provider-report-source')}</div>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 64, left: 48, right: 48, fontSize: '17px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>{language('asthma-provider-report-about-tool')}</div>
                    <div style={{ marginBottom: '16px' }}
                        dangerouslySetInnerHTML={{ __html: language('asthma-provider-report-about-text') }} />
                    <div style={{ marginBottom: '16px' }} 
                        dangerouslySetInnerHTML={{ __html: language('asthma-provider-report-feedback') }} />
                    <div style={{ marginBottom: '16px', height: '1px', backgroundColor: '#bdbdbd' }} />
                    <div>
                        {language('asthma-provider-report-disclaimer')}
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 32, right: 48, fontSize: '16px', fontWeight: 500, textAlign: 'right' }}>
                    {language('asthma-provider-report-page', undefined, { 'page': '1', 'total': '1' })}
                </div>
            </div>
            <div style={{ textAlign: 'center', margin: '64px 0', transform: 'scale(' + (1 / scale) + ')', transformOrigin: 'top' }}>
                {generatingPdf && <LoadingIndicator />}
                {!generatingPdf &&
                    <button className="mdhui-button" onClick={() => onGeneratePdf()}>
                        <div>{language('asthma-provider-report-generate-pdf')} <FontAwesomeIcon icon={faFilePdf} /></div>
                    </button>
                }
            </div>
        </div>
    </div>;
}