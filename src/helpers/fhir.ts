import MyDataHelps, { Guid } from "@careevolution/mydatahelps-js";

const ceSystem = "http://careevolution.com/fhir/PatientId";

export type ResourceType = "AllergyIntolerance" |
    "AuditEvent" |
    "CarePlan" |
    "Claim" |
    "Condition" |
    "Coverage" |
    "Device" |
    "DiagnosticReport" |
    "DocumentReference" |
    "Encounter" |
    "ExplanationOfBenefit" |
    "FamilyMemberHistory" |
    "Goal" |
    "Immunization" |
    "Location" |
    "MedicationAdministration" |
    "MedicationDispense" |
    "MedicationRequest" |
    "Observation" |
    "Practitioner" |
    "Procedure" |
    "Provenance" |
    "ServiceRequest" |
    "ValueSet";

export function getPersonID(participantID: Guid) {
    const identifierSearch = encodeURIComponent(`${ceSystem}|${participantID}`);
    let url = `${MyDataHelps.baseUrl}api/fhir-r4/Patient?identifier=${identifierSearch}`;

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + MyDataHelps.token.access_token);
    headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    headers.append('Accept-Language', MyDataHelps.getCurrentLanguage());

    let init: any = {
        method: "GET",
        headers: headers
    };
    return fetch(url, init).then((response) => response.json());
}

export async function makeFhirApiRequest(resource: ResourceType, params: string) {
    const patientID = (await MyDataHelps.getParticipantInfo()).participantID;
    const personID = await getPersonID(patientID);
    params += `&patient=${personID.entry[0].resource.id}`;
    const url = `${MyDataHelps.baseUrl}api/fhir-r4/${resource}?${params.toString()}`;

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + MyDataHelps.token.access_token);
    headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    headers.append('Accept-Language', MyDataHelps.getCurrentLanguage());

    let init: any = {
        method: "GET",
        headers: headers
    };
    return await fetch(url, init).then((response) => response.json());
}