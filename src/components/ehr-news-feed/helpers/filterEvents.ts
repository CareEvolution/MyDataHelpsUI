import { EhrNewsFeedClaimProcedureModel, EhrNewsFeedClaimServiceModel, EhrNewsFeedEventModel, EhrNewsFeedImmunizationModel, EhrNewsFeedLabReportModel, EhrNewsFeedProcedureModel, EhrNewsFeedReportModel } from "./types";

export default function filterEvents(events: EhrNewsFeedEventModel[], filter: string) {
    return events.filter((event) => {
        let keywords = getKeywords(event);
        return keywords.some((keyword) => keyword.toLowerCase().includes(filter.toLowerCase()));
    });
}

function getKeywords(event: EhrNewsFeedEventModel): string[] {
    if (event.Type === "Report") {
        let report = event.Event as EhrNewsFeedReportModel;
        return [
            report.Content,
            report.DictatedByCaregiver?.CaregiverName,
            report.Location,
            report.Type,
            report.Summary
        ].filter((keyword) => !!keyword) as string[];
    }

    if (event.Type === "Immunization") {
        let immunization = event.Event as EhrNewsFeedImmunizationModel;
        return [immunization.MedicationName];
    }

    if (event.Type === "ClaimProcedureGroup") {
        let procedures = event.Event as EhrNewsFeedClaimProcedureModel[];
        let keywords: string[] = [];
        procedures.forEach((procedure) => {
            if (procedure.Procedure) { keywords.push(procedure.Procedure); }
            if (procedure.Type) { keywords.push(procedure.Type); }
        });
        return keywords;
    }

    if (event.Type === "ClaimServiceGroup") {
        let procedures = event.Event as EhrNewsFeedClaimServiceModel[];
        let keywords: string[] = [];
        procedures.forEach((procedure) => {
            if (procedure.Service) { keywords.push(procedure.Service); }
        });
        return keywords;
    }

    if (event.Type === "ProcedureGroup") {
        let procedures = event.Event as EhrNewsFeedProcedureModel[];
        let keywords: string[] = [];
        procedures.forEach((procedure) => {
            if (procedure.Procedure) { keywords.push(procedure.Procedure); }
            if (procedure.Type) { keywords.push(procedure.Type); }
            if (procedure.Description) { keywords.push(procedure.Description); }
            if (procedure.Location) { keywords.push(procedure.Location); }
            if (procedure.PerformedByCaregiver?.CaregiverName) { keywords.push(procedure.PerformedByCaregiver.CaregiverName); }
            if (procedure.VerifiedByCaregiver?.CaregiverName) { keywords.push(procedure.VerifiedByCaregiver.CaregiverName); }
        });
        return keywords;
    }

    if (event.Type === "LabReport") {
        let labReport = event.Event as EhrNewsFeedLabReportModel;
        let keywords: string[] = [
            labReport.AccessionNumber,
            labReport.FillerOrderNumber,
            labReport.PlacerOrderNumber,
            labReport.Comment,
            labReport.Location,
            labReport.OrderingCaregiver?.CaregiverName,
            labReport.Service,
            labReport.ServiceDefinition
        ].filter((keyword) => !!keyword) as string[];
        labReport.LabObservations.forEach((observation) => {
            if (observation.Comment) { keywords.push(observation.Comment); }
            if (observation.Type) { keywords.push(observation.Type); }
            if (observation.Value) { keywords.push(observation.Value); }
            if (observation.TypeDefinition) { keywords.push(observation.TypeDefinition); }
        });
        return keywords;
    }
    return [];
}