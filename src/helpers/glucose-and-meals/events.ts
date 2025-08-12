import { useEffect, useRef } from 'react';

const eventBus = new EventTarget();

export interface MealsUpdatedEventDetail {
    senderId: string;
    date: Date
}

export function onMealsUpdated(senderId: string, date: Date) {
    eventBus.dispatchEvent(new CustomEvent<MealsUpdatedEventDetail>('meals-updated', { detail: { senderId, date } }));
}

export function useMealsUpdatedEventListener(callback: (detail: MealsUpdatedEventDetail) => void, senderIdsToExclude?: string[]) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (event: Event) => {
            const detail = (event as CustomEvent<MealsUpdatedEventDetail>).detail;
            if (!senderIdsToExclude || !senderIdsToExclude.includes(detail.senderId)) {
                callbackRef.current(detail);
            }
        }
        eventBus.addEventListener('meals-updated', handler);
        return () => {
            eventBus.removeEventListener('meals-updated', handler);
        };
    }, []);
}