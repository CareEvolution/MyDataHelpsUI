import MyDataHelps, { EventName } from '@careevolution/mydatahelps-js';
import { DependencyList, useEffect } from 'react';
import { debounce } from 'lodash';

export function useInitializeView(initialize: () => void, additionalEvents?: EventName[], dependencies?: DependencyList, debounceWait?: number): void {
    useEffect(() => {
        let debouncedInitialize = debounce(initialize, debounceWait != undefined ? debounceWait : 500);

        debouncedInitialize();

        MyDataHelps.on('applicationDidBecomeVisible', debouncedInitialize);
        additionalEvents?.forEach(additionalEvent => {
            MyDataHelps.on(additionalEvent, debouncedInitialize);
        });

        return () => {
            MyDataHelps.off('applicationDidBecomeVisible', debouncedInitialize);
            additionalEvents?.forEach(additionalEvent => {
                MyDataHelps.off(additionalEvent, debouncedInitialize);
            });
        }
    }, dependencies ?? []);
}