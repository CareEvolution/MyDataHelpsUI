import { parseISO } from "date-fns";
import { SurveyResultListEntry } from "./SurveyResultList";

const previewSurveyResultListEntries: SurveyResultListEntry[] = [];
previewSurveyResultListEntries.push({
    title: "Started Rosuvastatin",
    date: parseISO("2025-04-01"),
});
previewSurveyResultListEntries.push({
    title: "Allergic Reaction",
    subtitle: "Treated in ER with Prednisone",
    date: parseISO("2025-03-20"),
});
previewSurveyResultListEntries.push({
    title: "Appendix Removal",
    date: parseISO("2024-08-20"),
});
previewSurveyResultListEntries.push({
    title: "Started Lisinopril",
    subtitle: "Started at 5mg and then increased to 10mg",
    date: parseISO("2024-08-01"),
});
previewSurveyResultListEntries.push({
    title: "Facet block injection",
    subtitle: "Due to pain from car accident, performed at Pain Clinic",
    date: parseISO("2022-11-20"),
});
previewSurveyResultListEntries.push({
    title: "Car Accident",
    subtitle: "Whiplash Injury resulted in severe neck/shoulder pain for months",
    date: parseISO("2022-09-01"),
});
previewSurveyResultListEntries.push({
    title: "Achilles Tendon Rupture",
    subtitle: "Treated in ER",
    date: parseISO("2017-09-01"),
});
previewSurveyResultListEntries.push({
    title: "Anaphylactic Shock",
    subtitle: "Treated with epinephrine in the ER.  Unknown cause.",
    date: parseISO("2010-04-11"),
});
export default previewSurveyResultListEntries;