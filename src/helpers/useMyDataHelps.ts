import MyDataHelps, { EventName } from "@careevolution/mydatahelps-js";
import { useEffect } from "react";

export function useMyDataHelps(fn: () => void, events: EventName[]) {
	useEffect(() => {
		fn();
		events.forEach(event => {
			MyDataHelps.on(event, fn);
		});
		return () => {
			events.forEach(event => {
				MyDataHelps.off(event, fn);
			});
		}
	}, []);
}