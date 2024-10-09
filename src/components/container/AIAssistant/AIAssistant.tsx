import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { WavRecorder, WavStreamPlayer } from '../../../helpers/wavtools/index.js';
import { ItemType } from '@openai/realtime-api-beta/dist/lib/client.js';

import { MyDataHelpsAIAssistant } from '../../../helpers/AIAssistant/AIAssistant';
import language from '../../../helpers/language';
import Chat from '../../presentational/Chat';

import '@fortawesome/fontawesome-svg-core/styles.css';
import './AIAssistant.css';
import { convertToOpenAIFunction, convertToOpenAITool } from '@langchain/core/utils/function_calling';
import { MyDataHelpsTools } from '../../../helpers';

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

    let lastAIMessage = "";

    const assistantRef = useRef<MyDataHelpsAIAssistant>();

    const clientRef = useRef<RealtimeClient>(new RealtimeClient({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowAPIKeyInBrowser: true
    }));

    const wavRecorderRef = useRef<WavRecorder>(
        new WavRecorder({ sampleRate: 24000 })
    );
    const wavStreamPlayerRef = useRef<WavStreamPlayer>(
        new WavStreamPlayer({ sampleRate: 24000 })
    );

    const [isRecording, setIsRecording] = useState(false);
    const [items, setItems] = useState<ItemType[]>([]);

    useEffect(() => {
        if (assistantRef.current === undefined) {
            assistantRef.current = new MyDataHelpsAIAssistant(props.baseUrl, props.additionalInstructions, props.tools, props.appendTools);
        }

        const client = clientRef.current;
        const wavRecorder = wavRecorderRef.current;
        const wavStreamPlayer = wavStreamPlayerRef.current;

        client.updateSession({
            turn_detection: { type: 'server_vad' },
            input_audio_transcription: { model: 'whisper-1' },
            voice: 'alloy',
            instructions: 'You are a great, upbeat friend.'
        });

        let coco = convertToOpenAITool(MyDataHelpsTools.QueryDailySleepTool);
        client.addTool({
            name: coco.function.name,
            description: coco.function.description || "",
            parameters: coco.function.parameters,
        }, MyDataHelpsTools.QueryDailySleepTool.func);

        client.on('error', (event: any) => console.error(event));
        client.on('conversation.interrupted', async () => {
            const trackSampleOffset = await wavStreamPlayer.interrupt();
            if (trackSampleOffset?.trackId) {
                const { trackId, offset } = trackSampleOffset;
                await client.cancelResponse(trackId, offset);
            }
        });
        client.on('conversation.updated', async ({ item, delta }: any) => {
            const items = client.conversation.getItems();
            if (delta?.audio) {
                wavStreamPlayer.add16BitPCM(delta.audio, item.id);
            }
            if (item.status === 'completed' && item.formatted.audio?.length) {
                const wavFile = await WavRecorder.decode(
                    item.formatted.audio,
                    24000,
                    24000
                );
                item.formatted.file = wavFile;
            }
            setItems(items);
        });

        setItems(client.conversation.getItems());

        return () => {
            // cleanup; resets to defaults
            client.reset();
        };

    }, []);

    const startRecording = useCallback(async () => {
        const client = clientRef.current;
        const wavRecorder = wavRecorderRef.current;
        const wavStreamPlayer = wavStreamPlayerRef.current;

        setIsRecording(true);
        setItems(client.conversation.getItems());

        // Connect to microphone
        await wavRecorder.begin();

        // Connect to audio output
        await wavStreamPlayer.connect();

        // Connect to realtime API
        await client.connect();

        await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }, []);

    const stopRecording = useCallback(async () => {
        setIsRecording(false);
        setItems([]);

        const client = clientRef.current;
        client.disconnect();

        const wavRecorder = wavRecorderRef.current;
        await wavRecorder.end();

        const wavStreamPlayer = wavStreamPlayerRef.current;
        await wavStreamPlayer.interrupt();
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

                    MyDataHelps.trackCustomEvent({
                        eventType: "ai-assistant-message",
                        properties: {
                            type: "tool",
                            body: `${toolName}(${toolInput})`
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

    const addMessage = function (runId: string, message: string, type: AIAssistantMessageType) {
        setMessages(prevMessages => [...prevMessages, { type, content: message, runId }]);
    }

    return <>
        <div className="content-block conversation">
            <div className="content-block-body" data-conversation-content>
                {!items.length && `awaiting connection...`}
                {items.map((conversationItem, i) => {
                    return (
                        <div className="conversation-item" key={conversationItem.id}>
                            <div className={`speaker ${conversationItem.role || ''}`}>
                                <div>
                                    {(
                                        conversationItem.role || conversationItem.type
                                    ).replace('_', ' ')}
                                </div>
                                <div
                                    className="close"
                                    onClick={() => { }}
                                >
                                    <span>x</span>
                                </div>
                            </div>
                            <div className={`speaker-content`}>
                                {/* tool response */}
                                {conversationItem.type === 'function_call_output' && (
                                    <div>{conversationItem.formatted.output}</div>
                                )}
                                {/* tool call */}
                                {!!conversationItem.formatted.tool && (
                                    <div>
                                        {conversationItem.formatted.tool.name}(
                                        {conversationItem.formatted.tool.arguments})
                                    </div>
                                )}
                                {!conversationItem.formatted.tool &&
                                    conversationItem.role === 'user' && (
                                        <div>
                                            {conversationItem.formatted.transcript ||
                                                (conversationItem.formatted.audio?.length
                                                    ? '(awaiting transcript)'
                                                    : conversationItem.formatted.text ||
                                                    '(item sent)')}
                                        </div>
                                    )}
                                {!conversationItem.formatted.tool &&
                                    conversationItem.role === 'assistant' && (
                                        <div>
                                            {conversationItem.formatted.transcript ||
                                                conversationItem.formatted.text ||
                                                '(truncated)'}
                                        </div>
                                    )}
                                {conversationItem.formatted.file && (
                                    <audio
                                        src={conversationItem.formatted.file.url}
                                        controls
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        {messages && <Chat innerRef={props.innerRef} messages={messages.map((msg) => {
            return {
                icon: msg.type === "ai" ? <FontAwesomeSvgIcon icon={faLightbulb} width={16} /> : undefined,
                content: msg.content,
                type: msg.type === "user" ? "sent" : (msg.type === "image" ? "received-image" : "received"),
                cssClass: msg.type === "tool" ? "tool" : (msg.type === "image" ? "image" : undefined),
            }
        })} onSendMessage={addUserMessage} onStartRecording={startRecording} onStopRecording={stopRecording} isRecording={isRecording}
            loading={loading} inputDisabled={inputDisabled} />}
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
