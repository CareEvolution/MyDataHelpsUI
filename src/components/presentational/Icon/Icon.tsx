import React, { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { library, findIconDefinition, IconPrefix, IconName, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { fas, faNotdef } from '@fortawesome/free-solid-svg-icons'
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
	iconSize?: string;
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
		const prefix = (id?.prefix  as IconPrefix);
		const iconName = (id?.iconName as IconName);
		iconDef = findIconDefinition({ prefix, iconName });
	}
	if (!iconDef) {
		iconDef = faNotdef;
	}

	const size = props.iconSize ? (props.iconSize as SizeProp) : undefined;

	return (
		<FontAwesomeIcon icon={iconDef} className={props.className} size={size} style={{ color: props.iconColor, backgroundColor: props.iconBackgroundColor } }
			onClick={event => {
				if (props.disabled || !props.onClick) {
					return;
				}
				props.onClick(event);
			}}
		/>
	);
}