import React from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import "./Action.css"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
		<button className={(props.className || "") + " mdhui-action"} onClick={() => props.onClick()}>
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
				<FontAwesomeSvgIcon icon={indicatorIcon} />
			</div>
		</button>
	);
}