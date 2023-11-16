import MyDataHelps from "@careevolution/mydatahelps-js";

export function getFitbitProviderID() {
	var fitbitProviderID = 564;
	if (MyDataHelps.baseUrl && (MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev") || MyDataHelps.baseUrl.startsWith("https://designer.mydatahelps.dev"))) {
		fitbitProviderID = 2;
	}
	return fitbitProviderID;
}

export function getGarminProviderID() {
	var garminProviderID = 6327;
	if (MyDataHelps.baseUrl && (MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev") || MyDataHelps.baseUrl.startsWith("https://designer.mydatahelps.dev"))) {
		garminProviderID = 1384;
	}
	return garminProviderID;
}

export function getOmronProviderID() {
	var omronProviderID = 1466;
	if (MyDataHelps.baseUrl && (MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev") || MyDataHelps.baseUrl.startsWith("https://designer.mydatahelps.dev"))) {
		omronProviderID = 171;
	}
	return omronProviderID;
}