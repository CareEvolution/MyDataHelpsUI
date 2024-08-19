import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faFlask } from '@fortawesome/free-solid-svg-icons/faFlask';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';

import { MyDataHelpsAssistant } from '../../../helpers/assistant/assistant';
import Chat from '../../presentational/Chat';

import '@fortawesome/fontawesome-svg-core/styles.css';

export interface AIAssistantProps {
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "default";
    debug: boolean;
    additionalInstructions?: string;
    tools?: StructuredTool[];
    appendTools?: boolean;
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

    const assistantRef = useRef<MyDataHelpsAssistant>();

    useEffect(() => {
        if (assistantRef.current === undefined) {
            assistantRef.current = new MyDataHelpsAssistant(props.additionalInstructions, props.tools, props.appendTools);
        }
    }, []);

    const addUserMessage = async function (newMessage: string) {

        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);

        await assistantRef.current?.ask(newMessage, function (streamEvent: StreamEvent) {

            const [kind, type] = streamEvent.event.split("_").slice(1);

            if (type === "stream" && kind !== "chain") {
                const chunk = streamEvent.data?.chunk;
                let msg = chunk.message as AIMessageChunk;

                if (msg.content && typeof msg.content === "string") {
                    addMessageChunk(streamEvent.run_id, msg.content);
                }
                else if (props.debug && msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
                    if (msg.tool_call_chunks[0].args) {
                        addMessageChunk(streamEvent.run_id, msg.tool_call_chunks[0].args);
                    }
                    else if (msg.tool_call_chunks[0].name) {
                        addMessageChunk(streamEvent.run_id, msg.tool_call_chunks[0].name + " ");
                    }
                }
            }

            if (kind === "tool") {
                if (type === "start") {
                    setLoading(`Querying your data...`);
                }
                else if (type === "end") {
                    setLoading("");
                }
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

    return <>
        {messages && <Chat messages={messages.map((msg) => {
            return {
                icon: msg.type === "ai" ? <FontAwesomeSvgIcon icon={faFlask} width={16} /> : undefined,
                content: msg.content,
                type: msg.type === "user" ? "sent" : "received"
            }
        })} onSendMessage={addUserMessage} loading={loading} />}
    </>
}
