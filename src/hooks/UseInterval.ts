//from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from 'react';

export default function (callback: Function, delay: number | null) {
	const savedCallback = useRef<Function>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}