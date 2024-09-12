import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import MyDataHelps from '@careevolution/mydatahelps-js';

import { MyDataHelpsAIAssistant } from '../../../helpers/AIAssistant/AIAssistant';
import language from '../../../helpers/language';
import Chat from '../../presentational/Chat';

import '@fortawesome/fontawesome-svg-core/styles.css';

export interface AIAssistantProps {
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "default";
    debug: boolean;
    additionalInstructions?: string;
    tools?: StructuredTool[];
    appendTools?: boolean;
    baseUrl?: string;
}

export type AIAssistantMessageType = "user" | "ai";

export interface AIAssistantMessage {
    type: AIAssistantMessageType;
    content: string;
    runId?: string;
}

export default function (props: AIAssistantProps) {

    const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
    const [loading, setLoading] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);

    let lastAIMessage = "";

    const assistantRef = useRef<MyDataHelpsAIAssistant>();

    useEffect(() => {
        if (assistantRef.current === undefined) {
            assistantRef.current = new MyDataHelpsAIAssistant(props.baseUrl, props.additionalInstructions, props.tools, props.appendTools);
        }
    }, []);

    const addUserMessage = async function (newMessage: string) {

        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);

        if (props.previewState === "default") return;

        setInputDisabled(true);

        MyDataHelps.trackCustomEvent({
            eventType: "ai-assistant-message",
            properties: {
                type: "user",
                body: newMessage
            }
        });

        await assistantRef.current?.ask(newMessage, function (streamEvent: StreamEvent) {

            const [kind, type] = getEventKindType(streamEvent.event);

            if (type === "stream" && kind !== "chain") {
                let msg = streamEvent.data?.chunk as AIMessageChunk;

                if (msg.content && typeof msg.content === "string") {
                    addMessageChunk(streamEvent.run_id, msg.content);
                }
                else if (props.debug && msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
                    if (msg.tool_call_chunks[0].args) {
                        addMessageChunk(streamEvent.run_id, msg.tool_call_chunks[0].args);
                    }
                    else if (msg.tool_call_chunks[0].name) {
                        addMessageChunk(streamEvent.run_id, "\n" + msg.tool_call_chunks[0].name + " ");
                    }
                }
            }

            if (kind === "tool") {
                if (type === "start") {
                    setLoading(language('ai-assistant-loading'));
                }
                else if (type === "end") {
                    setLoading("");
                }
            }

            if (kind === "chat_model" && type === "start") {
                lastAIMessage = "";
            }

            if (kind === "chat_model" && type === "end") {

                MyDataHelps.trackCustomEvent({
                    eventType: "ai-assistant-message",
                    properties: {
                        type: "ai",
                        body: lastAIMessage
                    }
                });

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

        lastAIMessage += message;
    }

    return <>
        {messages && <Chat innerRef={props.innerRef} messages={messages.map((msg) => {
            return {
                icon: msg.type === "ai" ? <FontAwesomeSvgIcon icon={faLightbulb} width={16} /> : undefined,
                content: msg.content,
                type: msg.type === "user" ? "sent" : "received"
            }
        })} onSendMessage={addUserMessage} loading={loading} inputDisabled={inputDisabled} />}
    </>
}

function getEventKindType(input: string) {
    const parts = input.split('_');
    const type = parts.pop();
    const kind = parts.slice(1).join('_');
    return [kind, type];
}
