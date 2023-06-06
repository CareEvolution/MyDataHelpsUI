import MyDataHelps from '@careevolution/mydatahelps-js';
import {useEffect} from 'react';

const debounce = require('lodash.debounce');

export function useInitializeView(initialize: () => void): void {
    useEffect(() => {
        let debouncedInitialize = debounce(initialize, 500);

        debouncedInitialize();
        MyDataHelps.on('applicationDidBecomeVisible', debouncedInitialize);
        return () => {
            MyDataHelps.off('applicationDidBecomeVisible', debouncedInitialize);
        }
    }, []);
}
