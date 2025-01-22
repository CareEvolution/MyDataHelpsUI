import MyDataHelps, { Guid } from "@careevolution/mydatahelps-js";

const ceSystem = "http://careevolution.com/fhir/PatientId";

export function getPersonID(participantID: Guid) {
    const identifierSearch = encodeURIComponent(`${ceSystem}|${participantID}`);
    let url = `api/fhir-r4/Patient?identifier=${identifierSearch}`;
    return makeFhirApiRequest(url, "GET").then((response) => {
        return response.entry[0].resource.id as string;
    });
}

export function getAllergies(personID: string) {
    let url = `api/fhir-r4/Immunization?patient=${personID}&_count=100`;
    return makeFhirApiRequest(url, "GET").then((response) => {
        return response.entry;
    });
}

function makeFhirApiRequest(endpoint: string, method: "GET" | "POST", body?: any) {
    const url = `${MyDataHelps.baseUrl}${endpoint}`;

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + MyDataHelps.token.access_token);
    headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    headers.append('Accept-Language', MyDataHelps.getCurrentLanguage());
    if (!!body) {
        headers.append('Content-Type', 'application/json');
    }

    let init: any = {
        method: method,
        headers: headers
    };
    if (!!body) {
        init.body = JSON.stringify(body);
    }
    return fetch(url, init).then((response) => response.json());
}