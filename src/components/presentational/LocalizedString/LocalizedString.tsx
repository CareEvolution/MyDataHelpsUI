import React from "react";
import language from '../../../helpers/language'

export interface LocalizedStringProps {
	stringName: string;
	className?: string;
}

export default function (props: LocalizedStringProps) {
	return <span className={props.className} dangerouslySetInnerHTML={{__html: language[props.stringName]}}/>;
}