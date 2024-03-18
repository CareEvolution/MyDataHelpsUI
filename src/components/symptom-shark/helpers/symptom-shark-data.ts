import MyDataHelps, { DeviceDataPointQuery, Guid, ParticipantInfo } from "@careevolution/mydatahelps-js";
import { LogEntryIconKey } from "../presentational/LogEntryIcon/LogEntryIcon";

export interface SymptomSharkDataService {
	getConfiguration(): Promise<SymptomSharkConfiguration>;
	getDailyLogEntries(after?: string, before?: string): Promise<{ [key: string]: DailyLogEntry }>;
	saveDailyLogEntry(date: string, entry: DailyLogEntry): Promise<any>;
}

export interface SymptomSharkConfiguration {
	participantID: Guid;
	symptoms: SymptomConfiguration[];
	treatments: TreatmentConfiguration[];
}

export interface SymptomConfiguration {
	id: string;
	color: string;
	name: string;
	severityTracking: 'None' | '3PointScale' | '10PointScale';
	inactive?: boolean;
}

export interface TreatmentConfiguration {
	id: string;
	color: string;
	name: string;
	inactive?: boolean;
}

export interface DailyLogEntry {
	symptoms: SymptomReference[];
	treatments: TreatmentReference[];
	exertionActivities?: string[];
	overallFeeling?: number;
	notes: string;
	icon?: LogEntryIconKey;
}

export interface SymptomReference {
	id: string;
	severity?: number;
}

export interface TreatmentReference {
	id: string;
}

export function convertToSymptomSharkConfiguration(info: ParticipantInfo) {
	if (!info.customFields["Symptoms"]?.length) {
		info.customFields["Symptoms"] = "[]";
	}
	if (!info.customFields["Treatments"]?.length) {
		info.customFields["Treatments"] = "[]";
	}

	var symptoms: SymptomConfiguration[] = [];
	try {
		symptoms = JSON.parse(info.customFields["Symptoms"]) as SymptomConfiguration[];
	} catch (e) {
		symptoms = JSON.parse(info.customFields["Symptoms"].replace(/\\/g, "")) as SymptomConfiguration[];
	}
	symptoms.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
	symptoms.forEach(s => {
		if (!s.severityTracking) { s.severityTracking = 'None'; }
	});

	var treatments: TreatmentConfiguration[] = [];
	try {
		treatments = JSON.parse(info.customFields["Treatments"]) as TreatmentConfiguration[];
	} catch (e) {
		treatments = JSON.parse(info.customFields["Treatments"].replace(/\\/g, "")) as TreatmentConfiguration[];
	}
	treatments.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

	return {
		participantID: info.participantID,
		symptoms: symptoms,
		treatments: treatments
	};
}

var service: SymptomSharkDataService = {
	getConfiguration: function () {
		return MyDataHelps.getParticipantInfo().then(function (info) {
			return convertToSymptomSharkConfiguration(info);
		});
	},
	getDailyLogEntries: function (after?: string, before?: string) {
		var result: { [key: string]: DailyLogEntry } = {};

		var getLogEntryPage = function (pageId?: Guid): Promise<{ [key: string]: DailyLogEntry }> {
			var parameters: DeviceDataPointQuery = {
				namespace: "Project",
				type: "DailyLogEntry",
				pageID: pageId
			};

			if (after) {
				parameters.observedAfter = after;
			}

			if (before) {
				parameters.observedBefore = before;
			}

			return MyDataHelps.queryDeviceData(parameters).then(function (page) {
				var dataPoints = page.deviceDataPoints;
				for (var i = 0; i < dataPoints.length; i++) {
					var logEntry = JSON.parse(dataPoints[i].value);
					var observationDate = dataPoints[i].observationDate;
					if (observationDate) {
						result[observationDate.substring(0, 10)] = upgradeLogEntry(logEntry);
					}
				}

				if (page.nextPageID) {
					return getLogEntryPage(page.nextPageID);
				} else {
					return result;
				}
			});
		}
		return getLogEntryPage() as Promise<{ [key: string]: DailyLogEntry }>;
	},
	saveDailyLogEntry: function (date: string, entry: DailyLogEntry) {
		return MyDataHelps.persistDeviceData([
			{
				type: "DailyLogEntry",
				observationDate: date + "T00:00:00.000Z",
				value: JSON.stringify(entry)
			}
		]);
	}
}

// Converts log entries stored in old format to new format
function upgradeLogEntry(logEntry: any) {
	if (logEntry.starred) {
		logEntry.icon = "star";
	}

	var newEntry: DailyLogEntry = {
		overallFeeling: logEntry.overallFeeling,
		notes: logEntry.notes,
		symptoms: logEntry.symptoms.map((s: any) => {
			if (typeof s === 'string') {
				return { id: s };
			}
			return s;
		}),
		treatments: logEntry.treatments.map((s: any) => {
			if (typeof s === 'string') {
				return { id: s };
			}
			return s;
		}),
		icon: logEntry.icon
	}
	return newEntry;
}

export default service;