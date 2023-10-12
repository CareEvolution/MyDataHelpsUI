import React, { ReactElement, useContext } from 'react'
import UnstyledButton from '../UnstyledButton';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import "./Action.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface ActionProps {
	title?: string;
	titleIcon?: ReactElement;
	icon?: ReactElement
	subtitle?: string;
	indicatorIcon?: IconDefinition;
	indicator?: ReactElement;
	onClick?: Function;
	children?: React.ReactNode;
	className?: string;
	indicatorValue?: string;
	indicatorPosition?: "default" | "topRight";
	bottomBorder?: boolean;
	innerRef?: React.Ref<HTMLButtonElement>;
	titleColor?: ColorDefinition;
	subtitleColor?: ColorDefinition;
}

export default function (props: ActionProps) {
	var indicatorIcon = props.indicatorIcon ?? faChevronRight;

	let onClick = props.onClick ?? (() => { });
	let layoutContext = useContext(LayoutContext);
	let titleColor = resolveColor(layoutContext?.colorScheme, props.titleColor);
	let subtitleColor = resolveColor(layoutContext?.colorScheme, props.subtitleColor);

	return (
		<UnstyledButton disabled={!props.onClick} innerRef={props.innerRef} className={(props.className || "") + " mdhui-action" + (props.bottomBorder ? " mdhui-action-bottom-border" : "")} onClick={() => onClick()}>
			{props.icon && <div className="mdhui-action-icon">{props.icon}</div>}
			<div className='mdhui-action-body'>
				{props.title &&
					<div className="title" style={{ color: titleColor }}>
						{props.titleIcon}
						{props.title}
					</div>
				}
				{props.subtitle &&
					<div className="subtitle" style={{ color: subtitleColor }}>
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
				{props.indicator}
				{!props.indicator &&
					<FontAwesomeSvgIcon icon={indicatorIcon} />
				}
			</div>
		</UnstyledButton>
	);
}