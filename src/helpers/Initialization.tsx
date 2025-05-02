import MyDataHelps, { EventName } from '@careevolution/mydatahelps-js';
import { DependencyList, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

export function useInitializeView(initialize: () => void, additionalEvents?: EventName[], dependencies?: DependencyList, cleanUp?: () => void): void {
    const isInitialMount = useRef(true);

    useEffect(() => {
        let debouncedInitialize = debounce(initialize, 500);

        if (isInitialMount.current) {
            isInitialMount.current = false;
            debouncedInitialize();
        } else {
            initialize();
        }

        MyDataHelps.on('applicationDidBecomeVisible', debouncedInitialize);
        additionalEvents?.forEach(additionalEvent => {
            MyDataHelps.on(additionalEvent, debouncedInitialize);
        });

        return () => {
            cleanUp?.();
            MyDataHelps.off('applicationDidBecomeVisible', debouncedInitialize);
            additionalEvents?.forEach(additionalEvent => {
                MyDataHelps.off(additionalEvent, debouncedInitialize);
            });
        }
    }, dependencies ?? []);
}