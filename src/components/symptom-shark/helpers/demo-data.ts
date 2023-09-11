import { DailyLogEntry, SymptomConfiguration, TreatmentConfiguration } from "../..";
import { add, startOfMonth } from 'date-fns';
import getDayKey from "../../../helpers/get-day-key";

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
		severityTracking: "None",
		color: "#5db37e",
		name: "Nausea",
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
		name: "Tylenol"
	},
	{
		color: "#429BDF",
		id: "Rest",
		name: "Rest"
	},
	{
		color: "#d98177",
		id: "Ice",
		name: "Ice"
	},
	{
		color: "#5db37e",
		id: "Stretching",
		name: "Stretching"
	},
	{
		color: "#e35c33",
		id: "Meditation",
		name: "Meditation"
	}
];

export var demoLogEntries: { [key: string]: DailyLogEntry } = {};
var currentDate = add(new Date(), {days:-29});

function addLogEntry(symptoms: string[], treatments: string[], overallFeeling: number, icon?: string, notes?: boolean) {
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

addLogEntry(["Headache", "Insomnia"], ["Tylenol"], 2, "user-md", true);
addLogEntry(["Brain Fog", "Nausea"], ["Tylenol", "Ice"], 4);
addLogEntry(["Headache"], ["Tylenol"], 3);
addLogEntry(["Headache", "Insomnia"], ["Tylenol"], 3);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea"], ["Stretching", "Rest", "Ice"], 1);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea", "Headache", "Insomnia", "Brain Fog"], ["Stretching", "Rest", "Ice", "Meditation", "Tylenol"], 1, "user-md", true);
addLogEntry(["Fatigue", "Nausea", "Headache"], ["Stretching"], 2);
addLogEntry(["Anxiety", "Brain Fog"], ["Rest", "Meditation"], 3, "bolt", true);
addLogEntry([], [], 5);
addLogEntry(["Back Pain", "Headache"], ["Ice", "Tylenol"], 4);
addLogEntry(["Fatigue", "Back Pain", "Nausea", "Brain Fog"], ["Meditation", "Tylenol"], 2);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Insomnia", "Brain Fog"], ["Rest"], 4, "star", true);
addLogEntry(["Fatigue", "Back Pain"], ["Stretching", "Rest"], 3);
addLogEntry(["Fatigue", "Nausea"], ["Stretching", "Rest", "Ice", "Meditation", "Tylenol"], 2, "user-md", true);
addLogEntry(["Headache", "Insomnia", "Brain Fog"], ["Stretching", "Tylenol"], 4, "user-md", true);
addLogEntry([], [], 5);
addLogEntry([], [], 5);
addLogEntry([], [], 5);
addLogEntry(["Back Pain", "Headache"], ["Ice", "Tylenol"], 4);
addLogEntry(["Fatigue", "Back Pain", "Nausea", "Brain Fog"], ["Meditation", "Tylenol"], 2);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea"], ["Stretching", "Rest", "Ice"], 1);
addLogEntry(["Fatigue", "Insomnia", "Brain Fog"], ["Rest"], 4, "star", true);
addLogEntry(["Fatigue", "Back Pain", "Anxiety", "Nausea", "Headache", "Insomnia", "Brain Fog"], ["Stretching", "Rest", "Ice", "Meditation", "Tylenol"], 1, "user-md", true);
addLogEntry([], [], 5);
addLogEntry(["Headache", "Insomnia"], ["Tylenol"], 3);
addLogEntry([], [], 5);
addLogEntry(["Fatigue", "Insomnia",], ["Rest"], 2, "moon-o", false);