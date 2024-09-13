import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import MyDataHelps from '@careevolution/mydatahelps-js';
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

import { MyDataHelpsAIAssistant } from '../../../helpers/AIAssistant/AIAssistant';
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
}

export type AIAssistantMessageType = "user" | "ai" | "tool";

export interface AIAssistantMessage {
    type: AIAssistantMessageType;
    content: string;
    runId?: string;
    cssClass?: string;
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
            }

            if (kind === "tool") {
                if (type === "start") {
                    setLoading(language('ai-assistant-loading'));
                }
                else if (type === "end") {
                    setLoading("");

                    prettier.format(streamEvent.name + "(" + streamEvent.data.input.input + ")", { parser: "babel", plugins: [parserBabel, prettierPluginEstree] })
                        .then((formattedMessage) => {
                            addToolMessage(streamEvent.run_id, "```js\n" + formattedMessage + "```");
                        });

                    MyDataHelps.trackCustomEvent({
                        eventType: "ai-assistant-message",
                        properties: {
                            type: "tool",
                            body: streamEvent.name + "(" + streamEvent.data.input.input + ")"
                        }
                    });
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

    const addToolMessage = function (runId: string, message: string) {
        setMessages(prevMessages => [...prevMessages, { type: 'tool', content: message, runId }]);
    }

    return <>
        {messages && <Chat innerRef={props.innerRef} messages={messages.map((msg) => {
            return {
                icon: msg.type === "ai" ? <FontAwesomeSvgIcon icon={faLightbulb} width={16} /> : undefined,
                content: msg.content,
                type: msg.type === "user" ? "sent" : "received",
                cssClass: msg.type === "tool" ? "tool" : undefined
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
