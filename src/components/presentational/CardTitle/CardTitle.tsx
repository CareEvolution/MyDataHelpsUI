import React, { useContext } from 'react';
import "./CardTitle.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export interface CardTitleProps {
	title: string;
	onDetailClick?: Function;
	detailLinkText?: string;
	innerRef?: React.Ref<HTMLDivElement>;
	color?: ColorDefinition;
}

export default function Card(props: CardTitleProps) {
	let context = useContext(LayoutContext);
	return (
		<div style={{ color: resolveColor(context.colorScheme, props.color) }} ref={props.innerRef} className="mdhui-card-title">
			{props.title}
			{props.onDetailClick && props.detailLinkText &&
				<a className="detail-link" onClick={() => props.onDetailClick ? props.onDetailClick() : null}>
					{props.detailLinkText}
				</a>
			}
		</div>
	);
}