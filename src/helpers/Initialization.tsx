import MyDataHelps, { EventName } from '@careevolution/mydatahelps-js';
import { DependencyList, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

export function useInitializeView(initialize: () => void, additionalEvents?: EventName[], dependencies?: DependencyList): void {
    const initialized = useRef<boolean>(false);

    useEffect(() => {
        let debouncedInitialize = debounce(() => {
            initialized.current = true;
            initialize();
        }, 500);

        if (!initialized.current) {
            debouncedInitialize();
        } else {
            initialize();
        }

        MyDataHelps.on('applicationDidBecomeVisible', debouncedInitialize);
        additionalEvents?.forEach(additionalEvent => {
            MyDataHelps.on(additionalEvent, debouncedInitialize);
        });

        return () => {
            debouncedInitialize.cancel();
            MyDataHelps.off('applicationDidBecomeVisible', debouncedInitialize);
            additionalEvents?.forEach(additionalEvent => {
                MyDataHelps.off(additionalEvent, debouncedInitialize);
            });
        };
    }, dependencies ?? []);
}