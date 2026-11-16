import { useEffect, useRef } from 'react';

export default function useAnimationFrame(loopKey: unknown, onFrame: (elapsedMilliseconds: number) => boolean): void {
    const onFrameRef = useRef(onFrame);
    onFrameRef.current = onFrame;

    useEffect(() => {
        if (loopKey === undefined) return;

        let frameId: number;
        let beginTime: number | undefined;
        const update = (now: number) => {
            beginTime ??= now;
            const keepGoing = onFrameRef.current(now - beginTime);
            if (keepGoing) {
                frameId = requestAnimationFrame(update);
            }
        };
        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, [loopKey]);
}
