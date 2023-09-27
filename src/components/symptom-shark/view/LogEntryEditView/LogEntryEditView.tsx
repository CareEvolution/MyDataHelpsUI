import React from "react";
import { SymptomSharkLogEntryEdit } from "../../container";
import { Layout } from "../../../presentational";

export interface LogEntryEditViewProps {
    colorScheme?: "light" | "dark" | "auto";
    date: Date;
    promptForReviewAfterDays?: number;
    previewState?: "default";
}

export default function (props: LogEntryEditViewProps) {
    return <Layout bodyBackgroundColor="var(--mdhui-background-color-0)" colorScheme={props.colorScheme || "light"}>
        <SymptomSharkLogEntryEdit {...props} />
    </Layout>
}