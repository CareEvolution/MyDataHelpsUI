import { DailyLogEntry, SymptomConfiguration, TreatmentConfiguration } from "../..";
import { add } from 'date-fns';
import getDayKey from "../../../helpers/get-day-key";
import { LogEntryIconKey } from "../presentational/LogEntryIcon/LogEntryIcon";

export var demoSymptoms: SymptomConfiguration[] = [
	{
		severityTracking: "10PointScale",
		color: "#c4291c",
		name: "Headache",
		id: "Headache"
	},
	{
		severityTracking: "3PointScale",
		color: "#e35c33",
		name: "Fatigue",
		id: "Fatigue"
	},
	{
		severityTracking: "3PointScale",
		color: "#5db37e",
		name: "Exhaustion / PEM",
		id: "Nausea"
	},
	{
		severityTracking: "None",
		color: "#429bdf",
		name: "Anxiety",
		id: "Anxiety"
	},
	{
		severityTracking: "None",
		color: "#7b88c6",
		name: "Brain Fog",
		id: "Brain Fog"
	},
	{
		severityTracking: "None",
		color: "#616161",
		name: "Back Pain",
		id: "Back Pain"
	},
	{
		severityTracking: "None",
		color: "#d98177",
		name: "Insomnia",
		id: "Insomnia"
	}
];

export var demoTreatments: TreatmentConfiguration[] = [
	{
		color: "#616161",
		id: "Tylenol",
		name: "Walk with Friends"
	},
	{
		color: "#429BDF",
		id: "Rest",
		name: "Cooked Dinner"
	},
	{
		color: "#d98177",
		id: "Ice",
		name: "Took a Shower"
	},
	{
		color: "#5db37e",
		id: "Stretching",
		name: "Vacuumed"
	},
	{
		color: "#e35c33",
		id: "Meditation",
		name: "Phone Call"
	}
];

demoSymptoms.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
demoTreatments.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
	

export var demoLogEntries: { [key: string]: DailyLogEntry } = {};
var currentDate = add(new Date(), {days:-29});

function addLogEntry(symptoms: string[], treatments: string[], overallFeeling: number, icon?: LogEntryIconKey, notes?: boolean) {
	demoLogEntries[getDayKey(currentDate)] = {
		symptoms: symptoms.map(s => {
			return {
				id: s,
                severity: Math.floor(Math.random() * 10) + 1
			}
		}),
		treatments: treatments.map(s => {
			return {
				id: s
			}
		}),
		notes: notes ? "notes" : "",
		icon: icon,
		overallFeeling: overallFeeling
	}
	currentDate = add(currentDate, { days: 1 });
}

addLogEntry(["Headache", "Insomnia"], ["Tylenol"], 2, "moon-o", true);
addLogEntry(["Brain Fog", "Nausea"], ["Tylenol", "Ice"], 4);
addLogEntry(["Headache"], ["Tylenol"], 3);
addLogEntry(["Headache", "Insomnia"], ["Tylenol"], 3);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea"], ["Stretching", "Rest", "Ice"], 1);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea", "Headache", "Insomnia", "Brain Fog"], ["Stretching", "Rest", "Ice", "Meditation", "Tylenol"], 1, "star-o", true);
addLogEntry(["Fatigue", "Nausea", "Headache"], ["Stretching"], 2);
addLogEntry(["Anxiety", "Brain Fog"], ["Rest", "Meditation"], 3, undefined, true);
addLogEntry([], [], 5);
addLogEntry(["Back Pain", "Headache"], ["Ice", "Tylenol"], 4);
addLogEntry(["Fatigue", "Back Pain", "Nausea", "Brain Fog"], ["Meditation", "Tylenol"], 2);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Insomnia", "Brain Fog"], ["Rest"], 4, "star", true);
addLogEntry(["Fatigue", "Back Pain"], ["Stretching", "Rest"], 3);
addLogEntry(["Fatigue", "Nausea"], ["Stretching", "Rest", "Ice", "Meditation", "Tylenol"], 2, "flag", true);
addLogEntry(["Headache", "Insomnia", "Brain Fog"], ["Stretching", "Tylenol"], 4, "user-md", true);
addLogEntry([], [], 5);
addLogEntry([], [], 5);
addLogEntry([], [], 5);
addLogEntry(["Back Pain", "Headache"], ["Ice", "Tylenol"], 4);
addLogEntry(["Fatigue", "Back Pain", "Nausea", "Brain Fog"], ["Meditation", "Tylenol"], 2);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea"], ["Stretching", "Rest", "Ice"], 1);
addLogEntry(["Fatigue", "Insomnia", "Brain Fog"], ["Rest"], 4, "question-circle-o", true);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea", "Headache", "Insomnia", "Brain Fog"], ["Stretching", "Rest", "Ice", "Meditation", "Tylenol"], 1, "flask", true);
addLogEntry([], [], 5);
addLogEntry(["Headache", "Insomnia"], ["Tylenol"], 3);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Nausea", "Insomnia"], ["Rest", "Ice"], 2, "trophy", false);