import React, { ReactElement } from 'react'
import UnstyledButton from '../UnstyledButton';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import "./Action.css"

export interface ActionProps {
	title?: string;
	titleIcon?: ReactElement;
	subtitle?: string;
	indicatorIcon?: IconDefinition;
	onClick: Function;
	children?: React.ReactNode;
	className?: string;
	indicatorValue?: string;
	indicatorPosition?: "default" | "topRight";
}

export default function (props: ActionProps) {
	var indicatorIcon = props.indicatorIcon ?? faChevronRight;
	return (
		<UnstyledButton className={(props.className || "") + " mdhui-action"} onClick={() => props.onClick()}>
			<div>
				{props.title &&
					<div className="title">
						{props.titleIcon}
						{props.title}
					</div>
				}
				{props.subtitle &&
					<div className="subtitle">
						{props.subtitle}
					</div>
				}
				{props.children}
			</div>
			<div className={"indicator" + (props.indicatorPosition ? " mdhui-indicator-" + props.indicatorPosition : "")}>
				{!!props.indicatorValue &&
					<span className="mdhui-action-indicator-value">
						{props.indicatorValue}&nbsp;
					</span>
				}
				<FontAwesomeSvgIcon icon={indicatorIcon} />
			</div>
		</UnstyledButton>
	);
}