import React from "react";
import RelativeActivity, { RelativeActivityDataType } from "../RelativeActivity/RelativeActivity";
import { startOfDay } from "date-fns";

export interface RelativeActivityTodayProps {
    dataTypes: RelativeActivityDataType[];
    previewState?: "Default";
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: RelativeActivityTodayProps) {
    return <RelativeActivity date={startOfDay(new Date())} dataTypes={props.dataTypes} previewState={props.previewState} title={props.title} innerRef={props.innerRef} />;
}