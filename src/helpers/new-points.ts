import { NewPointsProps } from '../components';
import MyDataHelps, { PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';

export type ColorScheme = 'auto' | 'light' | 'dark';

export function showNewPoints(props: NewPointsProps, colorScheme?: ColorScheme, primaryColor?: string, url?: string): void {
    let newPointsDataPoint: PersistableDeviceDataPoint = {
        type: 'MDHUI-NewPoints',
        value: JSON.stringify(props)
    };
    MyDataHelps.persistDeviceData([newPointsDataPoint]).then(() => {
        let newPointsUrl = url || 'https://viewlibrary.careevolutionapps.dev/newpoints';
        let newPointsViewParameters: { colorScheme?: ColorScheme, primaryColor?: string } = {};
        if (colorScheme) {
            newPointsViewParameters.colorScheme = colorScheme;
        }
        if (primaryColor) {
            newPointsViewParameters.primaryColor = primaryColor;
        }
        MyDataHelps.openApplication(newPointsUrl + '?' + new URLSearchParams(newPointsViewParameters).toString(), {modal: true});
    });
}