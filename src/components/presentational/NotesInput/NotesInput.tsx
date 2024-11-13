import React, { useState, useRef, useEffect } from 'react';
import "./NotesInput.css"
import language from '../../../helpers/language';
import { formatDateForLocale } from '../../../helpers/locale';

export interface NotesInputProps {
	autoTimestamp?: boolean;
	placeholder?: string;
	onChange(value: string): void;
	value: string;
}

export default function (props: NotesInputProps) {
	const [clickedNotes, setClickedNotes] = useState<boolean>(false);
	const textArea = useRef<HTMLTextAreaElement>(null);

	function refreshHeight() {
		textArea.current!.style.height = "1px";
		textArea.current!.style.height = textArea.current!.scrollHeight + "px";
	}

	useEffect(() => {
		refreshHeight();
	}, [props.value]);

	function startEditingNotes(e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) {
		if (!clickedNotes && props.autoTimestamp) {
			setClickedNotes(true);
			var newValue = "";
			if (props.value.length) {
				newValue = props.value + "\n\n";
			}
			newValue += "-- " + formatDateForLocale(new Date(), "h:mm a") + " --\n";
			props.onChange(newValue);
			e.stopPropagation();
			textArea.current?.focus();
		}
	}

	return <textarea title={language("add-notes")}
		ref={textArea}
		onClick={(e) => startEditingNotes(e)}
		onChange={(e) => props.onChange(e.target.value)}
		className="notes-input"
		placeholder={props.placeholder}
		value={props.value}></textarea>
}