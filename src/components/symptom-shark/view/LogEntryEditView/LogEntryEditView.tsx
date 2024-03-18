import React from "react";
import { SymptomSharkLogEntryEdit } from "../../container";
import { Layout } from "../../../presentational";
import "../../../../components/view/recover.css";

export interface LogEntryEditViewProps {
    colorScheme?: "light" | "dark" | "auto";
    date: Date;
    promptForReviewAfterDays?: number;
    previewState?: "default";
}

export default function (props: LogEntryEditViewProps) {
    return <Layout className="recover" bodyBackgroundColor="var(--mdhui-background-color-0)" colorScheme={props.colorScheme || "light"}>
        <SymptomSharkLogEntryEdit {...props} />
    </Layout>
}