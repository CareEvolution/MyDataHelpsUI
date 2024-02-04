// import React from "react";
// import { Button, UnstyledButton } from "../../../presentational";
// import language from "../../../../helpers/language";

// export interface SymptomSharkReportBuilderProps {
// 	productLogo?: string;
// 	productName?: string;
// 	productUrl?: string;
// }


// export default function ReportBuilder(props: ReportBuilderProps) {
// 	var currentDate = new Date();
// 	currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
// 	var initialIntervalStart = currentDate;
// 	while (initialIntervalStart.getDate() != 1) {
// 		initialIntervalStart = add(initialIntervalStart, { days: -1 });
// 	}

// 	const [intervalStartDate, setIntervalStartDate] = useState(initialIntervalStart);
// 	const [includeSymptoms, setIncludeSymptoms] = useState<boolean>(true);
// 	const [symptomsExpanded, setSymptomsExpanded] = useState<boolean>(false);
// 	const [treatmentsExpanded, setTreatmentsExpanded] = useState<boolean>(false);
// 	const [includeTreatments, setIncludeTreatments] = useState<boolean>(true);
// 	const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
// 	const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
// 	const [includeDailyOverallExperience, setIncludeDailyOverallExperience] = useState<boolean>(true);
// 	const [includeNotes, setIncludeNotes] = useState<boolean>(false);
// 	const [buildingReport, setBuildingReport] = useState<boolean>(false);
// 	const report = useRef<HTMLDivElement>(null);

// 	function toggleSymptom(item: SymptomConfiguration) {
// 		var newSelectedItems = [...selectedSymptoms];
// 		if (newSelectedItems.indexOf(item.id) != -1) {
// 			newSelectedItems.splice(newSelectedItems.indexOf(item.id), 1);
// 		} else {
// 			newSelectedItems.push(item.id);
// 		}
// 		setSelectedSymptoms(newSelectedItems);
// 	}

// 	function toggleTreatment(item: TreatmentConfiguration) {
// 		var newSelectedItems = [...selectedTreatments];
// 		if (newSelectedItems.indexOf(item.id) != -1) {
// 			newSelectedItems.splice(newSelectedItems.indexOf(item.id), 1);
// 		} else {
// 			newSelectedItems.push(item.id);
// 		}
// 		setSelectedTreatments(newSelectedItems);
// 	}

// 	function buildReport() {
// 		setBuildingReport(true);

// 		//hack: get the styles from the document and add them to the report so they are included in the PDF
// 		var documentStyles = document.head.getElementsByTagName("style");
// 		var html = ""; 
// 		for(var i = 0; i < documentStyles.length; i++) {
// 			html += documentStyles[i].outerHTML;
// 		}
// 		html += report.current!.innerHTML;
		
// 		symptomSharkData.saveReportHtml(html).then(function () {
// 			var url = MyDataHelps.baseUrl + "WebVisualization/WebVisualizationPDF?patientID=" + props.participantInfo!.participantID + "&modelType=VisualizationModel&visualizationKey=SymptomShark.MonthReport";
// 			MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
// 				if (!deviceInfo || deviceInfo.platform == "Web") {
// 					window.open(url);
// 				} else {
// 					//TODO add to MyDataHelps-js
// 					(window as any).webkit.messageHandlers.OpenFile.postMessage({ url: url });
// 				}
// 				setBuildingReport(false);
// 			});
// 		});
// 	}

// 	function getSelectedSymptomConfigurations() {
// 		if (!includeSymptoms) { return []; }
// 		return props.participantInfo.symptoms.filter((s) => !selectedSymptoms.length || selectedSymptoms.indexOf(s.id) != -1);
// 	}

// 	function getSelectedTreatmentConfigurations() {
// 		if (!includeTreatments) { return []; }
// 		return props.participantInfo.treatments.filter((t) => !selectedTreatments.length || selectedTreatments.indexOf(t.id) != -1);
// 	}

