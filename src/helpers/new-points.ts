import { NewPointsProps } from "../components";
import MyDataHelps from "@careevolution/mydatahelps-js";

type ColorScheme = 'auto' | 'light' | 'dark';

export function showNewPoints(props: NewPointsProps, colorScheme?: ColorScheme, primaryColor?: string, url?: string): void {
    let newPointsUrl = url || 'https://viewlibrary.careevolutionapps.dev/newpoints';
    let newPointsViewParameters: { data: string, colorScheme?: ColorScheme, primaryColor?: string } = {
        data: window.btoa(JSON.stringify(props))
    };
    if (colorScheme) {
        newPointsViewParameters.colorScheme = colorScheme;
    }
    if (primaryColor) {
        newPointsViewParameters.primaryColor = primaryColor;
    }
    MyDataHelps.openApplication(newPointsUrl + '?' + new URLSearchParams(newPointsViewParameters).toString(), {modal: true});
}

export function decodeNewPointsProps(encodedProps: string): NewPointsProps {
    return JSON.parse(window.atob(encodedProps)) as NewPointsProps;
}