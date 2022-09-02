import React from 'react';
import "./CardTitle.css"

export interface CardTitleProps {
	title: string;
	onDetailClick?: Function;
	detailLinkText?: string;
}

export default function (props: CardTitleProps) {
	return (
		<div className="mdhui-card-title">
			{props.title}
			{props.onDetailClick && props.detailLinkText &&
				<a className="detail-link" onClick={() => props.onDetailClick ? props.onDetailClick() : null}>
					{props.detailLinkText}
				</a>
			}
		</div>
	);
}