// 	return (
// 		<div className="report-builder">
// 			<div className="builder-items">
// 				<div className="builder-item month-selector">
// 					<div className="selector-title">{language["choose-report-month"]}</div>
// 					<DateRangeNavigator className='report-date-chooser' variant="rounded" intervalStart={intervalStartDate} intervalType="Month" onIntervalChange={(d) => setIntervalStartDate(d)} />
// 				</div>
// 				<UnstyledButton className="builder-item" onClick={() => setIncludeSymptoms(!includeSymptoms)} >
// 					<div className="builder-item-title">{language["include-symptoms"]}</div>
// 					<div className="builder-item-status">
// 						<i className={"fa fa-" + (includeSymptoms ? "check-circle" : "circle-o")}></i>
// 					</div>
// 				</UnstyledButton>
// 				{includeSymptoms &&
// 					<div className="builder-item">
// 						<div className="builder-item-title">{language["select-symptoms"]}</div>
// 						<UnstyledButton className="builder-item-status" onClick={() => setSymptomsExpanded(!symptomsExpanded)}>
// 							{selectedSymptoms.length == 0 ? "All" : (selectedSymptoms.length + " Selected")}&nbsp;
// 							<i className={"fa fa-chevron-" + (symptomsExpanded ? "up" : "down")}></i>
// 						</UnstyledButton>
// 						{symptomsExpanded &&
// 							<div className="items" style={{ textAlign: "center" }}>
// 								{props.participantInfo.symptoms!.filter(s => !s.inactive).map(s =>
// 									<TrackerItem className="item" key={s.id}
// 										selected={selectedSymptoms.indexOf(s.id) != -1}
// 										color={s.color}
// 										text={s.name}
// 										onClick={() => toggleSymptom(s)} />
// 								)}
// 							</div>
// 						}
// 					</div>
// 				}
// 				{props.participantInfo.treatments!.length > 0 &&
// 					<>
// 						<UnstyledButton className="builder-item" onClick={() => setIncludeTreatments(!includeTreatments)}>
// 							<div className="builder-item-title">{language["include-treatments"]}</div>
// 							<div className="builder-item-status">
// 								<i className={"fa fa-" + (includeTreatments ? "check-circle" : "circle-o")}></i>
// 							</div>
// 						</UnstyledButton>
// 						{includeTreatments &&
// 							<div className="builder-item">
// 								<div className="builder-item-title">{language["select-treatments"]}</div>
// 								<UnstyledButton className="builder-item-status" onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}>
// 									{selectedTreatments.length == 0 ? "All" : (selectedTreatments.length + " Selected")}&nbsp;
// 									<i className={"fa fa-chevron-" + (treatmentsExpanded ? "up" : "down")}></i>
// 								</UnstyledButton>
// 								{treatmentsExpanded &&
// 									<div className="items" style={{ textAlign: "center" }}>
// 										{props.participantInfo.treatments!.filter(s => !s.inactive).map(s =>
// 											<TrackerItem bordered className="item"
// 												key={s.id}
// 												selected={selectedTreatments.indexOf(s.id) != -1}
// 												color={s.color}
// 												text={s.name}
// 												onClick={() => toggleTreatment(s)} />
// 										)}
// 									</div>
// 								}
// 							</div>
// 						}
// 					</>
// 				}

// 				<UnstyledButton className="builder-item" onClick={() => setIncludeDailyOverallExperience(!includeDailyOverallExperience)}>
// 					<div className="builder-item-title">{language("include-overall-experience")}</div>
// 					<div className="builder-item-status">
// 						<i className={"fa fa-" + (includeDailyOverallExperience ? "check-circle" : "circle-o")}></i>
// 					</div>
// 				</UnstyledButton>
// 				<UnstyledButton className="builder-item" onClick={() => setIncludeNotes(!includeNotes)}>
// 					<div className="builder-item-title">{language("include-notes")}</div>
// 					<div className="builder-item-status">
// 						<i className={"fa fa-" + (includeNotes ? "check-circle" : "circle-o")}></i>
// 					</div>
// 				</UnstyledButton>
// 			</div>
// 			<div style={{ padding: "16px", paddingTop: "0" }}>
// 				<Button loading={buildingReport} disabled={buildingReport || (!includeSymptoms && !includeTreatments && !includeNotes && !includeDailyOverallExperience)} onClick={() => buildReport()}>
// 					{!buildingReport &&
// 						<span>{language("create-report")}</span>
// 					}
// 				</Button>
// 			</div>
// 			<div className="generated-report" ref={report} style={{ display: "none" }}>
// 				<MonthReport symptoms={getSelectedSymptomConfigurations()}
// 					treatments={getSelectedTreatmentConfigurations()}
// 					currentMonth={intervalStartDate.getMonth()}
// 					currentYear={intervalStartDate.getFullYear()}
// 					logEntries={props.logEntries}
// 					includeDailyOverallFeeling={includeDailyOverallExperience}
// 					includeNotes={includeNotes}
// 					productLogo={props.productLogo}
// 					productUrl={props.productUrl}
// 					productName={props.productName} />
// 			</div>
// 		</div>
// 	);
// }