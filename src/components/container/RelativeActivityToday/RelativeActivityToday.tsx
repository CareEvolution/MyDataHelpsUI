import React from "react";
import RelativeActivity from "../RelativeActivity/RelativeActivity";
import { startOfDay } from "date-fns";
import { RelativeActivityDataType } from "../../../helpers";

export interface RelativeActivityTodayProps {
    dataTypes: RelativeActivityDataType[];
    previewState?: "Default";
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: RelativeActivityTodayProps) {
    return <RelativeActivity date={startOfDay(new Date())} dataTypes={props.dataTypes} previewState={props.previewState} title={props.title} innerRef={props.innerRef} />;
}