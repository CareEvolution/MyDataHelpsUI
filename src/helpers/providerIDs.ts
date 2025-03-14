import { isDevelopment } from "./env";

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

export function getOuraProviderID() {
    return isDevelopment() ? 10414 : 99999; // TODO. update PROD ID
}