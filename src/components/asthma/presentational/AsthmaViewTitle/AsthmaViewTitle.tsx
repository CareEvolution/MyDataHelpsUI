import React from 'react';
import './AsthmaViewTitle.css';
import { Title } from '../../../presentational';

export interface AsthmaViewTitleProps {
    title: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaViewTitleProps) {
    return <div className="mdhui-asthma-view-title" ref={props.innerRef}>
        <Title>{props.title}</Title>
    </div>;
}