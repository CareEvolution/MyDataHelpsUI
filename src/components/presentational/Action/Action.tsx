import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import "./Action.css"

export interface ActionProps {
	title?: string;
	subtitle?: string;
	indicatorIcon?: IconDefinition;
	onClick: Function;
	children?: React.ReactNode;
	className?: string;
}

export default function (props: ActionProps) {
	var indicatorIcon = props.indicatorIcon ?? faChevronRight;
	return (
		<div className={(props.className || "") + " mdhui-action"} onClick={() => props.onClick()}>
			{props.title &&
				<div className="title">
					{props.title}
				</div>
			}
			{props.subtitle &&
				<div className="subtitle">
					{props.subtitle}
				</div>
			}
			{props.children}
			<div className="indicator">
				<FontAwesomeIcon icon={indicatorIcon} />
			</div>
		</div>
	);
}