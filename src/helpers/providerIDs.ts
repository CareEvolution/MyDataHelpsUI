import MyDataHelps from '@careevolution/mydatahelps-js';

function isDevelopment() {
    return MyDataHelps.baseUrl && (MyDataHelps.baseUrl.startsWith('https://mdhorg.ce.dev') || MyDataHelps.baseUrl.startsWith('https://mydatahelps.dev'));
}

export function getFitbitProviderID() {
    return isDevelopment() ? 2 : 564;
}

export function getGarminProviderID() {
    return isDevelopment() ? 1384 : 6327;
}

export function getDexcomProviderID() {
    return isDevelopment() ? 5691 : 5691; // TODO: Change the second value to the prod ID once it is available.
}

export function getOmronProviderID() {
    return isDevelopment() ? 171 : 1466;
}