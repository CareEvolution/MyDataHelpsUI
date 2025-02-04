import MyDataHelps from "@careevolution/mydatahelps-js";

let fakeHealthConnect: { [key: string]: any[] } = {};

export async function downloadAndStoreFHIRData() {
    //you would get this from the user's last sync date
    let lastSyncDate = "2020-01-01T00:00:00Z";

    let medicalDataSources = getMedicalDataSources();
    for (let source of medicalDataSources) {
        persistMedicalDataSourceInHealthConnect(source);
    }

    //filter medical data sources based on last sync
    medicalDataSources = getMedicalDataSources().filter((source) => source.LastPollDate > lastSyncDate);
    for (let source of medicalDataSources) {
        await downloadPatient(source);
        await downloadResource("Encounter", source, lastSyncDate, ["Encounter:location", "Encounter:practitioner"]);
        await downloadResource("AllergyIntolerance", source, lastSyncDate, ["AllergyIntolerance:recorder"]);
        await downloadResource("Condition", source, lastSyncDate, ["Condition:asserter"]);
        await downloadResource("Immunization", source, lastSyncDate, ["Immunization:performer"]);
        await downloadResource("Procedure", source, lastSyncDate, ["Procedure:performer"]);
        await downloadResource("MedicationRequest", source, lastSyncDate, ["MedicationRequest:requester"]);
        await downloadResource("Observation", source, lastSyncDate, ["Observation:performer"]);
        
        //these resources may not be included on Android, so can be removed if they do not work
        await downloadResource("MedicationAdministration", source, lastSyncDate, ["MedicationAdministration:performer"]);
        await downloadResource("MedicationDispense", source, lastSyncDate, ["MedicationDispense:performer"]);
    }
    console.log(fakeHealthConnect);
}

function getMedicalDataSources() {
    //Instead actually get them from the medical data sources API
    return [{
        PatientID: "fbd55182-fcdc-eb11-aaa0-ce99478b0be4",
        PatientIdentifier: "b9e420f4-8d2e-eb11-aa92-a128b845efc6",
        Source: "https://mydatahelps.dev/identifiers/CareEvolution/MRN/Cedars-SinaiHealthSystem",
        DisplayName: "Cedars-Sinai Health System",
        BaseUrl: "https://cslinkmobile.csmc.edu/fhirproxy/api/FHIR/DSTU2/",
        LastPollDate: "2024-09-29T00:00:00Z"
    },
    {
        PatientID: "a81bde2b-caf0-4a51-8078-12c55782e943",
        PatientIdentifier: "b9e420f4-8d2e-eb11-aa92-a128b845efc6",
        Source: "https://mydatahelps.dev/identifiers/CareEvolution/MRN/CareEvolutionFHIR",
        DisplayName: "CareEvolution Test Sandbox",
        BaseUrl: "https://fhir.careevolution.com/Master.Adapter1.WebClient/api/fhir",
        LastPollDate: "2024-09-29T00:00:00Z"
    }];
}
 
async function downloadResource(resourceType: string, medicalDataSource: any, lastSync: string, include?: string[]) {
    let params: URLSearchParams = new URLSearchParams();
    params.append("patient", medicalDataSource.PatientIdentifier);
    params.append("_source", medicalDataSource.Source);
    params.append("_count", "100");
    params.append("_lastUpdated", `ge${lastSync}`);
    if (include) {
        for (let inc of include) {
            params.append("_include", inc);
        }
    }

    let url = `${MyDataHelps.baseUrl}api/fhir-r4-unmerged/${resourceType}?${params.toString()}`;
    await downloadAllEntries(url, medicalDataSource);
}

async function downloadPatient(medicalDataSource: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.append("_count", "100");
    params.append("_id", medicalDataSource.PatientID);
    let url = `${MyDataHelps.baseUrl}api/fhir-r4-unmerged/Patient?${params.toString()}`;
    await downloadAllEntries(url, medicalDataSource);
}

async function downloadAllEntries(url: string, medicalDataSource?: any) {
    let response = await makeApiRequest(url, "GET");
    let entries: any[] = response.entry ?? [];
    url = response.link.find((link: any) => link.relation == "next")?.url;
    while (url) {
        response = await makeApiRequest(url, "GET");
        url = response.link.find((link: any) => link.relation == "next")?.url;
        if (response.entry) {
            entries = entries.concat(response.entry);
        }
    }
    entries.forEach((entry) => {
        try {
            persistResourceInHealthConnect(entry.resource, medicalDataSource);
        } catch (e) {
            console.error(e);
            //log the error but continue
        }
    });
}

function persistResourceInHealthConnect(entry: any, medicalDataSource: any) {
    //you would need to persist it with the correct data source ID from Health Connect
    if (!fakeHealthConnect[medicalDataSource.PatientID]) {
        fakeHealthConnect[medicalDataSource.PatientID] = [];
    }
    fakeHealthConnect[medicalDataSource.PatientID].push(entry);
}

function persistMedicalDataSourceInHealthConnect(medicalDataSource: any) {
    //self explanatory
}

function makeApiRequest(endpoint: string, method: "GET" | "POST", body?: any) {
    //this code is just a placeholder, make the request following normal pattern on Android
    const url = `${endpoint}`;

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