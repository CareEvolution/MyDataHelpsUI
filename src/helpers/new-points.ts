import { NewPointsProps } from "../components/container/NewPoints/NewPoints";
import MyDataHelps from "@careevolution/mydatahelps-js";

export function showNewPoints(props: NewPointsProps, url?: string): void {
    let newPointsUrl = url || 'https://viewlibrary.careevolutionapps.dev/newpoints';
    let newPointsQueryString = new URLSearchParams({data: window.btoa(JSON.stringify(props))}).toString();
    MyDataHelps.openApplication(newPointsUrl + '?' + newPointsQueryString, {modal: true});
}

export function decodeNewPointsProps(encodedProps: string): NewPointsProps {
    return JSON.parse(window.atob(encodedProps)) as NewPointsProps;
}