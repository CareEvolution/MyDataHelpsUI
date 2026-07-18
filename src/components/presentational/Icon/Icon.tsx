import React, { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { library, findIconDefinition, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import "./Icon.css"

// Insulates from FontAwesome types so consumers of MDHUI aren't impacted by
// FA changes under the hood.
export interface IconId {
	iconName: string;
	prefix?: string;
}
export interface IconProps {
	icon: IconId | IconDefinition; // Recommend IconId to insulate from fontawesome version
	iconColor?: string;
	iconBackgroundColor?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler;
	className?: string;
}

export default function Icon(props: IconProps) {
	library.add(fas, far)

	let iconDef = props.icon as IconDefinition;
	// If icon definition incomplete, we must have been passed in an IconId instead.
	if (!iconDef.icon) {
		const id = props.icon as IconId;
		const prefix = (id?.prefix || "fas") as IconPrefix;
		const iconName = (id?.iconName || "notdef") as IconName;
		iconDef = findIconDefinition({ prefix, iconName });
	}	

	return (
		<FontAwesomeIcon icon={iconDef} className={props.className} style={{ color: props.iconColor } }
			onClick={event => {
				if (props.disabled || !props.onClick) {
					return;
				}
				props.onClick(event);
			}}
		/>
	);
}