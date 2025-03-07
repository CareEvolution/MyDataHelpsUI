import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import MyDataHelps from "@careevolution/mydatahelps-js";

import { MyDataHelpsAIAssistant } from '../../../helpers/AIAssistant/AIAssistant';
import { CustomEventTrackerCallbackHandler } from '../../../helpers/AIAssistant/Callbacks';
import language from '../../../helpers/language';
import Chat from '../../presentational/Chat';

import '@fortawesome/fontawesome-svg-core/styles.css';
import './AIAssistant.css';

export interface AIAssistantProps {
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "default";
    debug: boolean;
    additionalInstructions?: string;
    tools?: StructuredTool[];
    appendTools?: boolean;
    baseUrl?: string;
    showSuggestions?: boolean;
}

export type AIAssistantMessageType = "user" | "ai" | "tool" | "image";

export interface AIAssistantMessage {
    type: AIAssistantMessageType;
    content: string;
    runId?: string;
}

/**
 * Component that can be used to add the MyDataHelps AI Assistant to your application.
 * The component will use all the allowed viewport vertical space it is given.
*/
export default function AIAssistant(props: AIAssistantProps) {

    const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
    const [loading, setLoading] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const assistantRef = useRef<MyDataHelpsAIAssistant>();

    const defaultSuggestions = [
        language("ai-assistant-suggestion-avg-weekly-heart-rate"),
        language("ai-assistant-suggestion-highest-heart-rate-week"),
        language("ai-assistant-suggestion-graph-daily-steps-21-days"),
        language("ai-assistant-suggestion-weekly-workouts-average-month"),
        language("ai-assistant-suggestion-avg-monthly-blood-pressure"),
        language("ai-assistant-suggestion-daily-active-minutes-month"),
        language("ai-assistant-suggestion-resting-heart-rate-change-month"),
        language("ai-assistant-suggestion-stand-ups-yesterday"),
        language("ai-assistant-suggestion-graph-heart-rate-trends-workouts"),

        language("ai-assistant-suggestion-sleep-7-days"),
        language("ai-assistant-suggestion-fall-asleep-time-2-weeks"),
        language("ai-assistant-suggestion-sleep-quality-change-month"),

        language("ai-assistant-suggestion-last-tetanus-vaccine"),

        language("ai-assistant-suggestion-last-blood-test-lab-work"),
        language("ai-assistant-suggestion-abnormal-lab-results"),
        language("ai-assistant-suggestion-last-cbc-test"),
        language("ai-assistant-suggestion-glucose-a1c-levels-last-test"),
        language("ai-assistant-suggestion-graph-cholesterol-trends"),
        language("ai-assistant-suggestion-last-metabolic-panel"),
        language("ai-assistant-suggestion-hemoglobin-levels-trend"),

        language("ai-assistant-suggestion-show-files")
    ];

    useEffect(() => {
        if (assistantRef.current === undefined) {
            assistantRef.current = new MyDataHelpsAIAssistant(props.baseUrl, props.additionalInstructions, [new CustomEventTrackerCallbackHandler()], props.tools, props.appendTools);
        }
    }, []);

    useEffect(() => {
        setSuggestions(props.showSuggestions ? defaultSuggestions
            .sort(() => 0.5 - Math.random())
            .slice(0, 3) : []);
    }, [MyDataHelps.getCurrentLanguage(), props.showSuggestions]);

    const addUserMessage = async function (newMessage: string) {

        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);
        setSuggestions([]);

        if (props.previewState === "default") return;

        setInputDisabled(true);

        await assistantRef.current?.ask(newMessage, async function (streamEvent: StreamEvent) {
            console.log(streamEvent);
            const [kind, type] = getEventKindType(streamEvent.event);

            if (type === "stream" && kind !== "chain") {
                let msg = streamEvent.data?.chunk as AIMessageChunk;

                if (msg.content && typeof msg.content === "string") {
                    addMessageChunk(streamEvent.run_id, msg.content);
                }
            }

            if (kind === "tool") {
                if (type === "start") {
                    setLoading(language('ai-assistant-loading'));
                }
                else if (type === "end") {
                    setLoading("");

                    let toolName = streamEvent.name;
                    let toolInput = streamEvent.data.input.input;

                    if (props.debug) {
                        let formattedMessage = await formatCode(toolName, toolInput)
                        addMessage(streamEvent.run_id, "```js\n" + formattedMessage + "```", "tool");
                    }

                    if (toolName === "graphing") {
                        let image = streamEvent.data.output.content;
                        if (image && !image.startsWith("error")) {
                            addMessage(streamEvent.run_id, `data:image/png;base64,${image}`, "image");
                        }

                        setSuggestions([language("ai-assistant-suggestion-save-graph-to-files")]);
                    }
                    else if (toolName === "getUploadedFile") {
                        let input = JSON.parse(toolInput);
                        if (input.key && input.key.endsWith(".png")) {
                            let output = JSON.parse(streamEvent.data.output.content);
                            addMessage(streamEvent.run_id, output.preSignedUrl, "image");
                        }
                    }
                }
            }

            if (kind === "chat_model" && type === "end") {
                setInputDisabled(false);
            }
        });
    }

    const addMessageChunk = function (runId: string, message: string) {
        setMessages(prevMessages => {
            let existingMessage = prevMessages.find((msg) => msg.runId === runId);
            if (existingMessage) {
                const updatedMessage = { ...existingMessage, content: existingMessage.content + message };
                return prevMessages.map(msg => msg.runId === runId ? updatedMessage : msg);
            }
            else {
                return [...prevMessages, { type: 'ai', content: message, runId: runId }];
            }
        });
    }

    const addMessage = function (runId: string, message: string, type: AIAssistantMessageType) {
        setMessages(prevMessages => [...prevMessages, { type, content: message, runId }]);
    }

    return <>
        {messages && <Chat innerRef={props.innerRef} messages={messages.map((msg) => {
            return {
                icon: msg.type === "ai" ? <FontAwesomeSvgIcon icon={faLightbulb} width={16} /> : undefined,
                content: msg.content,
                type: msg.type === "user" ? "sent" : (msg.type === "image" ? "received-image" : "received"),
                cssClass: msg.type === "tool" ? "tool" : (msg.type === "image" ? "image" : undefined),
            }
        })} onSendMessage={addUserMessage} loading={loading} inputDisabled={inputDisabled} suggestions={suggestions}
            onSuggestionSelected={(suggestion) => addUserMessage(suggestion)} />}
    </>
}

function getEventKindType(input: string) {
    const parts = input.split('_');
    const type = parts.pop();
    const kind = parts.slice(1).join('_');
    return [kind, type];
}

async function formatCode(toolName: string, toolInput: string) {
    const prettier = await import("prettier/standalone");
    const babelPlugin = await import("prettier/plugins/babel");
    const estreePlugin = await import("prettier/plugins/estree");

    return prettier.format(`${toolName}(${toolInput})`, {
        parser: "babel",
        plugins: [babelPlugin, estreePlugin.default]
    });
}
