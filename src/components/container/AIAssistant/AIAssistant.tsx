import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import MyDataHelps from '@careevolution/mydatahelps-js';

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
    saveGraphImages?: boolean;
}

export type AIAssistantMessageType = "user" | "ai" | "tool" | "image";

export interface AIAssistantMessage {
    type: AIAssistantMessageType;
    content: string;
    runId?: string;
}

export default function (props: AIAssistantProps) {

    const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
    const [loading, setLoading] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);

    const assistantRef = useRef<MyDataHelpsAIAssistant>();

    useEffect(() => {
        if (assistantRef.current === undefined) {
            assistantRef.current = new MyDataHelpsAIAssistant(props.baseUrl, props.additionalInstructions, [new CustomEventTrackerCallbackHandler()], props.tools, props.appendTools);
        }
    }, []);

    const addUserMessage = async function (newMessage: string) {

        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);

        if (props.previewState === "default") return;

        setInputDisabled(true);

        await assistantRef.current?.ask(newMessage, async function (streamEvent: StreamEvent) {

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

                            if (props.saveGraphImages) {
                                const binaryString = atob(image);
                                const len = binaryString.length;
                                const uint8Array = new Uint8Array(len);

                                for (let i = 0; i < len; i++) {
                                    uint8Array[i] = binaryString.charCodeAt(i);
                                }

                                const blob = new Blob([uint8Array], { type: 'image/png' });
                                const file = new File([blob], `graph-${new Date().getTime()}.png`, { type: 'image/png' });

                                await MyDataHelps.uploadFile(file, "ai-graph");
                            }
                        }
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
        })} onSendMessage={addUserMessage} loading={loading} inputDisabled={inputDisabled} />}
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
