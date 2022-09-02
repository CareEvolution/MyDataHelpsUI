import React from 'react';
import "./Section.css"

export interface SectionProps {
	children?: React.ReactNode;
}

export default function (props: SectionProps) {
	if (!props.children) {
		return null;
	}

	return (
		<div className="mdhui-section">
			{props.children}
		</div>
	);
}