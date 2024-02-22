import React, { useState } from "react";
import Layout from "../Layout";
import NotesInput, { NotesInputProps } from "./NotesInput";
import Section from "../Section";

export default {
    title: "Presentational/NotesInput",
    component: NotesInput,
    parameters: {
        layout: 'fullscreen',
    }
};

export function Default() {
    const [notes, setNotes] = useState("");

    return <Layout colorScheme="auto">
        <Section>
            <NotesInput placeholder="Add notes" value={notes} onChange={(n) => setNotes(n)} />
        </Section>
    </Layout>
}

export function AutoTimestamp() {
    const [notes, setNotes] = useState("");

    return <Layout colorScheme="auto">
        <Section>
            <NotesInput placeholder="Add notes" autoTimestamp value={notes} onChange={(n) => setNotes(n)} />
        </Section>
    </Layout>
}