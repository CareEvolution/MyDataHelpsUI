import add from 'date-fns/add'
import getDayKey from "../../../helpers/get-day-key";

export function getPreviewData(dailyDataType: string, year: number, month: number) {
	if (dailyDataType == "FitbitSteps") {
		return getPreviewFitbitSteps(year, month);
	}
	if (dailyDataType == "FitbitRestingHeartRates") {
		return getPreviewFitbitRestingHeartRates(year, month);
	}
	if (dailyDataType == "GarminSteps") {
		return getPreviewGarminSteps(year, month);
	}
	if (dailyDataType == "GarminRestingHeartRates") {
		return getPreviewGarminRestingHeartRates(year, month);
	}
	if (dailyDataType == "AppleHealthSteps") {
		return getPreviewAppleHealthSteps(year, month);
	}
	if (dailyDataType == "AppleHealthDistanceRunningWalking") {
		return getPreviewAppleHealthDistance(year, month);
	}
	if (dailyDataType == "GoogleFitSteps") {
		return getPreviewGoogleFitSteps(year, month);
	}
	if (dailyDataType == "AppleHealthSleepMinutes") {
		return getPreviewAppleHealthSleepMinutes(year, month);
	}
	return getPreviewFitbitSteps(year, month);
}

function getPreviewFitbitSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);
	var monthEnd = add(date, { months: 1 });
	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (3000 + Math.floor(Math.random() * 10000));
		date = add(date, { days: 1 });
	}
	return result;
}

function getPreviewFitbitRestingHeartRates(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);
	var monthEnd = add(date, { months: 1 });
	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (60 + Math.floor(Math.random() * 5));
		date = add(date, { days: 1 });
	}
	return result;
}

function getPreviewGarminSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);
	var monthEnd = add(date, { months: 1 });
	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (3000 + Math.floor(Math.random() * 10000));
		date = add(date, { days: 1 });
	}
	return result;
}

function getPreviewGarminRestingHeartRates(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);
	var monthEnd = add(date, { months: 1 });
	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (60 + Math.floor(Math.random() * 5));
		date = add(date, { days: 1 });
	}
	return result;
}


function getPreviewAppleHealthSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);
	var monthEnd = add(date, { months: 1 });
	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (3000 + Math.floor(Math.random() * 10000));
		date = add(date, { hours: 1 });
	}
	return result;
}


function getPreviewAppleHealthDistance(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (Math.floor(Math.random() * 500));
		date = add(date, { hours: 1 });
	}
	return result;
}

function getPreviewGoogleFitSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = (Math.floor(Math.random() * 500));
		date = add(date, { hours: 1 });
	}
	return result;
}

function getPreviewAppleHealthSleepMinutes(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: { [key: string]: number } = {};
	while (date < monthEnd) {
		result[getDayKey(date)] = 100 + (Math.floor(Math.random() * 500));
		date = add(date, { hours: 1 });
	}
	return result;
}