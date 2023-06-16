import MyDataHelps, { EventName } from '@careevolution/mydatahelps-js';
import { DependencyList, useEffect } from 'react';

const debounce = require('lodash.debounce');

export function useInitializeView(initialize: () => void, additionalEvents?: EventName[], dependencies?: DependencyList): void {
    useEffect(() => {
        let debouncedInitialize = debounce(initialize, 500);

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
