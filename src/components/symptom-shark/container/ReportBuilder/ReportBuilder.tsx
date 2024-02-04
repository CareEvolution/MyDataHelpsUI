import React, { useEffect, useRef, useState } from "react";
import { Button, DateRangeContext, DateRangeNavigator, LoadingIndicator, TrackerItem, UnstyledButton } from "../../../presentational";
import language from "../../../../helpers/language";
import MonthReport from "../../presentational/MonthReport/MonthReport";
import { DailyLogEntry, SymptomConfiguration, SymptomSharkConfiguration, TreatmentConfiguration } from "../../../..";
import { add } from "date-fns";
import symptomSharkData from "../../helpers/symptom-shark-data";
import { demoLogEntries, demoSymptoms, demoTreatments } from "../../helpers/demo-data";
import MyDataHelps from "@careevolution/mydatahelps-js";
import renderPdf from "../../../../helpers/renderPdf";
import { SymptomSharkVisualizationContext } from "../VisualizationCoordinator/VisualizationCoordinator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./ReportBuilder.css"

export interface SymptomSharkReportBuilderProps {
    productLogo?: string;
    productName?: string;
    productUrl?: string;
    previewState?: "default";
    innerRef?: React.Ref<HTMLDivElement>;
}


export default function ReportBuilder(props: SymptomSharkReportBuilderProps) {
    var currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    var initialIntervalStart = currentDate;
    while (initialIntervalStart.getDate() != 1) {
        initialIntervalStart = add(initialIntervalStart, { days: -1 });
    }

    const [logEntries, setLogEntries] = useState<{ [key: string]: DailyLogEntry }>({});
    const [configuration, setConfiguration] = useState<SymptomSharkConfiguration | null>(null);
    const [intervalStartDate, setIntervalStartDate] = useState(initialIntervalStart);
    const [includeSymptoms, setIncludeSymptoms] = useState<boolean>(true);
    const [symptomsExpanded, setSymptomsExpanded] = useState<boolean>(false);
    const [treatmentsExpanded, setTreatmentsExpanded] = useState<boolean>(false);
    const [includeTreatments, setIncludeTreatments] = useState<boolean>(true);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
    const [includeDailyOverallExperience, setIncludeDailyOverallExperience] = useState<boolean>(true);
    const [includeNotes, setIncludeNotes] = useState<boolean>(false);
    const [buildingReport, setBuildingReport] = useState<boolean>(false);
    const report = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
    }, []);

    function initialize() {
        if (props.previewState == "default") {
            setConfiguration({
                participantID: "1",
                symptoms: demoSymptoms,
                treatments: demoTreatments
            });
            setLogEntries(demoLogEntries);
            return;
        }

        symptomSharkData.getConfiguration().then(function (configuration) {
            symptomSharkData.getDailyLogEntries().then(function (logEntries) {
                setConfiguration(configuration);
                setLogEntries(logEntries);
            });
        });
    }

    if (!configuration || !logEntries) return <div ref={props.innerRef}><LoadingIndicator /></div>;

    function toggleSymptom(item: SymptomConfiguration) {
        var newSelectedItems = [...selectedSymptoms];
        if (newSelectedItems.indexOf(item.id) != -1) {
            newSelectedItems.splice(newSelectedItems.indexOf(item.id), 1);
        } else {
            newSelectedItems.push(item.id);
        }
        setSelectedSymptoms(newSelectedItems);
    }

    function toggleTreatment(item: TreatmentConfiguration) {
        var newSelectedItems = [...selectedTreatments];
        if (newSelectedItems.indexOf(item.id) != -1) {
            newSelectedItems.splice(newSelectedItems.indexOf(item.id), 1);
        } else {
            newSelectedItems.push(item.id);
        }
        setSelectedTreatments(newSelectedItems);
    }

    function buildReport() {
        setBuildingReport(true);

        //hack: get the styles from the document and add them to the report so they are included in the PDF
        var documentStyles = document.head.getElementsByTagName("style");
        var html = "";
        for (var i = 0; i < documentStyles.length; i++) {
            html += documentStyles[i].outerHTML;
        }
        html += report.current!.innerHTML;

        renderPdf(html, configuration!.participantID).then(function () {
            setBuildingReport(false);
        });
    }

    function getSelectedSymptomConfigurations() {
        if (!includeSymptoms) { return []; }
        return configuration!.symptoms.filter((s) => !selectedSymptoms.length || selectedSymptoms.indexOf(s.id) != -1);
    }

    function getSelectedTreatmentConfigurations() {
        if (!includeTreatments) { return []; }
        return configuration!.treatments.filter((t) => !selectedTreatments.length || selectedTreatments.indexOf(t.id) != -1);
    }

    return (
        <div className="ss-report-builder">
            <div className="ss-report-builder-items">
                <div className="ss-report-builder-item ss-report-builder-month-selector">
                    <div className="ss-report-builder-selector-title">{language("choose-report-month")}</div>
                    <DateRangeNavigator className='ss-report-date-chooser' variant="rounded" intervalStart={intervalStartDate} intervalType="Month" onIntervalChange={(d) => setIntervalStartDate(d)} />
                </div>
                <UnstyledButton className="ss-report-builder-item" onClick={() => setIncludeSymptoms(!includeSymptoms)} >
                    <div className="ss-report-builder-item-title">{language("include-symptoms")}</div>
                    <div className="ss-report-builder-item-status">
                        <FontAwesomeIcon icon={includeSymptoms ? faCheckCircle : faCircle} />
                    </div>
                </UnstyledButton>
                {includeSymptoms &&
                    <div className="ss-report-builder-item">
                        <div className="ss-report-builder-item-title">{language("select-symptoms")}</div>
                        <UnstyledButton className="ss-report-builder-item-status" onClick={() => setSymptomsExpanded(!symptomsExpanded)}>
                            {selectedSymptoms.length == 0 ? "All" : (selectedSymptoms.length + " Selected")}&nbsp;
                            <FontAwesomeIcon icon={symptomsExpanded ? faChevronUp : faChevronDown} />
                        </UnstyledButton>
                        {symptomsExpanded &&
                            <div className="ss-report-items" style={{ textAlign: "center" }}>
                                {configuration.symptoms!.filter(s => !s.inactive).map(s =>
                                    <TrackerItem className="item" key={s.id}
                                        selected={selectedSymptoms.indexOf(s.id) != -1}
                                        color={s.color}
                                        text={s.name}
                                        onClick={() => toggleSymptom(s)} />
                                )}
                            </div>
                        }
                    </div>
                }
                {configuration.treatments!.length > 0 &&
                    <>
                        <UnstyledButton className="ss-report-builder-item" onClick={() => setIncludeTreatments(!includeTreatments)}>
                            <div className="ss-report-builder-item-title">{language("include-treatments")}</div>
                            <div className="ss-report-builder-item-status">
                                <FontAwesomeIcon icon={includeTreatments ? faCheckCircle : faCircle} />
                            </div>
                        </UnstyledButton>
                        {includeTreatments &&
                            <div className="ss-report-builder-item">
                                <div className="ss-report-builder-item-title">{language("select-treatments")}</div>
                                <UnstyledButton className="ss-report-builder-item-status" onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}>
                                    {selectedTreatments.length == 0 ? "All" : (selectedTreatments.length + " Selected")}&nbsp;
                                    <FontAwesomeIcon icon={treatmentsExpanded ? faChevronUp : faChevronDown} />
                                </UnstyledButton>
                                {treatmentsExpanded &&
                                    <div className="ss-report-items" style={{ textAlign: "center" }}>
                                        {configuration.treatments!.filter(s => !s.inactive).map(s =>
                                            <TrackerItem bordered className="item"
                                                key={s.id}
                                                selected={selectedTreatments.indexOf(s.id) != -1}
                                                color={s.color}
                                                text={s.name}
                                                onClick={() => toggleTreatment(s)} />
                                        )}
                                    </div>
                                }
                            </div>
                        }
                    </>
                }

                <UnstyledButton className="ss-report-builder-item" onClick={() => setIncludeDailyOverallExperience(!includeDailyOverallExperience)}>
                    <div className="ss-report-builder-item-title">{language("include-overall-experience")}</div>
                    <div className="ss-report-builder-item-status">
                        <FontAwesomeIcon icon={includeDailyOverallExperience ? faCheckCircle : faCircle} />
                    </div>
                </UnstyledButton>
                <UnstyledButton className="ss-report-builder-item" onClick={() => setIncludeNotes(!includeNotes)}>
                    <div className="ss-report-builder-item-title">{language("include-notes")}</div>
                    <div className="ss-report-builder-item-status">
                        <FontAwesomeIcon icon={includeNotes ? faCheckCircle : faCircle} />
                    </div>
                </UnstyledButton>
            </div>
            <div style={{ padding: "16px", paddingTop: "0" }}>
                <Button loading={buildingReport} disabled={buildingReport || (!includeSymptoms && !includeTreatments && !includeNotes && !includeDailyOverallExperience)} onClick={() => buildReport()}>
                    {!buildingReport &&
                        <span>{language("create-report")}</span>
                    }
                </Button>
            </div>
            <div ref={report} style={{ display: "none" }}>
                <DateRangeContext.Provider value={{ intervalStart: intervalStartDate, intervalType: "Month" }}>
                    <SymptomSharkVisualizationContext.Provider value={{ logEntries: logEntries, symptoms: getSelectedSymptomConfigurations(), treatments: getSelectedTreatmentConfigurations(), hasFilteredSymptoms: !!selectedSymptoms.length }}>
                        <MonthReport
                            includeDailyOverallFeeling={includeDailyOverallExperience}
                            includeNotes={includeNotes}
                            productLogo={props.productLogo}
                            productUrl={props.productUrl}
                            productName={props.productName} />
                    </SymptomSharkVisualizationContext.Provider>
                </DateRangeContext.Provider>
            </div>
        </div>
    );
}